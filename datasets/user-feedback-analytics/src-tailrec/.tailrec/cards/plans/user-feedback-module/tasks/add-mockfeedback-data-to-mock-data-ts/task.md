---
title: "Add mockFeedback data to mock-data.ts"
status: pending
next: "implement-get-api-feedback-with-filtering-and-pagination"
type: task
description: "Task: Add mockFeedback data to mock-data.ts (plan: user-feedback-module)"
---

# Add mockFeedback data to mock-data.ts

File: `src/lib/mock-data.ts`

Add `mockFeedback: Feedback[]` with 15+ entries:
- Cover all 4 types (bug, feature_request, complaint, suggestion)
- Cover all 4 statuses (pending, in_progress, resolved, dismissed)
- Distribute across users u-001 through u-006 (at least 5 different users)
- Dates spanning last 30 days (April 25 – May 25, 2026)
- At least 1 resolved item with today's date (May 25) for feedbackResolvedToday
- IDs: fb-001 through fb-015+

Update `mockStats` to include: `feedbackPending` (count of pending items), `feedbackTotal` (total count), `feedbackResolvedToday` (count resolved today).

Import `Feedback` from `@/types`.
