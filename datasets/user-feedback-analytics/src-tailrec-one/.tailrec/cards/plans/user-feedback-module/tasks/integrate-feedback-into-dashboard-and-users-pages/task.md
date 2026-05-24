---
type: task
title: "Integrate feedback into dashboard and users pages"
shared: false
description: "Task: Integrate feedback into dashboard and users pages (plan: user-feedback-module)"
---

# Integrate feedback into dashboard and users pages

### Dashboard (`src/app/page.tsx`)
Convert to client component OR keep server component fetching from mock-data.
PRD says add two stat cards:
- 'Pending Feedback' showing feedbackPending (icon: ⏳)
- 'Total Feedback' showing feedbackTotal (icon: 💬)

Since existing dashboard imports mockStats directly and types already include feedback fields, just add the two StatCard elements after existing ones. Compute feedback stats from mockFeedback:
```ts
import { mockStats, mockFeedback } from '@/lib/mock-data';
```
Or rely on mockStats already having the values (after task 1).

### Users page (`src/app/users/page.tsx`)
Add 'Feedback' column to UserTable showing count of feedback per user.
- Modify `src/components/UserTable.tsx`: accept optional `feedbackCounts: Record<string, number>` prop
- New column header: 'Feedback'
- Cell: count as a Link to `/feedback?userId={id}` (note: userId filter not in PRD API but the link is specified)
- In users/page.tsx: compute counts from mockFeedback

### Sidebar (`src/components/Sidebar.tsx`)
Add nav item: `{ href: '/feedback', label: 'Feedback', icon: '💬' }` after Users.
