export type StateType =
  | 'triage'
  | 'backlog'
  | 'unstarted'
  | 'started'
  | 'completed'
  | 'cancelled'

export interface LinearState {
  id: string
  name: string
  type: StateType
  color: string
}

export interface LinearAssignee {
  id: string
  name: string
  displayName: string
}

export interface LinearProject {
  id: string
  name: string
  color: string
  state: string
  targetDate: string | null
}

export interface LinearLabel {
  id: string
  name: string
  color: string
}

export interface LinearIssue {
  id: string
  identifier: string
  title: string
  estimate: number | null
  priority: number
  state: LinearState
  assignee: LinearAssignee | null
  project: LinearProject | null
  labels: { nodes: LinearLabel[] }
  dueDate: string | null
  startedAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectGroup {
  id: string
  name: string
  color: string
  issues: LinearIssue[]
  totalPoints: number
  donePoints: number
  inProgressPoints: number
  blockedCount: number
}

export interface StatusDisplay {
  label: string
  color: string
  bgColor: string
  borderColor: string
}

export interface GanttWeek {
  label: string
  start: Date
  end: Date
  isCurrent: boolean
}
