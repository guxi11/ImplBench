# ImplBench

评估 AI Agent 在不同策略下实现需求的 benchmark。

## 目标

对比在不同策略下，完成一件复杂任务并达到验收标准，所需花费的 token 数量。

## 测试集结构

```
datasets/
└── {dataset-name}/
    ├── init/                # 基础项目（可运行的已有系统）
    ├── prd.md               # 需求文档（待实现的增量功能）
    └── evaluation/
        └── test_plan.json   # 验收标准（AAA 格式）
```

### 组成部分

| 部分 | 说明 |
|------|------|
| init/ | 一个可运行的全栈 web 项目，代表"已有系统"状态 |
| prd.md | 结构化需求文档，描述要在已有系统上新增的功能 |
| test_plan.json | 验收标准，按 Arrange-Act-Assert 格式定义，可被 LLM 或自动化工具评估 |

### 设计原则

- **增量需求**：不是从零构建，而是在已有项目上添加功能
- **任务关联性**：PRD 中的子任务高度关联，模拟一次 plan 完成的真实场景
- **全栈覆盖**：涉及数据建模、API 实现、UI 开发、测试编写
- **可验证**：每个验收点都是确定性的，可自动化评判

## 当前数据集

### user-feedback-analytics

- **基础项目**：Next.js 用户分析看板（Dashboard + 用户列表 + Mock API）
- **需求**：新增用户反馈模块（列表、详情、状态流转、筛选、统计集成）
- **验收点**：34 个，涵盖 API / UI / 集成 / 测试代码 四类

```bash
cd datasets/user-feedback-analytics/init
npm install && npm run dev
```

## Workload

标准化操作流程：
1. 使用 tui 开启任务
2. 让 AI 读取 prd 文档，生成 plan 和 tasks
3. 让 AI 分步骤完成任务（实现 + 归档）

## 指标

usage/cost 对比，可直接在会话中获取。


## usage

npm run init -- user-feedback-analytics tailrec

