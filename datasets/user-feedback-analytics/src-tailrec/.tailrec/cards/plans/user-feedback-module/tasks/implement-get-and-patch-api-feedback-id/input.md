---
type: task
title: "Handoff → implement-get-and-patch-api-feedback-id"
shared: false
description: "Context handoff from 'implement-get-api-feedback-with-filtering-and-pagination' to 'implement-get-and-patch-api-feedback-id'"
---

## Decisions
- GET `/api/feedback` endpoint implemented with query parameters: `page` (default 1), `limit` (default 10), `type` (optional filter), `status` (optional filter), `sortBy` (default `createdAt`), `sortOrder` (default `desc`).
- Pagination response structure: `{ data: [...], total, page, limit, totalPages }`.
- Filtering logic: `type` and `status` are case-insensitive exact matches; invalid filter values return empty results (no error).
- Sorting: only `createdAt` and `updatedAt` fields allowed for `sortBy`; invalid `sortBy` defaults to `createdAt`.

## Tips
- The GET `/api/feedback` endpoint is already tested and working; ensure the new GET `/api/feedback/:id` endpoint reuses the same database connection and error handling patterns.
- For PATCH `/api/feedback/:id`, note that `type` and `status` fields are validated against a predefined enum (e.g., `['bug', 'feature', 'improvement']` for type, `['open', 'in-progress', 'resolved']` for status). Reuse validation logic from the filtering implementation.
- The `id` parameter is a MongoDB ObjectId; handle `CastError` gracefully with a 400 response for invalid IDs.

## State Changes
- **New file**: `routes/feedback.js` — contains GET `/api/feedback` route with filtering and pagination logic.
- **New file**: `controllers/feedbackController.js` — contains `getFeedback` function implementing the query logic.
- **Schema**: `Feedback` model (assumed existing) used; no schema changes made.
- **Dependencies**: No new packages added; uses existing `express`, `mongoose`.