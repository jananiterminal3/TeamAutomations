import { LinearIssue, StatusDisplay, GanttWeek } from './types'

// ─── Status helpers ───────────────────────────────────────────────────────────

export function isBlocked(issue: LinearIssue): boolean {
  const labelBlocked =
    issue.labels?.nodes?.some((l) => l.name.toLowerCase().includes('blocked')) ?? false
  const stateBlocked = issue.state.name.toLowerCase().includes('blocked')
  return labelBlocked || stateBlocked
}

export function getStatusDisplay(issue: LinearIssue): StatusDisplay {
  if (isBlocked(issue)) {
    return {
      label: 'Blocked',
      color: '#EF4444',
      bgColor: 'rgba(239,68,68,0.12)',
      borderColor: 'rgba(239,68,68,0.35)',
    }
  }

  switch (issue.state.type) {
    case 'started':
      return {
        label: 'In Progress',
        color: '#F97316',
        bgColor: 'rgba(249,115,22,0.12)',
        borderColor: 'rgba(249,115,22,0.35)',
      }
    case 'completed':
      return {
        label: 'Done',
        color: '#22C55E',
        bgColor: 'rgba(34,197,94,0.12)',
        borderColor: 'rgba(34,197,94,0.35)',
      }
    case 'cancelled':
      return {
        label: 'Cancelled',
        color: '#6B7280',
        bgColor: 'rgba(107,114,128,0.1)',
        borderColor: 'rgba(107,114,128,0.25)',
      }
    default: // triage, backlog, unstarted
      return {
        label: 'Todo',
        color: '#9CA3AF',
        bgColor: 'rgba(156,163,175,0.08)',
        borderColor: 'rgba(156,163,175,0.2)',
      }
  }
}

// ─── Gantt helpers ────────────────────────────────────────────────────────────

// W15 Mon Apr 6 → W27 Sun Jul 5, 2026
const GANTT_START = new Date('2026-04-06T00:00:00Z')
const GANTT_END = new Date('2026-07-05T23:59:59Z')
const GANTT_MS = GANTT_END.getTime() - GANTT_START.getTime()

export function getGanttWeeks(): GanttWeek[] {
  const today = new Date()
  const weeks: GanttWeek[] = []

  for (let i = 0; i < 13; i++) {
    const start = new Date(GANTT_START)
    start.setUTCDate(GANTT_START.getUTCDate() + i * 7)
    const end = new Date(start)
    end.setUTCDate(start.getUTCDate() + 6)
    end.setUTCHours(23, 59, 59, 999)

    weeks.push({
      label: `W${15 + i}`,
      start,
      end,
      isCurrent: today >= start && today <= end,
    })
  }

  return weeks
}

export function getBarPosition(issue: LinearIssue): { left: number; width: number } {
  const startDate = issue.startedAt
    ? new Date(issue.startedAt)
    : new Date(issue.createdAt)

  let endDate: Date
  if (issue.completedAt) {
    endDate = new Date(issue.completedAt)
  } else if (issue.dueDate) {
    endDate = new Date(issue.dueDate)
  } else {
    endDate = new Date(startDate.getTime() + 14 * 86_400_000) // +2 weeks default
  }

  // Ensure minimum 1-week bar
  if (endDate.getTime() - startDate.getTime() < 7 * 86_400_000) {
    endDate = new Date(startDate.getTime() + 7 * 86_400_000)
  }

  // Clamp to gantt range
  const clampedStart = Math.max(startDate.getTime(), GANTT_START.getTime())
  const clampedEnd = Math.min(endDate.getTime(), GANTT_END.getTime())

  const left = ((clampedStart - GANTT_START.getTime()) / GANTT_MS) * 100
  const width = Math.max(
    ((clampedEnd - clampedStart) / GANTT_MS) * 100,
    (7 * 86_400_000 / GANTT_MS) * 100 // min 1-week width
  )

  return {
    left: Math.max(0, Math.min(left, 95)),
    width: Math.min(width, 100 - Math.max(0, left)),
  }
}

export function getTodayPosition(): number {
  const now = new Date().getTime()
  if (now < GANTT_START.getTime() || now > GANTT_END.getTime()) return -1
  return ((now - GANTT_START.getTime()) / GANTT_MS) * 100
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
