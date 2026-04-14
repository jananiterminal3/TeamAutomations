import { LinearIssue, ProjectGroup } from './types'
import { isBlocked } from './utils'

const LINEAR_API = 'https://api.linear.app/graphql'

const QUERY = `
  query TOFFIssues {
    teams(filter: { key: { eq: "TOFF" } }) {
      nodes {
        id
        name
        issues(first: 250, orderBy: updatedAt) {
          nodes {
            id
            identifier
            title
            estimate
            priority
            state {
              id
              name
              type
              color
            }
            assignee {
              id
              name
              displayName
            }
            project {
              id
              name
              color
              state
              targetDate
            }
            labels {
              nodes {
                id
                name
                color
              }
            }
            dueDate
            startedAt
            completedAt
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`

export async function fetchLinearIssues(): Promise<LinearIssue[]> {
  const apiKey = process.env.LINEAR_API_KEY
  if (!apiKey) throw new Error('LINEAR_API_KEY environment variable is not set')

  const res = await fetch(LINEAR_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify({ query: QUERY }),
    next: { tags: ['linear-data'], revalidate: 86400 },
  })

  if (!res.ok) {
    throw new Error(`Linear API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    const msgs = json.errors.map((e: { message: string }) => e.message).join(', ')
    throw new Error(`Linear GraphQL error: ${msgs}`)
  }

  const teams: { issues: { nodes: LinearIssue[] } }[] =
    json.data?.teams?.nodes ?? []

  if (teams.length === 0) return []
  return teams[0].issues.nodes
}

export function groupByProject(issues: LinearIssue[]): ProjectGroup[] {
  const map = new Map<string, ProjectGroup>()

  for (const issue of issues) {
    const id = issue.project?.id ?? '__no_project__'
    const name = issue.project?.name ?? 'No Project'
    const color = issue.project?.color ?? '#6B7280'

    if (!map.has(id)) {
      map.set(id, {
        id,
        name,
        color,
        issues: [],
        totalPoints: 0,
        donePoints: 0,
        inProgressPoints: 0,
        blockedCount: 0,
      })
    }

    const group = map.get(id)!
    group.issues.push(issue)
    const pts = issue.estimate ?? 0
    group.totalPoints += pts
    if (issue.state.type === 'completed') group.donePoints += pts
    if (issue.state.type === 'started') group.inProgressPoints += pts
    if (isBlocked(issue)) group.blockedCount += 1
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.id === '__no_project__') return 1
    if (b.id === '__no_project__') return -1
    return a.name.localeCompare(b.name)
  })
}
