---
title: "Implement GET /api/feedback with filtering and pagination"
status: pending
next: "implement-get-and-patch-api-feedback-id"
type: task
description: "Task: Implement GET /api/feedback with filtering and pagination (plan: user-feedback-module)"
---

# Implement GET /api/feedback with filtering and pagination

File: `src/app/api/feedback/route.ts`

Implement GET handler:
1. Parse query params from `request.nextUrl.searchParams`: status, type, page (default 1), pageSize (default 10)
2. Filter `mockFeedback` by status and type if provided
3. Calculate total from filtered array
4. Slice for pagination: `(page-1)*pageSize` to `page*pageSize`
5. Return `NextResponse.json({ feedback: sliced, total, page, pageSize })`

Import mockFeedback from `@/lib/mock-data`.
