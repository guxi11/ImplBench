# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Architecture

Next.js 15 + React 19 + TypeScript + Tailwind CSS. App Router layout with a fixed sidebar (`ml-60`) and main content area.

- `src/types/index.ts` — Shared types (`User`, `Stats`)
- `src/lib/mock-data.ts` — All data (no DB); API routes and pages both import from here
- `src/components/` — Presentational components (`StatCard`, `UserTable`, `Sidebar`)
- `src/app/api/` — REST endpoints returning mock data (`/api/users`, `/api/stats`)
- `src/app/` — Pages: Dashboard (`/`) shows stat cards, Users (`/users`) shows table

Path alias: `@/*` → `./src/*`

## Data Flow

Pages currently import mock data directly (server components). API routes exist but are unused by the UI — they serve as a JSON interface for external consumers.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan at
specs/001-user-feedback-analytics/plan.md
<!-- SPECKIT END -->
