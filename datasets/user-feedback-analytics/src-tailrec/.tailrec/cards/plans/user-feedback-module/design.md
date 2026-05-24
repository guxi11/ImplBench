---
type: design
title: "User Feedback Module — Design"
shared: false
description: "Shared design constraints for User Feedback Module"
---

## Types (src/types/index.ts)

```ts
export type FeedbackType = 'bug' | 'feature_request' | 'complaint' | 'suggestion';
export type FeedbackStatus = 'pending' | 'in_progress' | 'resolved' | 'dismissed';

export interface Feedback {
  id: string;        // format: fb-xxx
  userId: string;    // references User.id
  type: FeedbackType;
  title: string;
  content: string;
  status: FeedbackStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

Extend Stats:
```ts
export interface Stats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  feedbackPending: number;
  feedbackTotal: number;
  feedbackResolvedToday: number;
}
```

## API Response Shapes

- `GET /api/feedback` → `{ feedback: Feedback[], total: number, page: number, pageSize: number }`
- `GET /api/feedback/[id]` → `{ feedback: Feedback }` | 404 `{ error: "Feedback not found" }`
- `PATCH /api/feedback/[id]` → `{ feedback: Feedback }` | 404 | 400 `{ error: "Invalid status" }`
- `GET /api/users/[id]/feedback` → `{ feedback: Feedback[] }`
- `GET /api/stats` → full Stats object (extended)

## Status Color Map

| Status | Tailwind |
|--------|----------|
| pending | bg-yellow-100 text-yellow-700 |
| in_progress | bg-blue-100 text-blue-700 |
| resolved | bg-green-100 text-green-700 |
| dismissed | bg-gray-100 text-gray-600 |

## Type Color Map

| Type | Tailwind |
|------|----------|
| bug | bg-red-100 text-red-700 |
| feature_request | bg-purple-100 text-purple-700 |
| complaint | bg-orange-100 text-orange-700 |
| suggestion | bg-cyan-100 text-cyan-700 |

## Status Transitions

- pending → [in_progress, dismissed]
- in_progress → [resolved, dismissed]
- resolved → [] (terminal)
- dismissed → [pending] (reopen)

## File Conventions (from codebase)

- API routes: `src/app/api/<resource>/route.ts` (dynamic: `src/app/api/<resource>/[id]/route.ts`)
- Pages: `src/app/<route>/page.tsx`
- Components: `src/components/<Name>.tsx` (PascalCase)
- Client components: `"use client"` directive at top
- Sidebar nav: `navItems` array in `src/components/Sidebar.tsx`
- Tables: white bg, rounded-xl, shadow-sm, border-gray-100, text-sm
- Status pills: `px-2 py-1 rounded-full text-xs font-medium`

## URL SearchParams (feedback list)

Supported params: `status`, `type`, `page` (pageSize fixed at 10)
- Use `useSearchParams()` to read, `router.replace()` to update
- Filters sync bi-directionally with URL

## Loading/Empty States

- Loading: `<p data-testid="loading">Loading...</p>`
- Empty: `<p data-testid="empty-state">No feedback found</p>`
