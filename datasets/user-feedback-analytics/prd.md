# PRD: 用户反馈结果展示与处理

## 背景

现有用户分析看板已具备用户列表和基础统计功能。运营团队反馈：无法集中查看和处理用户提交的反馈（bug 报告、功能建议、投诉等），目前这些信息散落在多个渠道。需要在现有系统中新增反馈管理模块，实现反馈的集中展示、筛选和状态流转。

## 需求概述

在现有 User Analytics Dashboard 中新增「用户反馈」模块，支持：
- 查看所有用户反馈列表
- 按类型、状态筛选
- 查看反馈详情并变更处理状态
- 在 Dashboard 中展示反馈相关统计
- 在用户列表中关联展示用户的反馈数量

---

## 一、数据模型

### Feedback

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识，格式 `fb-xxx` |
| userId | string | 关联用户 ID |
| type | FeedbackType | 反馈类型 |
| title | string | 反馈标题 |
| content | string | 反馈详细内容 |
| status | FeedbackStatus | 当前状态 |
| createdAt | string (ISO 8601) | 创建时间 |
| updatedAt | string (ISO 8601) | 最后更新时间 |

### FeedbackType 枚举

| 值 | 说明 |
|----|------|
| bug | Bug 报告 |
| feature_request | 功能建议 |
| complaint | 投诉 |
| suggestion | 一般建议 |

### FeedbackStatus 枚举

| 值 | 说明 |
|----|------|
| pending | 待处理 |
| in_progress | 处理中 |
| resolved | 已解决 |
| dismissed | 已驳回 |

---

## 二、接口设计

### 2.1 GET /api/feedback

获取反馈列表，支持筛选和分页。

**Query Parameters:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | FeedbackStatus | 否 | 按状态筛选 |
| type | FeedbackType | 否 | 按类型筛选 |
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页条数，默认 10 |

**Response:**

```json
{
  "feedback": [Feedback],
  "total": number,
  "page": number,
  "pageSize": number
}
```

### 2.2 GET /api/feedback/[id]

获取单条反馈详情。

**Response:**

```json
{
  "feedback": Feedback
}
```

**错误处理:**
- 不存在的 id 返回 404 `{ "error": "Feedback not found" }`

### 2.3 PATCH /api/feedback/[id]

更新反馈状态。

**Request Body:**

```json
{
  "status": FeedbackStatus
}
```

**Response:**

```json
{
  "feedback": Feedback  // updatedAt 应更新为当前时间
}
```

**错误处理:**
- 不存在的 id 返回 404
- 无效的 status 值返回 400 `{ "error": "Invalid status" }`

### 2.4 GET /api/users/[id]/feedback

获取某用户的全部反馈。

**Response:**

```json
{
  "feedback": [Feedback]
}
```

### 2.5 GET /api/stats（扩展）

在原有统计基础上增加反馈相关字段。

**Response 新增字段:**

```json
{
  "totalUsers": number,
  "activeUsers": number,
  "newUsersToday": number,
  "newUsersThisWeek": number,
  "feedbackPending": number,
  "feedbackTotal": number,
  "feedbackResolvedToday": number
}
```

---

## 三、页面与 UI

### 3.1 新增页面：/feedback

反馈列表页面。

**布局：**
- 页面标题 "Feedback"
- 筛选栏：类型下拉选择 + 状态下拉选择（选项包含"All"）
- 反馈列表表格，列：标题、类型（带颜色标签）、状态（带颜色标签）、提交用户、创建时间
- 分页控件（上一页/下一页 + 当前页码）

**交互：**
- 筛选变更时，将筛选条件同步到 URL searchParams（`?status=pending&type=bug`）
- 页面加载时从 URL searchParams 恢复筛选状态
- 点击表格行跳转到反馈详情页

**状态标签颜色：**
- pending: 黄色
- in_progress: 蓝色
- resolved: 绿色
- dismissed: 灰色

**类型标签颜色：**
- bug: 红色
- feature_request: 紫色
- complaint: 橙色
- suggestion: 青色

### 3.2 新增页面：/feedback/[id]

反馈详情页面。

**布局：**
- 返回按钮（回到列表页）
- 标题 + 状态标签
- 元信息区：类型、提交用户（可点击跳转用户详情）、创建时间、更新时间
- 内容区：展示反馈正文
- 操作区：状态变更按钮组（根据当前状态显示可用的下一步操作）

**状态流转规则：**
- pending → in_progress / dismissed
- in_progress → resolved / dismissed
- resolved → （无操作）
- dismissed → pending（允许重新打开）

**交互：**
- 点击状态变更按钮后，调用 PATCH 接口
- 成功后乐观更新页面上的状态显示（无需刷新）
- 请求期间按钮显示 loading 状态

### 3.3 修改页面：Dashboard（/）

在现有统计卡片下方或旁边新增：
- "Pending Feedback" 卡片，显示待处理反馈数
- "Total Feedback" 卡片，显示反馈总数

### 3.4 修改页面：Users（/users）

用户表格新增列：
- "Feedback" 列，显示该用户的反馈数量
- 数量为链接，点击跳转到 `/feedback?userId=xxx`（反馈列表页按用户筛选）

### 3.5 导航

侧边栏新增 "Feedback" 导航项（图标：💬），位于 Users 下方。

---

## 四、交互细节

### 4.1 筛选状态管理

- 筛选条件通过 URL searchParams 管理
- 支持的 searchParams: `status`, `type`, `page`
- 修改筛选时使用 `router.replace` 更新 URL（不产生历史记录）
- 页面刷新后筛选状态保留

### 4.2 加载与空状态

- 数据加载时显示 "Loading..." 文本（带 data-testid="loading"）
- 列表为空时显示 "No feedback found" 文本（带 data-testid="empty-state"）

### 4.3 乐观更新

- PATCH 状态变更时，先更新本地 UI，再发请求
- 如果请求失败，回滚状态并显示错误提示

---

## 五、接口测试要求

为以下接口编写测试用例（放置在 `src/__tests__/` 目录下）：

### 5.1 GET /api/feedback
- 无参数返回完整列表（验证返回结构）
- status 筛选返回正确子集
- type 筛选返回正确子集
- 分页参数生效（page + pageSize）
- 组合筛选（status + type 同时使用）

### 5.2 GET /api/feedback/[id]
- 有效 id 返回正确数据
- 无效 id 返回 404

### 5.3 PATCH /api/feedback/[id]
- 有效请求更新状态并返回更新后数据
- updatedAt 字段已更新
- 无效 id 返回 404
- 无效 status 值返回 400

### 5.4 GET /api/users/[id]/feedback
- 有效用户返回其反馈列表
- 无反馈的用户返回空数组

---

## 六、Mock 数据要求

在 `src/lib/mock-data.ts` 中新增 `mockFeedback` 数组，至少包含 15 条反馈数据：
- 覆盖所有 4 种 type
- 覆盖所有 4 种 status
- 分布在至少 5 个不同用户上
- 时间跨度覆盖最近 30 天

---

## 七、技术约束

- 使用 Next.js App Router（不使用 Pages Router）
- API Routes 使用 Route Handlers（`route.ts`）
- 不引入额外依赖包（使用项目已有的 Next.js + Tailwind）
- 类型定义放在 `src/types/index.ts`
- 组件放在 `src/components/` 下
- 页面使用 Client Component（`"use client"`）调用 API
