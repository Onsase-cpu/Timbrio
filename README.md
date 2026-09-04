# Timbrio

Timbrio is an intelligent university timetable generator MVP. It places courses into a weekly schedule while considering lecturer availability, room capacity, student-group collisions, course duration, and resource conflicts.

## Stack

Timbrio uses React 19 and TypeScript for the browser interface, CSS for the visual system, Express and tRPC for typed server contracts, Drizzle ORM with MySQL/TiDB tables for persistence, and Vitest for domain verification. This is intentionally a JavaScript/TypeScript-first web architecture: C++, Java, and C# would be better reserved for future native clients or dedicated optimization services rather than mixed into the browser MVP.

## Core architecture

`shared/timetable.ts` contains the domain vocabulary and deterministic constraint solver. `client/src/pages/Home.tsx` presents the academic-office dashboard, weekly timetable, resource inventory, conflict queue, and regeneration controls. `server/routers.ts` exposes the typed `timetable.generate` contract. `drizzle/schema.ts` includes `timetable_inputs` and `timetable_runs` tables for saved inputs and solver output alongside the scaffold’s auth tables. The migration is stored in `drizzle/0002_rainy_spyke.sql`.

The solver uses hard constraints first. It rejects rooms that cannot hold the combined student group, skips lecturer-blocked slots, and prevents room, lecturer, and shared student-group overlaps. If a course cannot be placed, the output keeps an explicit conflict reason so the administrator can revise inputs and regenerate.

## Run locally

```bash
pnpm install
pnpm dev
```

Validate before committing:

```bash
pnpm check
pnpm test
pnpm build
```

The project uses managed runtime environment configuration. Do not commit populated `.env` files or credentials. Timbrio does not add AI integrations or expose API keys.

## MVP views

The Overview presents solver health, coverage metrics, Tuesday flow, and the review queue. Timetable presents the generated Monday–Friday grid with time slots and room labels. Resources presents rooms and lecturer availability windows. Regenerate reruns the deterministic solver, while Export provides a safe export-ready interaction state.

## Production extension path

A production scheduling service could add weighted soft constraints, optimizer strategies such as CP-SAT or ILP behind a separate service, recurring course instances, drag-and-drop adjustments with revalidation, CSV import/export, SSO, audit history, and approval workflows. The current MVP keeps the solver deterministic and transparent for demonstration and coursework.
