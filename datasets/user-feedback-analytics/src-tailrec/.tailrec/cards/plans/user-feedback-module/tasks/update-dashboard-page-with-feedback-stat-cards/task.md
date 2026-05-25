---
title: Update Dashboard page with feedback stat cards
status: done
next: update-users-page-with-feedback-count-column
type: task
description: "Task: Update Dashboard page with feedback stat cards (plan:
  user-feedback-module)"
---

# Update Dashboard page with feedback stat cards

File: `src/app/page.tsx`

Add two StatCard components after existing cards:
- `<StatCard title="Pending Feedback" value={feedbackPending} icon="⏳" />`
- `<StatCard title="Total Feedback" value={feedbackTotal} icon="💬" />`

Keep as server component. Import mockFeedback from mock-data, compute feedbackPending (count pending) and feedbackTotal (length) inline.
