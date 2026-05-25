---
type: task
title: "Handoff → create-feedbacklist-page-at-feedback"
shared: false
description: "Context handoff from 'extend-get-api-stats-with-feedback-fields' to 'create-feedbacklist-page-at-feedback'"
---

## Decisions
- Extended the `GET /api/stats` endpoint to include feedback-related fields: `totalFeedback`, `averageRating`, and `ratingDistribution`.
- The `ratingDistribution` field is structured as an object with keys for each rating value (1–5) and counts as values.
- Feedback fields are computed from the `Feedback` model, aggregated per API endpoint.

## Tips
- The `GET /api/stats` response now includes feedback data; ensure the frontend `FeedbackList` page at `/feedback` consumes this endpoint to display aggregated stats.
- The `averageRating` is a float; handle rounding/display formatting on the client side.
- The `ratingDistribution` object may have missing keys for ratings with zero count; normalize to include all 1–5 keys before rendering charts or tables.

## State Changes
- **File modified**: `routes/api/stats.js` — added aggregation logic for feedback fields.
- **Schema used**: `Feedback` model (assumed existing) with fields: `rating` (Number, 1–5), `apiEndpoint` (String), `createdAt` (Date).
- **No new files or schemas created**; only extended existing stats endpoint.