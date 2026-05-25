---
title: Integrate feedback into Dashboard and Users pages
status: done
next: null
type: task
description: "Task: Integrate feedback into Dashboard and Users pages (plan:
  user-feedback-module)"
---

# Integrate feedback into Dashboard and Users pages

### Modify `src/app/page.tsx` (Dashboard)
- Convert to `"use client"`
- Fetch from `GET /api/stats` instead of importing mockStats
- Add two new StatCards after existing ones:
  - "Pending Feedback" with value `feedbackPending`, icon '⏳'
  - "Total Feedback" with value `feedbackTotal`, icon '💬'
- Show loading state while fetching

### Modify `src/app/users/page.tsx` (Users)
- Convert to `"use client"`
- Fetch users from `GET /api/users`
- For each user, fetch feedback count (or add a batch approach)
- Better approach: add feedback count to users API response, or compute from a single `/api/feedback` call
- Simplest: fetch all feedback once, compute count per user client-side
- Add "Feedback" column to UserTable showing count as a link to `/feedback?userId=xxx`

### Modify `src/components/UserTable.tsx`
- Add optional `feedbackCounts?: Record<string, number>` prop
- Render Feedback column with count, linked to `/feedback?userId={user.id}`

### Modify `src/components/Sidebar.tsx`
- Add `{ href: '/feedback', label: 'Feedback', icon: '💬' }` to navItems after Users
- Update pathname matching: use `startsWith` for /feedback to highlight on sub-routes
