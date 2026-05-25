# Feature Specification: User Feedback Management

## Overview

Add a feedback management module to the existing User Analytics Dashboard, enabling centralized viewing, filtering, and status management of user-submitted feedback (bug reports, feature requests, complaints, suggestions).

## User Stories

### US1 [P1]: View Feedback List

**As** an operations team member, **I want** to view all user feedback in a paginated table with type/status filters, **so that** I can quickly find and triage feedback items.

**Acceptance Criteria**:
- Page at `/feedback` shows a table with columns: Title, Type (colored badge), Status (colored badge), User, Created At
- Filter dropdowns for Type and Status (with "All" option)
- Filters sync to URL searchParams (`?status=pending&type=bug`)
- Page refreshes preserve filter state
- Pagination with prev/next buttons and page indicator
- Click row → navigate to detail page
- Loading state shows "Loading..." with `data-testid="loading"`
- Empty state shows "No feedback found" with `data-testid="empty-state"`

### US2 [P1]: View & Manage Feedback Detail

**As** an operations team member, **I want** to view feedback details and change its processing status, **so that** I can track and manage feedback resolution.

**Acceptance Criteria**:
- Page at `/feedback/[id]` shows: title, status badge, type, submitting user (link to user detail), created/updated timestamps, full content
- Back button returns to list page
- Status action buttons based on current state:
  - pending → "Start Processing" (→in_progress), "Dismiss" (→dismissed)
  - in_progress → "Resolve" (→resolved), "Dismiss" (→dismissed)
  - resolved → no actions
  - dismissed → "Reopen" (→pending)
- Optimistic update: UI changes immediately, rolls back on API failure
- Buttons show loading state during request

### US3 [P2]: Dashboard Feedback Stats

**As** an operations team member, **I want** to see feedback statistics on the dashboard, **so that** I can monitor the feedback backlog at a glance.

**Acceptance Criteria**:
- Dashboard (`/`) shows additional stat cards: "Pending Feedback" count, "Total Feedback" count
- Stats fetched from extended `/api/stats` endpoint

### US4 [P2]: User-Feedback Association

**As** an operations team member, **I want** to see how many feedback items each user has submitted, **so that** I can identify frequent reporters.

**Acceptance Criteria**:
- Users table (`/users`) has a "Feedback" column showing count per user
- Count is a clickable link → navigates to `/feedback?userId=xxx`

### US5 [P1]: Navigation

**As** a user of the dashboard, **I want** a "Feedback" item in the sidebar navigation, **so that** I can access the feedback module.

**Acceptance Criteria**:
- Sidebar has "Feedback" nav item with 💬 icon, positioned below "Users"
- Active state highlighted when on `/feedback` routes

## Technical Requirements

- Next.js App Router (no Pages Router)
- Route Handlers (`route.ts`) for API
- No new runtime dependencies
- Client Components (`"use client"`) for interactive pages
- Types in `src/types/index.ts`
- Mock data in `src/lib/mock-data.ts` (15+ feedback items, all types/statuses, 5+ users, 30-day span)

## Badge Colors

**Status**: pending=yellow, in_progress=blue, resolved=green, dismissed=gray
**Type**: bug=red, feature_request=purple, complaint=orange, suggestion=teal
