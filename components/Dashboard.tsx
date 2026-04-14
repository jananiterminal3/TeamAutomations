'use client'

import { useState } from 'react'
import { ProjectGroup, LinearIssue } from '@/lib/types'
import BoardView from './BoardView'
import GanttView from './GanttView'

interface Props {
  projects: ProjectGroup[]
  issues: LinearIssue[]
  lastUpdated: string
}

type View = 'board' | 'gantt'

function StatPill({
  label,
  value,
  color,
}: {
  label: string
  value: string | number
  color?: string
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-mono text-sm font-medium leading-none"
        style={{ color: color ?? '#d0d0d0' }}
      >
        {value}
      </span>
      <span className="font-mono text-[9px] text-[#3a3a3a] uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  )
}

export default function Dashboard({ projects, issues, lastUpdated }: Props) {
  const [view, setView] = useState<View>('board')

  const totalPoints = projects.reduce((s, p) => s + p.totalPoints, 0)
  const donePoints = projects.reduce((s, p) => s + p.donePoints, 0)
  const blockedCount = projects.reduce((s, p) => s + p.blockedCount, 0)
  const inProgressCount = issues.filter((i) => i.state.type === 'started').length

  const updatedAt = new Date(lastUpdated)
  const updatedLabel = updatedAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="min-h-screen bg-[#0d0d0d]">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#1e1e1e] bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto px-5 h-14 flex items-center gap-6">

          {/* Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-mono text-[13px] font-medium text-[#e0e0e0]">
              T3
            </span>
            <span className="text-[#2a2a2a]">/</span>
            <span className="font-mono text-[13px] text-[#666]">TOFF</span>
            <span
              className="font-mono text-[10px] px-1.5 py-0.5 rounded text-[#555]"
              style={{ border: '1px solid #2a2a2a' }}
            >
              Q2 2026
            </span>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-5 ml-2 pl-5 border-l border-[#1e1e1e]">
            <StatPill label="Issues" value={issues.length} />
            <StatPill label="Points" value={`${donePoints}/${totalPoints}`} />
            <StatPill
              label="In Progress"
              value={inProgressCount}
              color="#F97316"
            />
            {blockedCount > 0 && (
              <StatPill label="Blocked" value={blockedCount} color="#EF4444" />
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Last updated */}
          <span className="hidden lg:block font-mono text-[10px] text-[#2e2e2e]">
            {updatedLabel}
          </span>

          {/* View toggle */}
          <div
            className="flex items-center gap-0.5 p-0.5 rounded-md"
            style={{ border: '1px solid #222' }}
          >
            {(['board', 'gantt'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-[5px] font-mono text-[11px] transition-colors capitalize ${
                  view === v
                    ? 'bg-[#1e1e1e] text-[#e0e0e0]'
                    : 'text-[#444] hover:text-[#777]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project strip ─────────────────────────────────────── */}
        <div className="max-w-screen-2xl mx-auto px-5 pb-2.5 flex items-center gap-4 overflow-x-auto">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 flex-shrink-0"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span className="font-mono text-[10px] text-[#444]">{p.name}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-5 py-5">
        {view === 'board' ? (
          <BoardView projects={projects} />
        ) : (
          <GanttView projects={projects} />
        )}
      </main>
    </div>
  )
}
