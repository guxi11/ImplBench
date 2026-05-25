# Research: User Feedback Analytics

## Decision: API Route Pattern

**Decision**: Use Next.js App Router Route Handlers with dynamic segments (`[id]`)

**Rationale**: Project already uses this pattern (`src/app/api/users/route.ts`, `src/app/api/stats/route.ts`). PRD explicitly requires Route Handlers.

**Alternatives considered**: Pages Router API routes (rejected — PRD mandates App Router)

## Decision: State Management for Filters

**Decision**: URL searchParams via `useSearchParams()` + `useRouter().replace()`

**Rationale**: PRD explicitly requires filter sync to URL. Next.js App Router provides native hooks for this. No external state library needed.

**Alternatives considered**: React state only (rejected — loses filter state on refresh), zustand/jotai (rejected — no new deps allowed)

## Decision: Optimistic Updates

**Decision**: Local state mutation before API call, rollback on failure

**Rationale**: PRD requires optimistic UI for status changes. Simple `useState` pattern sufficient for single-field update.

**Alternatives considered**: SWR/React Query (rejected — no new deps)

## Decision: Mock Data Mutation

**Decision**: Mutate the in-memory `mockFeedback` array directly in API route handlers

**Rationale**: No database; the array is a module-level singleton in the Node.js process. PATCH updates persist for the session lifetime. Matches existing pattern where `mockUsers` is imported directly.

**Alternatives considered**: Separate mutable store class (over-engineering for mock data)

## Decision: Testing Framework

**Decision**: Defer test framework choice to task execution. PRD requires tests in `src/__tests__/` but no framework is installed.

**Rationale**: No test dependencies in `package.json`. Implementation will need to add a test runner (likely vitest or jest) as a devDependency. This is the only new dependency required.

**Alternatives considered**: Skip tests (rejected — PRD section V is explicit requirement)

## Decision: Component Granularity

**Decision**: Extract `FeedbackStatusBadge` and `FeedbackTypeBadge` as reusable components; `FeedbackTable` as the list renderer.

**Rationale**: Badges are used on both list and detail pages. Table is complex enough to warrant extraction (columns, click handler, pagination).

**Alternatives considered**: Inline badges (code duplication across pages)
