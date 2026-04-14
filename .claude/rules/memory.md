# Memory Rules

Rules for maintaining the project memory layer consistently across all Claude Code sessions.

---

## Session Start
- Always read `CLAUDE.md` at the start of every session to load project context.
- If working on a specific project (e.g. MetaMask×Transak, DNP NCR), also read `memory/context.md`.

## Logging Decisions
- Any architectural, technical, or process decision must be logged to `memory/decisions.md`.
- Use the ADR format: Decision → Context → Rationale → Consequences.
- Prefix with the date: `## YYYY-MM-DD — <Title>`.
- If a decision supersedes an older one, mark the old entry `SUPERSEDED` and link to the new entry.

## Logging Problems
- Any bug, blocker, or unresolved issue must be logged to `memory/problems.md`.
- Include: symptom, root cause, fix (or current status), and prevention note.
- When resolved, update the entry's `**Status:**` to `RESOLVED` and add the resolution date and fix.
- Never delete entries — the history of problems and solutions is valuable.

## Updating History
- After any major change (new feature, significant decision, project milestone, blocker resolved), add an entry to `memory/history.md`.
- Keep entries concise: date, title, 2–5 bullet points.
- Entries are reverse-chronological (newest first).

## Never Delete
- Never delete any entry from any memory file.
- To invalidate an entry, mark it as `RESOLVED`, `SUPERSEDED`, or `OUTDATED` with a note explaining why.
- This preserves the decision trail and prevents confusion about why something was done.

## Adding New Memory Files
- If a new memory file is created, add a pointer to it in `CLAUDE.md` under the Memory Files table.
- Keep `CLAUDE.md` under 200 lines.
