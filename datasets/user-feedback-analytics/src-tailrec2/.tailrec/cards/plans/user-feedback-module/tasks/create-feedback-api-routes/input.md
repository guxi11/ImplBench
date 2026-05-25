---
type: task
title: "Handoff → create-feedback-api-routes"
shared: false
description: "Context handoff from 'add-mock-feedback-data' to 'create-feedback-api-routes'"
---

## Decisions
- Decided to use a static JSON file (`mockFeedbackData.json`) as the source for mock feedback data.
- Chose to structure each feedback entry with fields: `id`, `userId`, `rating`, `comment`, `createdAt`.

## Tips
- The mock data file is located in the `data/` directory; ensure the API routes import from the correct path.
- Ratings are integers from 1 to 5; no validation is applied in the mock data, so the API should handle edge cases gracefully.
- The `createdAt` field uses ISO 8601 date strings; maintain this format in any new mock entries.

## State Changes
- Created file: `data/mockFeedbackData.json` containing an array of 10 sample feedback objects.