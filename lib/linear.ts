import { unstable_cache } from 'next/cache'
import { LinearIssue, ProjectGroup } from './types'
import { isBlocked } from './utils'

const LINEAR_API = 'https://api.linear.app/graphql'

// Lean query — labels removed (nested connection was the complexity killer).
// Blocked detection falls back to state name. Date filter keeps to 2026+.
// Paginated: fetch up to 4 pages of 50 = 200 issues max.
const QUERY = `
  query TOFFIssues($after: String) {
    teams(filter: { key: { eq: "TOFF" } }) {
      nodes {
        id
        name
        issues(
          first: 25
          after: $after
          filter: { createdAt: { gte: "2026-01-01" } }
          orderBy: updatedAt
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            identifier
            title
            estimate
            state {
              name
              type
            }
            assignee {
              name
              displayName
            }
            project {
              id
              name
              color
            }
            dueDate
            startedAt
            completedAt
            createdAt
          }
        }
      }
    }
  }
`

interface RawIssue extends Omit<LinearIssue, 'labels' | 'priority'> {
  labels?: { nodes: { id: string; name: string; color: string }[] }
}

async function fetchAllIssues(apiKey: string): Promise<LinearIssue[]> {
  const all: LinearIssue[] = []
  let cursor: string | null = null
  const MAX_PAGES = 4

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await fetch(LINEAR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: cursor ? { after: cursor } : {},
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Linear API error: ${res.status} — ${body.slice(0, 400)}`)
    }

    const json = await res.json()

    if (json.errors) {
      const msgs = json.errors
        .map((e: { message: string }) => e.message)
        .join(', ')
      throw new Error(`Linear GraphQL error: ${msgs}`)
    }

    const teams = json.data?.teams?.nodes ?? []
    if (teams.length === 0) break

    const issuesPage = teams[0].issues
    const nodes: RawIssue[] = issuesPage.nodes ?? []

    // Normalise: add empty labels so downstream code doesn't break
    all.push(
      ...nodes.map((n) => ({
        ...n,
        priority: 0,
        labels: n.labels ?? { nodes: [] },
      }))
    )

    if (!issuesPage.pageInfo?.hasNextPage) break
    cursor = issuesPage.pageInfo.endCursor
  }

  return all
}

export const fetchLinearIssues = unstable_cache(
  async () => {
    const apiKey = process.env.LINEAR_API_KEY
    if (!apiKey) throw new Error('LINEAR_API_KEY environment variable is not set')
    return fetchAllIssues(apiKey)
  },
  ['linear-issues'],
  { tags: ['linear-data'], revalidate: 86400 }
)

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
