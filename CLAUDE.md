# TeamAutomations — Claude Memory Index

## Project
**TeamAutomations** — internal automation tooling for team workflows.

## Team
| Name | Role |
|------|------|
| Malcolm Ong | Team member |
| Jack Cheng | Team member |
| Janani | Team member |

## Stack & Tools
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS — dark theme (`#0d0d0d` base)
- **Fonts**: JetBrains Mono (labels/code), DM Sans (body)
- **Data**: Linear GraphQL API (`https://api.linear.app/graphql`), team key `TOFF`
- **Hosting**: Vercel (auto-deploy from GitHub)
- **Cron**: `/api/cron` at `0 10 * * *` UTC (6pm SGT), revalidates `linear-data` tag
- **Version control**: Git (GitHub)

## Memory Files
All persistent context lives in `/memory/`. Add dated entries to keep history current.

| File | Purpose |
|------|---------|
| [`/memory/decisions.md`](./memory/decisions.md) | Architectural decisions and rationale (ADR-style) |
| [`/memory/problems.md`](./memory/problems.md) | Bugs encountered, root causes, and fixes |
| [`/memory/context.md`](./memory/context.md) | Team context, project background, and goals |
| [`/memory/history.md`](./memory/history.md) | Timeline of significant changes |

## Rules
Modular rule files live in `.claude/rules/`. Load them as needed for specific contexts.

## Conventions
- Date format: `YYYY-MM-DD`
- Add entries to memory files with the date prefix: `## YYYY-MM-DD — <title>`
- Keep this file under 200 lines
