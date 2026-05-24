---
type: task
title: "Create feedback detail page"
shared: false
description: "Task: Create feedback detail page (plan: user-feedback-module)"
---

# Create feedback detail page

File: `src/app/feedback/[id]/page.tsx` — `'use client'`

Layout:
- Back button (Link to /feedback)
- Title + status badge
- Meta section: type badge, user (link to /users), createdAt, updatedAt
- Content section: feedback body text
- Action buttons: show available transitions based on current status

Status transitions (from design.md):
- pending → [in_progress, dismissed]
- in_progress → [resolved, dismissed]
- resolved → []
- dismissed → [pending]

Behavior:
- Fetch `GET /api/feedback/{id}` on mount
- Loading state with `data-testid='loading'`
- On action button click:
  1. Optimistically update local state
  2. Call `PATCH /api/feedback/{id}` with new status
  3. On failure: revert state, show error
  4. Button shows loading during request

Use same color constants as list page.
