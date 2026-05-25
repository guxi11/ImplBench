---
title: Create FeedbackDetail page
status: done
next: integrate-feedback-into-dashboard-and-users-pages
type: task
description: "Task: Create FeedbackDetail page (plan: user-feedback-module)"
---

# Create FeedbackDetail page

### Page: `src/app/feedback/[id]/page.tsx`
- `"use client"`
- Fetch `GET /api/feedback/[id]` on mount
- Show loading state
- Layout:
  - Back button (Link to /feedback)
  - Title + status badge
  - Meta info: type badge, user name (link to `/users`), createdAt, updatedAt
  - Content section: feedback body text
  - Action buttons: based on current status transition rules
    - pending: "Start Processing" (→ in_progress), "Dismiss" (→ dismissed)
    - in_progress: "Resolve" (→ resolved), "Dismiss" (→ dismissed)
    - resolved: no buttons
    - dismissed: "Reopen" (→ pending)
- On button click: PATCH `/api/feedback/[id]` with new status
- Optimistic update: immediately update local state, rollback on error
- Button loading state while request is in flight
