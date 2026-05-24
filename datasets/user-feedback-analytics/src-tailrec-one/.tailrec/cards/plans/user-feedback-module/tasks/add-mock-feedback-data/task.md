---
type: task
title: "Add mock feedback data"
shared: false
description: "Task: Add mock feedback data (plan: user-feedback-module)"
---

# Add mock feedback data

File: `src/lib/mock-data.ts`

Add `mockFeedback: Feedback[]` with 15+ entries:
- Cover all 4 types (bug, feature_request, complaint, suggestion)
- Cover all 4 statuses (pending, in_progress, resolved, dismissed)
- Distribute across users u-001 through u-006 (at least 5 distinct)
- Dates within last 30 days (April-May 2025), ISO 8601 format
- IDs: fb-001 through fb-015+
- Each entry has realistic title/content

Also update `mockStats` to include feedback fields:
```ts
export const mockStats: Stats = {
  ...existing,
  feedbackPending: <count of pending in mockFeedback>,
  feedbackTotal: <mockFeedback.length>,
  feedbackResolvedToday: <count resolved today>,
};
```

Import `Feedback` type (already imported in the file).
