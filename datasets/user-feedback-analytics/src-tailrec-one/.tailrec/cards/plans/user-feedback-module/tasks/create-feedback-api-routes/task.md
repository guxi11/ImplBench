---
type: task
title: "Create feedback API routes"
shared: false
description: "Task: Create feedback API routes (plan: user-feedback-module)"
---

# Create feedback API routes

Create 3 route files:

### `src/app/api/feedback/route.ts`
GET handler:
- Parse searchParams: status, type, page (default 1), pageSize (default 10)
- Filter mockFeedback by status and type if provided
- Slice for pagination
- Return `{ feedback, total, page, pageSize }`

### `src/app/api/feedback/[id]/route.ts`
GET handler:
- Find by id in mockFeedback
- 404 if not found: `{ error: 'Feedback not found' }`
- Return `{ feedback }`

PATCH handler:
- Parse body `{ status }`
- Validate status is one of FeedbackStatus values
- 400 if invalid: `{ error: 'Invalid status' }`
- Find by id, 404 if not found
- Mutate the mock entry (status + updatedAt = new Date().toISOString())
- Return `{ feedback }`

### `src/app/api/users/[id]/feedback/route.ts`
GET handler:
- Filter mockFeedback by userId matching params.id
- Return `{ feedback: [...] }` (empty array if none)

Also update `src/app/api/stats/route.ts`:
- Compute feedbackPending, feedbackTotal, feedbackResolvedToday from mockFeedback
- Return full Stats object
