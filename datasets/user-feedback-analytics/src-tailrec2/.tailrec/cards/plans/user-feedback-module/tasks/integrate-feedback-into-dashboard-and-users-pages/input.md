---
type: task
title: "Handoff → integrate-feedback-into-dashboard-and-users-pages"
shared: false
description: "Context handoff from 'create-feedbackdetail-page' to 'integrate-feedback-into-dashboard-and-users-pages'"
---

## Decisions
- Feedback detail page will display full feedback content, metadata (timestamp, user ID), and status (read/unread).
- Page route: `/feedback/:id` with dynamic routing.
- Feedback data fetched via a dedicated API endpoint `GET /api/feedback/:id`.
- UI includes a "Mark as Read" toggle and a "Delete" button with confirmation dialog.

## Tips
- Ensure the feedback detail page handles loading and error states gracefully (e.g., spinner, error message).
- The "Mark as Read" action should update the feedback status in the database and reflect immediately in the UI.
- Deleting feedback should remove it from the list view as well — consider using a callback or state management update.
- Test edge cases: non-existent feedback ID, network failure, rapid toggle clicks.

## State Changes
- **New file**: `pages/feedback/[id].tsx` (or equivalent) — feedback detail page component.
- **New API route**: `pages/api/feedback/[id].ts` — handles GET (fetch single feedback), PATCH (mark as read), DELETE (remove feedback).
- **Schema**: Feedback model updated to include `status` field (enum: `read`, `unread`) if not already present.
- **State**: Feedback list page may need to refresh after delete/mark-read actions — consider using SWR or React Query invalidation.