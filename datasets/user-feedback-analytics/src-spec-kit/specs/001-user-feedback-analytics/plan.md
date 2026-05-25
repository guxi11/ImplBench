# Implementation Plan: User Feedback Analytics

**Branch**: `001-user-feedback-analytics` | **Date**: 2026-05-26 | **Spec**: `specs/001-user-feedback-analytics/spec.md`

**Input**: PRD for user feedback module in existing User Analytics Dashboard

## Summary

Add a feedback management module to the existing Next.js analytics dashboard. Implements CRUD API routes for feedback data, two new pages (list + detail), dashboard stat extensions, and user-feedback association — all backed by in-memory mock data with no new dependencies.

## Technical Context

**Language/Version**: TypeScript 5.7+ / Next.js 15 / React 19

**Primary Dependencies**: Next.js (App Router), React, Tailwind CSS — no additions

**Storage**: In-memory mock data (`src/lib/mock-data.ts`) — no database

**Testing**: No test framework currently installed (PRD requires API tests in `src/__tests__/`)

**Target Platform**: Web (browser) — server-side rendering + client components

**Project Type**: Web application (internal dashboard)

**Performance Goals**: N/A (internal tool, mock data)

**Constraints**: No new dependencies; App Router only; Route Handlers for API; Client Components for pages

**Scale/Scope**: 15+ mock feedback items, 4 API routes, 2 new pages, 2 modified pages

## Constitution Check

*GATE: Pass — constitution is template/placeholder only, no active constraints defined.*

No violations. The constitution file contains only placeholder content with no ratified principles.

## Project Structure

### Documentation (this feature)

```text
specs/001-user-feedback-analytics/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    ├── get-feedback-list.md
    ├── get-feedback-detail.md
    ├── patch-feedback-status.md
    ├── get-user-feedback.md
    └── get-stats.md
```

### Source Code (repository root)

```text
src/
├── types/index.ts                      # + Feedback, FeedbackType, FeedbackStatus
├── lib/mock-data.ts                    # + mockFeedback array (15+ items)
├── components/
│   ├── Sidebar.tsx                     # + Feedback nav item
│   ├── StatCard.tsx                    # (unchanged)
│   ├── UserTable.tsx                   # + feedback count column
│   ├── FeedbackTable.tsx               # NEW: list table component
│   ├── FeedbackStatusBadge.tsx         # NEW: colored status label
│   └── FeedbackTypeBadge.tsx           # NEW: colored type label
├── app/
│   ├── page.tsx                        # + feedback stat cards
│   ├── users/page.tsx                  # + feedback count column
│   ├── feedback/
│   │   ├── page.tsx                    # NEW: feedback list page
│   │   └── [id]/page.tsx              # NEW: feedback detail page
│   └── api/
│       ├── stats/route.ts             # + feedback stats fields
│       ├── feedback/
│       │   ├── route.ts               # NEW: GET list
│       │   └── [id]/route.ts          # NEW: GET detail, PATCH status
│       └── users/
│           └── [id]/
│               └── feedback/route.ts  # NEW: GET user feedback
└── __tests__/                          # API route tests (if test framework added)
```

**Structure Decision**: Extends existing flat `src/` structure. New pages under `app/feedback/`, new API routes under `app/api/feedback/`. Shared badge components extracted for reuse.

## Complexity Tracking

No violations to justify.
