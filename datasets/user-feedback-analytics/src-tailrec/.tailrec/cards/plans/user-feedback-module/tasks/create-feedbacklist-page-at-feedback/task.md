---
title: "Create FeedbackList page at /feedback"
status: pending
next: "create-feedbackdetail-page-at-feedback-id"
type: task
description: "Task: Create FeedbackList page at /feedback (plan: user-feedback-module)"
---

# Create FeedbackList page at /feedback

File: `src/app/feedback/page.tsx` — `"use client"`

Layout:
- `<h1>` "Feedback"
- Filter row: two `<select>` elements — Type (All/bug/feature_request/complaint/suggestion) and Status (All/pending/in_progress/resolved/dismissed)
- Table: columns — Title, Type (colored pill), Status (colored pill), User (userId), Created (formatted date)
- Pagination: Previous/Next buttons + current page indicator

Behavior:
- On mount, read `searchParams` from URL via `useSearchParams()`
- Fetch `GET /api/feedback?status=X&type=Y&page=Z` on filter/page change
- On filter change: `router.replace` with updated searchParams, reset page to 1
- Loading state: show `<p data-testid="loading">Loading...</p>`
- Empty state: show `<p data-testid="empty-state">No feedback found</p>`
- Click row: `router.push(/feedback/${id})`

Use color maps from design.md for type/status pills. Wrap in `<Suspense>` boundary if needed for useSearchParams.
