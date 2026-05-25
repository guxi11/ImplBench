---
title: Create FeedbackDetail page at /feedback/[id]
status: done
next: update-dashboard-page-with-feedback-stat-cards
type: task
description: "Task: Create FeedbackDetail page at /feedback/[id] (plan:
  user-feedback-module)"
---

# Create FeedbackDetail page at /feedback/[id]

File: `src/app/feedback/[id]/page.tsx` — `"use client"`

Layout:
- Back button (Link to /feedback)
- Title + status pill
- Meta section: type pill, user (link to /users or display userId), created date, updated date
- Content section: feedback body text
- Action buttons based on current status (see transition rules in design.md)

Behavior:
- Fetch `GET /api/feedback/{id}` on mount
- Status change buttons call `PATCH /api/feedback/{id}` with new status
- Optimistic update: update local state immediately, revert on error
- Buttons show loading (disabled) state during request
- Loading state with data-testid="loading"

Transition buttons:
- pending: "Start Processing" (→in_progress), "Dismiss" (→dismissed)
- in_progress: "Resolve" (→resolved), "Dismiss" (→dismissed)
- resolved: no buttons
- dismissed: "Reopen" (→pending)
