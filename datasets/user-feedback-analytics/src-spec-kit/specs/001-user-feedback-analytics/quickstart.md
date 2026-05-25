# Quickstart: User Feedback Analytics

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:3000`.

## New Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/feedback` | List feedback (filterable, paginated) |
| GET | `/api/feedback/[id]` | Single feedback detail |
| PATCH | `/api/feedback/[id]` | Update feedback status |
| GET | `/api/users/[id]/feedback` | All feedback for a user |
| GET | `/api/stats` | Dashboard stats (extended) |

## New Pages

| Path | Description |
|------|-------------|
| `/feedback` | Feedback list with filters |
| `/feedback/[id]` | Feedback detail with status actions |

## Modified Pages

| Path | Change |
|------|--------|
| `/` (Dashboard) | +2 stat cards (Pending, Total feedback) |
| `/users` | +Feedback count column |

## Key Files to Edit

1. `src/types/index.ts` — Add `Feedback`, `FeedbackType`, `FeedbackStatus`
2. `src/lib/mock-data.ts` — Add `mockFeedback` (15+ items)
3. `src/components/Sidebar.tsx` — Add "Feedback" nav item
4. `src/app/api/stats/route.ts` — Extend response with feedback stats
5. Create new route handlers and pages per structure in plan.md
