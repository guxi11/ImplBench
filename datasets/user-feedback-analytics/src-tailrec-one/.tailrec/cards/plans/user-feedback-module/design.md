---
type: design
title: "User Feedback Module — Design"
shared: false
description: "Shared design constraints for User Feedback Module"
---

## Types (already in src/types/index.ts)

```ts
export type FeedbackType = 'bug' | 'feature_request' | 'complaint' | 'suggestion';
export type FeedbackStatus = 'pending' | 'in_progress' | 'resolved' | 'dismissed';

export interface Feedback {
  id: string;        // format: fb-xxx
  userId: string;
  type: FeedbackType;
  title: string;
  content: string;
  status: FeedbackStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

## Stats (already extended in types)
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

## API Contracts

### GET /api/feedback
Query: status?, type?, page?(default 1), pageSize?(default 10)
Response: `{ feedback: Feedback[], total: number, page: number, pageSize: number }`

### GET /api/feedback/[id]
Response: `{ feedback: Feedback }`
404: `{ error: 'Feedback not found' }`

### PATCH /api/feedback/[id]
Body: `{ status: FeedbackStatus }`
Response: `{ feedback: Feedback }` (updatedAt updated)
404: `{ error: 'Feedback not found' }`
400: `{ error: 'Invalid status' }`

### GET /api/users/[id]/feedback
Response: `{ feedback: Feedback[] }`

### GET /api/stats (extended)
Response: Stats (with feedback fields computed from mock data)

## UI Constants

### Status colors (Tailwind classes)
- pending: `bg-yellow-100 text-yellow-700`
- in_progress: `bg-blue-100 text-blue-700`
- resolved: `bg-green-100 text-green-700`
- dismissed: `bg-gray-100 text-gray-600`

### Type colors (Tailwind classes)
- bug: `bg-red-100 text-red-700`
- feature_request: `bg-purple-100 text-purple-700`
- complaint: `bg-orange-100 text-orange-700`
- suggestion: `bg-cyan-100 text-cyan-700`

### Status transitions
- pending → [in_progress, dismissed]
- in_progress → [resolved, dismissed]
- resolved → []
- dismissed → [pending]

## File Conventions
- Route handlers: `src/app/api/{resource}/route.ts`, dynamic: `src/app/api/{resource}/[id]/route.ts`
- Pages: `src/app/{path}/page.tsx`
- Components: `src/components/{Name}.tsx`
- Mock data: `src/lib/mock-data.ts`
- Types: `src/types/index.ts`
- Feedback pages use `'use client'` and fetch from API
- Existing pages are server components importing mock data directly
- API routes use `NextResponse.json()` pattern
