---
title: Implement GET and PATCH /api/feedback/[id]
status: done
next: implement-get-api-users-id-feedback
type: task
description: "Task: Implement GET and PATCH /api/feedback/[id] (plan: user-feedback-module)"
---

# Implement GET and PATCH /api/feedback/[id]

File: `src/app/api/feedback/[id]/route.ts`

GET handler:
- Find feedback by `params.id` in mockFeedback
- Found: return `{ feedback }` (200)
- Not found: return `{ error: "Feedback not found" }` (404)

PATCH handler:
- Parse request body JSON for `status` field
- Validate status is one of: pending, in_progress, resolved, dismissed — if not, return 400 `{ error: "Invalid status" }`
- Find feedback by id — if not found, return 404 `{ error: "Feedback not found" }`
- Mutate the mock object: set `status` and `updatedAt` to `new Date().toISOString()`
- Return `{ feedback }` (200)

Note: params come from the route segment `{ params: { id: string } }`.
