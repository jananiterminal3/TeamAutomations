# Project History

Chronological timeline of significant changes, milestones, and events. Never delete entries.

---

## 2026-04-14 — Next.js dashboard scaffolded (Linear live tracker)
- Full Next.js 15 app created at repo root (App Router, TypeScript, Tailwind CSS)
- Board view: Monday.com-style columns grouped by Linear project, status badges, progress bars
- Gantt view: W15–W27 (Apr 6 – Jul 5) weekly timeline with sticky columns and today-line
- Live data from Linear GraphQL API, TOFF team, cached with `linear-data` tag (86400s TTL)
- `/api/cron` endpoint — daily revalidation at 6pm SGT via Vercel cron (`0 10 * * *` UTC)
- Dark theme: `#0d0d0d` base, JetBrains Mono + DM Sans fonts
- Status colours: In Progress → orange, Done → green, Blocked → red, Todo → grey
- `CLAUDE.md` stack section updated with confirmed tech choices

## 2026-04-14 — Memory layer populated with Q2 planning context
- Imported `T3-Q2-PLANNING-CONTEXT.md` from Q2 planning session (April 14, 2026)
- `memory/context.md` updated with full details for all 8 Q2 projects: tickets, points, owners, phases, and deadlines
- `memory/decisions.md` populated with 3 founding decisions: Next.js+Vercel for dashboard, Linear as SSOT, git-backed memory layer
- `memory/problems.md` populated with 4 current blockers: Transak eng contact, Meeco docs, Veriff X509 cert, portrait format (TOFF-8116)
- `.claude/rules/memory.md` created with session and logging rules

## 2026-04-14 — Project initialized
- Repository created with initial README
- Memory layer scaffolded: `CLAUDE.md`, `/memory/`, `.claude/rules/`
- Team: Jan (Janani), Malcolm Ong, Jack Cheng (and full T3 engineering team)
