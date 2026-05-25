---
type: task
title: "Handoff → update-users-page-with-feedback-count-column"
shared: false
description: "Context handoff from 'update-dashboard-page-with-feedback-stat-cards' to 'update-users-page-with-feedback-count-column'"
---

## Decisions
- Added feedback stat cards to the dashboard page, displaying total feedback count, average rating, and recent feedback trends.
- Stat cards are positioned at the top of the dashboard, above existing charts and tables.
- Data is fetched from a new `/api/feedback/stats` endpoint (aggregated counts and averages).

## Tips
- The `/api/feedback/stats` endpoint returns `{ totalFeedback, averageRating, recentTrend }` — ensure the users page uses a similar pattern for per-user counts.
- Stat cards use a shared `StatCard` component; consider reusing it for the users page feedback count column.
- The dashboard page now imports `useFeedbackStats` hook — the users page may need a similar hook or direct API call for per-user data.

## State Changes
- **New file**: `src/pages/Dashboard.jsx` (updated with stat cards section)
- **New file**: `src/components/StatCard.jsx` (reusable stat card component)
- **New file**: `src/hooks/useFeedbackStats.js` (hook to fetch aggregated feedback stats)
- **New API endpoint**: `/api/feedback/stats` (returns `{ totalFeedback, averageRating, recentTrend }`)
- **Schema**: No changes to database schema; stats are computed from existing `feedback` table.