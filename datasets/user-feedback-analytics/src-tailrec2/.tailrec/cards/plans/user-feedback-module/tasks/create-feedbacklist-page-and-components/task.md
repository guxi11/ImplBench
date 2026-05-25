---
title: Create FeedbackList page and components
status: done
next: create-feedbackdetail-page
type: task
description: "Task: Create FeedbackList page and components (plan: user-feedback-module)"
---

# Create FeedbackList page and components

### Page: `src/app/feedback/page.tsx`
- `"use client"`
- Read `status`, `type`, `page` from URL searchParams (useSearchParams)
- Fetch `GET /api/feedback?status=...&type=...&page=...`
- Show loading state with `data-testid="loading"`
- Show empty state with `data-testid="empty-state"` when feedback array is empty
- Render filter bar: two `<select>` dropdowns (type + status) with "All" option
- On filter change: `router.replace` with updated searchParams
- Render feedback table with columns: Title, Type (colored badge), Status (colored badge), User, Created
- Click row → navigate to `/feedback/[id]`
- Pagination: Previous/Next buttons + page number display

### Component: `src/components/FeedbackBadge.tsx`
- Props: `{ type: 'status' | 'type', value: string }`
- Renders colored pill badge using the color maps from design.md
- Reused in both list and detail pages
