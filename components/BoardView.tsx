'use client'

import { ProjectGroup, LinearIssue } from '@/lib/types'
import { getStatusDisplay, getInitials } from '@/lib/utils'
import StatusBadge from './StatusBadge'

interface Props {
  projects: ProjectGroup[]
}

function IssueCard({ issue }: { issue: LinearIssue }) {
  const status = getStatusDisplay(issue)
  const assigneeName =
    issue.assignee?.displayName || issue.assignee?.name || null

  return (
    <div
      className="rounded-md p-3 mb-2 border border-[#232323] bg-[#161616] hover:bg-[#1c1c1c] transition-colors"
      style={{ borderLeftWidth: 2, borderLeftColor: status.color }}
    >
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span className="font-mono text-[10px] text-[#444] flex-shrink-0">
          {issue.identifier}
        </span>
        <StatusBadge status={status} small />
      </div>

      <p className="text-[13px] text-[#ccc] leading-snug mb-2.5 line-clamp-2">
        {issue.title}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {assigneeName ? (
            <>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-mono font-medium"
                style={{ background: '#222', color: '#777' }}
              >
                {getInitials(assigneeName)}
              </div>
              <span className="text-[11px] text-[#555] truncate">
                {assigneeName.split(' ')[0]}
              </span>
            </>
          ) : (
            <span className="text-[11px] text-[#333]">Unassigned</span>
          )}
        </div>

        {issue.estimate != null && (
          <span className="font-mono text-[10px] text-[#444] flex-shrink-0">
            {issue.estimate}pt
          </span>
        )}
      </div>
    </div>
  )
}

function ProjectColumn({ project }: { project: ProjectGroup }) {
  const pct =
    project.totalPoints > 0
      ? Math.round((project.donePoints / project.totalPoints) * 100)
      : 0

  return (
    <div className="flex-shrink-0 w-[272px]">
      {/* Column header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <span className="text-[13px] font-medium text-[#ddd] truncate flex-1 leading-tight">
            {project.name}
          </span>
          <span className="font-mono text-[11px] text-[#444] flex-shrink-0">
            {project.issues.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-[#1e1e1e] rounded-full overflow-hidden mb-1">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: project.color }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#3a3a3a]">
            {project.donePoints}/{project.totalPoints}pt · {pct}%
          </span>
          {project.blockedCount > 0 && (
            <span className="font-mono text-[10px] text-[#EF4444]/80">
              {project.blockedCount} blocked
            </span>
          )}
        </div>
      </div>

      {/* Cards */}
      <div>
        {project.issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}

export default function BoardView({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[#444] font-mono text-sm">
        No issues found in TOFF team.
      </div>
    )
  }

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-6"
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      {projects.map((project) => (
        <ProjectColumn key={project.id} project={project} />
      ))}
    </div>
  )
}
