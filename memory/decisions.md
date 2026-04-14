# Architectural Decisions

Record significant decisions here with context and rationale. Never delete — mark old entries as SUPERSEDED.

---

## 2026-04-14 — Next.js + Vercel for the Live Dashboard
**Decision:** Build the team dashboard as a Next.js app deployed on Vercel inside this repo.
**Context:** Team needed a live view of Q2 project status pulling from Linear. Options were a static report, Notion embed, or a proper web app.
**Rationale:** Next.js gives server-side rendering and API routes in one framework. Vercel cron handles the daily 6pm SGT auto-refresh natively. Fast to deploy, zero infra overhead.
**Consequences:** Dashboard lives in TeamAutomations repo. Vercel project must be connected. `LINEAR_API_KEY` stored as Vercel env var.

---

## 2026-04-14 — Linear as Single Source of Truth
**Decision:** Linear (TOFF team) is the authoritative source for all ticket data — status, owners, points, and phases.
**Context:** Team already tracks all Q2 work in Linear. Duplicate tracking in spreadsheets or Notion was causing drift.
**Rationale:** Linear has a GraphQL API that can be queried programmatically. Centralising in Linear eliminates manual sync and ensures the dashboard always reflects reality.
**Consequences:** All ticket updates happen in Linear only. Dashboard is read-only. No ticket data is stored in this repo.

---

## 2026-04-14 — Git-backed Memory Layer (inspired by Beads)
**Decision:** Use a `/memory` folder of Markdown files in the repo as the persistent context layer for Claude Code sessions.
**Context:** Without persistent memory, Claude loses project context between sessions. Considered external tools (Notion, Confluence) but they add friction.
**Rationale:** Git-backed Markdown is always available in the Claude Code context window, version-controlled, diffable, and editable by any team member. Inspired by the Beads memory pattern.
**Consequences:** Team must maintain memory files alongside code. `CLAUDE.md` is the index. Rules live in `.claude/rules/`.

---

## Template
```
## YYYY-MM-DD — <Decision Title>
**Decision:** What was decided.
**Context:** Why this decision was needed.
**Rationale:** Why this option was chosen over alternatives.
**Consequences:** What this means going forward.
```
