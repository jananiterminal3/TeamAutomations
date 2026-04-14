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
- **Runtime**: Node.js / Python (TBD per automation)
- **Infra**: TBD
- **CI/CD**: TBD
- **Version control**: Git (GitHub)

> Update this section as the stack firms up.

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
