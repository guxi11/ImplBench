---
type: task
title: "Handoff → add-feedback-nav-item-to-sidebar"
shared: false
description: "Context handoff from 'update-users-page-with-feedback-count-column' to 'add-feedback-nav-item-to-sidebar'"
---

## Decisions
- Added a new `feedback_count` column to the users table to display the number of feedback entries per user.
- The column is computed via a database query (JOIN/aggregate) rather than stored as a denormalized field.
- The users page now includes a sortable column header for feedback count.

## Tips
- Ensure the feedback count query is optimized (index on `user_id` in feedback table) to avoid performance issues on large datasets.
- The column may need to be hidden or show "0" for users with no feedback — confirm UI requirements.
- If pagination is used, the count query should be scoped to the current page's users.

## State Changes
- **File modified**: `users_page.py` (or equivalent) — added feedback count column rendering and sorting logic.
- **Database schema**: No schema change; feedback count is computed dynamically.
- **API**: No new endpoints created; existing user list endpoint now includes `feedback_count` in response.