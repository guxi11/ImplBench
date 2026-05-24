---
type: task
title: "Create feedback list page"
shared: false
description: "Task: Create feedback list page (plan: user-feedback-module)"
---

# Create feedback list page

File: `src/app/feedback/page.tsx` — `'use client'`

Layout:
- `<h1>Feedback</h1>`
- Filter bar: two `<select>` elements for type and status (options include 'All' + enum values)
- Table with columns: Title, Type (colored badge), Status (colored badge), User, Created
- Pagination: Prev/Next buttons + page number display

Behavior:
- On mount, read `searchParams` from URL (useSearchParams)
- Fetch `GET /api/feedback?status=...&type=...&page=...`
- On filter change: update URL with `router.replace` (no history push)
- Loading state: show 'Loading...' with `data-testid='loading'`
- Empty state: show 'No feedback found' with `data-testid='empty-state'`
- Click row → `router.push('/feedback/{id}')`

Use color constants from design.md for badges. Display user name by finding in a fetched users list or just show userId.
