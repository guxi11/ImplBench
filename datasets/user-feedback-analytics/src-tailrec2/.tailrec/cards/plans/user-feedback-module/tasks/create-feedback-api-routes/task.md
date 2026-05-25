---
title: Create feedback API routes
status: done
next: create-feedbacklist-page-and-components
type: task
description: "Task: Create feedback API routes (plan: user-feedback-module)"
---

# Create feedback API routes

Create 3 route files:

### `src/app/api/feedback/route.ts`
- GET handler with searchParams: status, type, page (default 1), pageSize (default 10)
- Filter mockFeedback by status and/or type if provided
- Slice for pagination
- Return `{ feedback, total, page, pageSize }`

### `src/app/api/feedback/[id]/route.ts`
- GET: find by id in mockFeedback, return `{ feedback }` or 404 `{ error: 'Feedback not found' }`
- PATCH: parse body for `status`, validate against FeedbackStatus values, update in-place, set `updatedAt` to `new Date().toISOString()`, return updated `{ feedback }`. Invalid status → 400 `{ error: 'Invalid status' }`. Not found → 404.

### `src/app/api/users/[id]/feedback/route.ts`
- GET: filter mockFeedback by userId matching `params.id`, return `{ feedback }`

### Extend `src/app/api/stats/route.ts`
- Import mockFeedback, compute feedbackPending/feedbackTotal/feedbackResolvedToday dynamically
- Merge with existing mockStats fields
