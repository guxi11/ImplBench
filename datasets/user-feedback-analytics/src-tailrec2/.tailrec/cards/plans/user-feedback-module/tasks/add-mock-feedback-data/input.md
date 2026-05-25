---
type: task
title: "Handoff → add-mock-feedback-data"
shared: false
description: "Context handoff from 'add-feedback-types-and-extend-stats-interface' to 'add-mock-feedback-data'"
---

## Decisions
- Defined TypeScript types for feedback: `FeedbackCategory` (e.g., `'bug'`, `'feature'`, `'general'`), `FeedbackStatus` (e.g., `'open'`, `'resolved'`), and `Feedback` interface with fields: `id`, `userId`, `category`, `message`, `status`, `createdAt`.
- Extended the existing `Stats` interface to include a `feedbackStats` property: `{ total: number; byCategory: Record<FeedbackCategory, number>; openCount: number }`.

## Tips
- The `Feedback` type uses `userId` (string) — ensure mock data references valid user IDs from the existing user store.
- `feedbackStats` is computed from the feedback array; mock data should include a mix of categories and statuses to test aggregation logic.
- No API endpoints were defined yet — mock data will be used client-side for now.

## State Changes
- **New file**: `src/types/feedback.ts` — contains `FeedbackCategory`, `FeedbackStatus`, `Feedback` interface.
- **Modified file**: `src/types/stats.ts` — added `feedbackStats` field to `Stats` interface.