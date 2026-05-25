---
title: Add mock feedback data
status: done
next: create-feedback-api-routes
type: task
description: "Task: Add mock feedback data (plan: user-feedback-module)"
---

# Add mock feedback data

File: `src/lib/mock-data.ts`

Add `mockFeedback: Feedback[]` with 15+ entries:
- IDs: fb-001 through fb-015+
- userIds: spread across u-001, u-002, u-003, u-004, u-005, u-006, u-007 (at least 5 users)
- Types: mix of all 4 (bug, feature_request, complaint, suggestion)
- Statuses: mix of all 4 (pending, in_progress, resolved, dismissed)
- createdAt: ISO dates spanning last 30 days
- updatedAt: same as or after createdAt
- Titles/content: realistic Chinese feedback text

Update `mockStats` to add:
- `feedbackPending`: count of pending items in mockFeedback
- `feedbackTotal`: total count
- `feedbackResolvedToday`: count resolved today (can be 0 or hardcode 2)

Import `Feedback` type from `@/types`.
