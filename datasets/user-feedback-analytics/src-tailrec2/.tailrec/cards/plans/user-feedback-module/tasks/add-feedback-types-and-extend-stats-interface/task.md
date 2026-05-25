---
title: Add Feedback types and extend Stats interface
status: done
next: add-mock-feedback-data
head: true
type: task
description: "Task: Add Feedback types and extend Stats interface (plan:
  user-feedback-module)"
---

# Add Feedback types and extend Stats interface

File: `src/types/index.ts`

Add:
- `FeedbackType` type alias (union of 4 string literals)
- `FeedbackStatus` type alias (union of 4 string literals)
- `Feedback` interface with all 8 fields
- Extend existing `Stats` interface with 3 new fields: `feedbackPending`, `feedbackTotal`, `feedbackResolvedToday`

Keep existing User and Stats types intact.
