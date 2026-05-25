---
type: task
title: "Handoff → add-mockfeedback-data-to-mock-data-ts"
shared: false
description: "Context handoff from 'add-feedback-types-and-extend-stats-interface' to 'add-mockfeedback-data-to-mock-data-ts'"
---

## Decisions
- Defined new TypeScript types for feedback: `Feedback`, `FeedbackCategory` (e.g., `bug`, `feature`, `general`), and `FeedbackStatus` (e.g., `open`, `resolved`, `dismissed`).
- Extended the `Stats` interface to include a `feedbackCount` field (number) and a `feedbackByCategory` field (Record<FeedbackCategory, number>).

## Tips
- The `Feedback` type includes fields: `id`, `userId`, `category`, `status`, `message`, `createdAt`. Ensure mock data matches this shape exactly.
- The `Stats` interface now expects `feedbackCount` and `feedbackByCategory` — any existing mock stats objects must be updated to include these fields to avoid TypeScript errors.
- Use the `FeedbackCategory` union type when assigning categories in mock data to maintain type safety.

## State Changes
- **Files created/updated**: `src/types/feedback.ts` (new file with `Feedback`, `FeedbackCategory`, `FeedbackStatus` types)
- **Files modified**: `src/types/stats.ts` (added `feedbackCount` and `feedbackByCategory` to `Stats` interface)
- **No schema changes** (no database or API schema modified in this task)