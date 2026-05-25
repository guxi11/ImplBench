---
type: task
title: "Handoff → implement-get-api-users-id-feedback"
shared: false
description: "Context handoff from 'implement-get-and-patch-api-feedback-id' to 'implement-get-api-users-id-feedback'"
---

## Decisions
- GET `/api/feedback/:id` returns a single feedback object by its unique ID.
- PATCH `/api/feedback/:id` accepts partial updates (e.g., `status`, `message`) and returns the updated feedback object.
- Both endpoints validate that the feedback ID exists before proceeding; return 404 if not found.
- PATCH uses a whitelist of allowed fields to prevent unintended updates.

## Tips
- The feedback ID is a UUID string; ensure your route parameter parsing handles this correctly.
- For the next task (`GET /api/users/:id/feedback`), you will need to query feedbacks by user ID, not feedback ID — reuse the same feedback model but filter by `userId`.
- Consider pagination for the user-specific feedback list endpoint, as a user may have many feedback entries.
- The existing feedback model includes fields: `id`, `userId`, `message`, `status`, `createdAt`, `updatedAt`.

## State Changes
- **New file**: `routes/feedback.js` — contains GET and PATCH handlers for `/api/feedback/:id`.
- **New file**: `controllers/feedbackController.js` — implements `getFeedbackById` and `updateFeedbackById` functions.
- **Model**: Feedback model (assumed existing) is used; no schema changes made.
- **Validation**: Added middleware for ID existence check (404 handling).