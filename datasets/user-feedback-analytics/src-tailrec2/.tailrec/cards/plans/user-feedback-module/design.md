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

Extend existing Stats:
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
- `GET /api/stats` → extended Stats object (flat)

## Query Params for GET /api/feedback

- `status?: FeedbackStatus`
- `type?: FeedbackType`
- `page?: number` (default 1)
- `pageSize?: number` (default 10)

## Status Transition Rules

- pending → in_progress | dismissed
- in_progress → resolved | dismissed
- resolved → (none)
- dismissed → pending

## UI Color Maps

Status badge colors (Tailwind):
- pending: `bg-yellow-100 text-yellow-700`
- in_progress: `bg-blue-100 text-blue-700`
- resolved: `bg-green-100 text-green-700`
- dismissed: `bg-gray-100 text-gray-600`

Type badge colors (Tailwind):
- bug: `bg-red-100 text-red-700`
- feature_request: `bg-purple-100 text-purple-700`
- complaint: `bg-orange-100 text-orange-700`
- suggestion: `bg-cyan-100 text-cyan-700`

## File Conventions (from codebase)

- Route handlers: `src/app/api/<resource>/route.ts`, dynamic: `src/app/api/<resource>/[id]/route.ts`
- Pages: `src/app/<path>/page.tsx`
- Components: `src/components/<Name>.tsx`
- Types: `src/types/index.ts`
- Mock data: `src/lib/mock-data.ts`
- Path alias: `@/*` → `./src/*`
- All new pages: `"use client"` + fetch from API
- Existing components: functional, Tailwind, props interface

## Mock Data Requirements

- 15+ Feedback items in `mockFeedback` array
- Cover all 4 types, all 4 statuses
- Distributed across 5+ users (u-001 through u-010)
- Dates within last 30 days
- Mutable array (PATCH modifies in-place for demo)

## Navigation

Add to Sidebar navItems: `{ href: '/feedback', label: 'Feedback', icon: '💬' }` after Users.

## Loading/Empty States

- Loading: `<p data-testid="loading">Loading...</p>`
- Empty: `<p data-testid="empty-state">No feedback found</p>`
