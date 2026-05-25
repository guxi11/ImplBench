---
title: Extend GET /api/stats with feedback fields
status: done
next: create-feedbacklist-page-at-feedback
type: task
description: "Task: Extend GET /api/stats with feedback fields (plan: user-feedback-module)"
---

# Extend GET /api/stats with feedback fields

File: `src/app/api/stats/route.ts`

Modify existing GET handler:
- Import mockFeedback from `@/lib/mock-data`
- Compute dynamically: feedbackPending (count where status === 'pending'), feedbackTotal (mockFeedback.length), feedbackResolvedToday (count where status === 'resolved' AND updatedAt is today)
- Spread mockStats and override with computed feedback fields
- Return merged object via NextResponse.json()
