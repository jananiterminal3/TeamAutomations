'use client'

import { ProjectGroup, LinearIssue } from '@/lib/types'
import {
  getStatusDisplay,
  getGanttWeeks,
  getBarPosition,
  getTodayPosition,
} from '@/lib/utils'

const ISSUE_COL = 320 // px — sticky left column
const WEEK_W = 80    // px per week column
const ROW_H = 38     // px per row
const NUM_WEEKS = 13

interface Props {
  projects: ProjectGroup[]
}

function GanttBar({ issue }: { issue: LinearIssue }) {
  const status = getStatusDisplay(issue)
  const pos = getBarPosition(issue)
  const totalPx = NUM_WEEKS * WEEK_W

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 rounded-[3px] flex items-center overflow-hidden px-1.5"
      style={{
        left: `${(pos.left / 100) * totalPx}px`,
        width: `${Math.max((pos.width / 100) * totalPx, 6)}px`,
        height: 22,
        backgroundColor: status.bgColor,
        border: `1px solid ${status.borderColor}`,
      }}
    >
      <span
        className="font-mono text-[9px] truncate"
        style={{ color: status.color }}
      >
        {issue.identifier}
      </span>
    </div>
  )
}

function WeekGridLines({
  weeks,
}: {
  weeks: ReturnType<typeof getGanttWeeks>
}) {
  return (
    <div className="absolute inset-0 flex pointer-events-none">
      {weeks.map((week) => (
        <div
          key={week.label}
          className="flex-shrink-0 border-r border-[#1a1a1a]"
          style={{
            width: WEEK_W,
            background: week.isCurrent ? 'rgba(249,115,22,0.04)' : undefined,
          }}
        />
      ))}
    </div>
  )
}

export default function GanttView({ projects }: Props) {
  const weeks = getGanttWeeks()
  const timelineWidth = NUM_WEEKS * WEEK_W
  const todayPct = getTodayPosition()

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[#444] font-mono text-sm">
        No issues found in TOFF team.
      </div>
    )
  }

  return (
    <div
      className="border border-[#232323] rounded-lg overflow-auto"
      style={{ maxHeight: 'calc(100vh - 220px)' }}
    >
      <div style={{ minWidth: ISSUE_COL + timelineWidth }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div
          className="flex sticky top-0 z-20 border-b border-[#232323] bg-[#0d0d0d]"
          style={{ height: ROW_H + 14 }}
        >
          {/* Corner cell */}
          <div
            className="sticky left-0 z-30 flex-shrink-0 border-r border-[#232323] bg-[#0d0d0d] flex items-end px-4 pb-2"
            style={{ width: ISSUE_COL }}
          >
            <span className="font-mono text-[10px] text-[#3a3a3a] uppercase tracking-wider">
              Issue
            </span>
          </div>

          {/* Week header cells */}
          <div className="flex flex-shrink-0 relative" style={{ width: timelineWidth }}>
            {/* Today indicator in header */}
            {todayPct >= 0 && (
              <div
                className="absolute bottom-0 top-0 w-px z-10 pointer-events-none"
                style={{
                  left: `${todayPct}%`,
                  background: 'rgba(249,115,22,0.6)',
                }}
              />
            )}
            {weeks.map((week) => (
              <div
                key={week.label}
                className="flex-shrink-0 border-r border-[#1e1e1e] flex flex-col justify-end px-2 pb-2"
                style={{
                  width: WEEK_W,
                  background: week.isCurrent ? 'rgba(249,115,22,0.04)' : undefined,
                }}
              >
                <span
                  className={`font-mono text-[11px] font-medium ${
                    week.isCurrent ? 'text-[#F97316]' : 'text-[#4a4a4a]'
                  }`}
                >
                  {week.label}
                </span>
                <span className="font-mono text-[9px] text-[#2e2e2e] mt-0.5">
                  {week.start.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────── */}
        {projects.map((project) => (
          <div key={project.id}>

            {/* Project section header */}
            <div
              className="flex border-b border-[#1c1c1c] bg-[#111]"
              style={{ height: ROW_H }}
            >
              <div
                className="sticky left-0 z-10 flex-shrink-0 border-r border-[#1c1c1c] bg-[#111] flex items-center gap-2 px-4"
                style={{ width: ISSUE_COL }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-[12px] font-medium text-[#bbb] truncate">
                  {project.name}
                </span>
                <span className="font-mono text-[10px] text-[#3a3a3a] ml-auto flex-shrink-0">
                  {project.donePoints}/{project.totalPoints}pt
                </span>
              </div>

              {/* Week cells for project header */}
              <div
                className="relative flex-shrink-0 flex"
                style={{ width: timelineWidth }}
              >
                {weeks.map((week) => (
                  <div
                    key={week.label}
                    className="flex-shrink-0 border-r border-[#171717]"
                    style={{
                      width: WEEK_W,
                      background: week.isCurrent ? 'rgba(249,115,22,0.03)' : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Issue rows */}
            {project.issues.map((issue: LinearIssue) => (
              <div
                key={issue.id}
                className="flex border-b border-[#181818] hover:bg-[#131313] transition-colors"
                style={{ height: ROW_H }}
              >
                {/* Issue name cell — sticky left */}
                <div
                  className="sticky left-0 z-10 flex-shrink-0 border-r border-[#1c1c1c] bg-[#0d0d0d] hover:bg-[#131313] flex items-center gap-2 px-4"
                  style={{ width: ISSUE_COL }}
                >
                  <span className="font-mono text-[10px] text-[#3a3a3a] flex-shrink-0 w-[72px]">
                    {issue.identifier}
                  </span>
                  <span className="text-[12px] text-[#777] truncate" title={issue.title}>
                    {issue.title}
                  </span>
                </div>

                {/* Timeline cell */}
                <div
                  className="relative flex-shrink-0"
                  style={{ width: timelineWidth }}
                >
                  <WeekGridLines weeks={weeks} />

                  {/* Today line */}
                  {todayPct >= 0 && (
                    <div
                      className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
                      style={{
                        left: `${todayPct}%`,
                        background: 'rgba(249,115,22,0.35)',
                      }}
                    />
                  )}

                  <GanttBar issue={issue} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
