import { fetchLinearIssues, groupByProject } from '@/lib/linear'
import Dashboard from '@/components/Dashboard'

export default async function Page() {
  let issues
  let fetchError: string | null = null

  try {
    issues = await fetchLinearIssues()
  } catch (e) {
    fetchError = e instanceof Error ? e.message : String(e)
    issues = []
  }

  const projects = groupByProject(issues)
  const lastUpdated = new Date().toISOString()

  if (fetchError && issues.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-8">
        <div
          className="rounded-lg p-6 max-w-md w-full"
          style={{
            border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.07)',
          }}
        >
          <p className="font-mono text-sm text-[#EF4444] mb-2">Failed to load Linear data</p>
          <p className="font-mono text-xs text-[#888] break-words">{fetchError}</p>
        </div>
      </div>
    )
  }

  return (
    <Dashboard
      projects={projects}
      issues={issues}
      lastUpdated={lastUpdated}
    />
  )
}
