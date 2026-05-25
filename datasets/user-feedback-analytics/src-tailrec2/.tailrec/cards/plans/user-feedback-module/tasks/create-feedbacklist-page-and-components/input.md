---
type: task
title: "Handoff → create-feedbacklist-page-and-components"
shared: false
description: "Context handoff from 'create-feedback-api-routes' to 'create-feedbacklist-page-and-components'"
---

## Decisions
- Feedback API routes will follow RESTful conventions under `/api/feedback`
- Endpoints: `GET /api/feedback` (list), `POST /api/feedback` (create), `GET /api/feedback/:id` (detail), `DELETE /api/feedback/:id` (delete)
- Response format: standard JSON with `{ success, data, error }` envelope
- Authentication required for all endpoints (middleware already in place)
- Pagination support for list endpoint: `?page=1&limit=20`

## Tips
- The API returns `createdAt` as ISO string — use `new Date()` in components for formatting
- `POST /api/feedback` expects `{ rating: number (1-5), comment: string, userId: string }` — validate rating range on client side too
- List endpoint supports `?sortBy=createdAt&order=desc` — pass these params from the page
- Error responses include `error.message` — display this in UI toast/alert
- No caching headers set yet — consider adding `stale-while-revalidate` if needed

## State Changes
- **New files created:**
  - `src/app/api/feedback/route.ts` (GET, POST handlers)
  - `src/app/api/feedback/[id]/route.ts` (GET, DELETE handlers)
- **Schema modified:**
  - `prisma/schema.prisma` — added `Feedback` model with fields: `id`, `rating`, `comment`, `userId`, `createdAt`, `updatedAt`
- **Database migration:** Applied (feedback table created)