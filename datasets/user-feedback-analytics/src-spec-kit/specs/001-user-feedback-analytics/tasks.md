# Tasks: User Feedback Analytics

**Input**: Design documents from `/specs/001-user-feedback-analytics/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Included — PRD Section V explicitly requires API route tests.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Exact file paths included in descriptions

---

## Phase 1: Setup

**Purpose**: Type definitions and mock data — prerequisites for all subsequent work

- [x] T001 Add Feedback, FeedbackType, FeedbackStatus types in src/types/index.ts
- [x] T002 Add mockFeedback array (15+ items, all types/statuses, 5+ users, 30-day span) in src/lib/mock-data.ts

---

## Phase 2: Foundational (Shared Components)

**Purpose**: Reusable UI components needed by multiple user stories

**⚠️ CRITICAL**: US1 and US2 both depend on badge components

- [x] T003 [P] Create FeedbackStatusBadge component (yellow/blue/green/gray) in src/components/FeedbackStatusBadge.tsx
- [x] T004 [P] Create FeedbackTypeBadge component (red/purple/orange/teal) in src/components/FeedbackTypeBadge.tsx

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 5 — Navigation (Priority: P1)

**Goal**: Add "Feedback" nav item to sidebar so users can access the module

**Independent Test**: Click sidebar "Feedback" link → navigates to /feedback; active state shown on feedback routes

- [x] T005 [US5] Add "Feedback" nav item (💬 icon, below Users) in src/components/Sidebar.tsx

**Checkpoint**: Sidebar navigation complete

---

## Phase 4: User Story 1 — Feedback List (Priority: P1) 🎯 MVP

**Goal**: Paginated feedback table with type/status filtering, URL-synced filters

**Independent Test**: Visit /feedback → see table with all feedback; apply filters → URL updates and list filters; paginate → correct subset shown; click row → navigates to /feedback/[id]

### Implementation for User Story 1

- [x] T006 [US1] Implement GET /api/feedback route handler (filter + paginate mockFeedback) in src/app/api/feedback/route.ts
- [x] T007 [US1] Create FeedbackTable component (columns: title, type badge, status badge, user, date; row click handler) in src/components/FeedbackTable.tsx
- [x] T008 [US1] Create feedback list page with filters, table, pagination, URL searchParams sync in src/app/feedback/page.tsx

**Checkpoint**: Feedback list fully functional — filterable, paginated, URL-persistent

---

## Phase 5: User Story 2 — Feedback Detail & Status Management (Priority: P1)

**Goal**: View feedback details and transition status with optimistic UI updates

**Independent Test**: Visit /feedback/[id] → see full details; click status action → UI updates immediately; back button returns to list

### Implementation for User Story 2

- [x] T009 [P] [US2] Implement GET /api/feedback/[id] route handler in src/app/api/feedback/[id]/route.ts
- [x] T010 [P] [US2] Implement PATCH /api/feedback/[id] route handler (validate status, update updatedAt) in src/app/api/feedback/[id]/route.ts
- [x] T011 [US2] Create feedback detail page with status actions, optimistic update, loading states in src/app/feedback/[id]/page.tsx

**Checkpoint**: Detail page with full status workflow operational

---

## Phase 6: User Story 3 — Dashboard Feedback Stats (Priority: P2)

**Goal**: Show pending and total feedback counts on dashboard

**Independent Test**: Visit / → see "Pending Feedback" and "Total Feedback" stat cards with correct counts

### Implementation for User Story 3

- [x] T012 [US3] Extend GET /api/stats to include feedbackPending, feedbackTotal, feedbackResolvedToday in src/app/api/stats/route.ts
- [x] T013 [US3] Add feedback stat cards to dashboard page in src/app/page.tsx

**Checkpoint**: Dashboard shows live feedback metrics

---

## Phase 7: User Story 4 — User-Feedback Association (Priority: P2)

**Goal**: Show per-user feedback count in users table, linked to filtered feedback list

**Independent Test**: Visit /users → see "Feedback" column with counts; click count → navigates to /feedback filtered by that user

### Implementation for User Story 4

- [x] T014 [US4] Implement GET /api/users/[id]/feedback route handler in src/app/api/users/[id]/feedback/route.ts
- [x] T015 [US4] Add feedback count column (linked to /feedback?userId=xxx) to UserTable in src/components/UserTable.tsx
- [x] T016 [US4] Update users page to fetch and pass feedback counts in src/app/users/page.tsx

**Checkpoint**: Users table shows feedback association with navigation

---

## Phase 8: Polish & Testing

**Purpose**: API tests (PRD requirement), cross-cutting validation

- [x] T017 [P] Write tests for GET /api/feedback (list, filters, pagination, combined) in src/__tests__/feedback-list.test.ts
- [x] T018 [P] Write tests for GET /api/feedback/[id] (valid id, 404) in src/__tests__/feedback-detail.test.ts
- [x] T019 [P] Write tests for PATCH /api/feedback/[id] (status update, updatedAt, 404, 400) in src/__tests__/feedback-patch.test.ts
- [x] T020 [P] Write tests for GET /api/users/[id]/feedback (with feedback, empty array) in src/__tests__/user-feedback.test.ts
- [ ] T021 Verify all pages build without errors via npm run build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 (needs types)
- **Phase 3 (US5 Navigation)**: Depends on Phase 1 only (no components needed)
- **Phase 4 (US1 List)**: Depends on Phase 1 + Phase 2 (needs types, mock data, badges)
- **Phase 5 (US2 Detail)**: Depends on Phase 1 + Phase 2 (needs types, mock data, badges)
- **Phase 6 (US3 Dashboard)**: Depends on Phase 1 (needs types, mock data)
- **Phase 7 (US4 Users)**: Depends on Phase 1 (needs types, mock data)
- **Phase 8 (Tests)**: Depends on Phases 4–7 (tests the implemented routes)

### User Story Independence

- **US5**: Fully independent (sidebar only)
- **US1**: Independent (own route + page)
- **US2**: Independent (own route + page), but navigates from US1
- **US3**: Independent (extends existing dashboard)
- **US4**: Independent (extends existing users page)

### Parallel Opportunities

- T003 + T004: Badge components in parallel
- T005 + T006: Navigation + API route in parallel (different files)
- T009 + T010: Both in same file but GET + PATCH are independent functions
- T012 + T014: Different API routes in parallel
- T017 + T018 + T019 + T020: All test files in parallel

---

## Implementation Strategy

### MVP First (US1 + US2 + US5)

1. Phase 1: Types + mock data
2. Phase 2: Badge components
3. Phase 3: Sidebar nav
4. Phase 4: Feedback list
5. Phase 5: Feedback detail
6. **VALIDATE**: Full feedback CRUD workflow operational

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US5 (Navigation) → Access point exists
3. US1 (List) → Can browse feedback → **MVP Demo**
4. US2 (Detail) → Can manage feedback status
5. US3 (Dashboard Stats) → At-a-glance metrics
6. US4 (User Association) → Cross-reference users↔feedback
7. Tests → Confidence for maintenance
