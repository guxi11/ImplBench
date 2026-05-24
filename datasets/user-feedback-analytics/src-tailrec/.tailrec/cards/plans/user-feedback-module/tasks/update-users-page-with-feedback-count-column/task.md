---
title: "Update Users page with feedback count column"
status: pending
next: "add-feedback-nav-item-to-sidebar"
type: task
description: "Task: Update Users page with feedback count column (plan: user-feedback-module)"
---

# Update Users page with feedback count column

File: `src/app/users/page.tsx` — add feedback count
File: `src/components/UserTable.tsx` — add Feedback column

In UserTable:
- Accept new prop `feedbackCounts: Record<string, number>` (userId → count)
- Add "Feedback" column header
- Each row shows count; if > 0, wrap in a Link to `/feedback?userId={user.id}`

In Users page:
- Import mockFeedback from mock-data
- Compute counts: reduce mockFeedback into Record<string, number> by userId
- Pass to UserTable
