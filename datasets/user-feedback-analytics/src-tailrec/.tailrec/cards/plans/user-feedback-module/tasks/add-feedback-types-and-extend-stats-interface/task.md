---
title: Add Feedback types and extend Stats interface
status: done
next: add-mockfeedback-data-to-mock-data-ts
head: true
type: task
description: "Task: Add Feedback types and extend Stats interface (plan:
  user-feedback-module)"
---

# Add Feedback types and extend Stats interface

File: `src/types/index.ts`

Add:
- `FeedbackType` type union: 'bug' | 'feature_request' | 'complaint' | 'suggestion'
- `FeedbackStatus` type union: 'pending' | 'in_progress' | 'resolved' | 'dismissed'
- `Feedback` interface with fields: id, userId, type, title, content, status, createdAt, updatedAt
- Extend existing `Stats` interface with: feedbackPending (number), feedbackTotal (number), feedbackResolvedToday (number)

Keep existing User and Stats types intact (additive only).
