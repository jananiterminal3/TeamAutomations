import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.LINEAR_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'No API key' }, { status: 500 })

  // Test 1: minimal query (no caching options)
  const r1 = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: apiKey },
    body: JSON.stringify({ query: '{ viewer { id name } }' }),
    cache: 'no-store',
  })
  const d1 = await r1.json()

  // Test 2: teams filter
  const r2 = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: apiKey },
    body: JSON.stringify({
      query: `{ teams(filter: { key: { eq: "TOFF" } }) { nodes { id name issues(first: 5, orderBy: updatedAt) { nodes { id identifier title estimate priority } } } } }`,
    }),
    cache: 'no-store',
  })
  const body2 = await r2.text()

  return NextResponse.json({
    test1_status: r1.status,
    test1_data: d1,
    test2_status: r2.status,
    test2_raw: body2.slice(0, 2000),
  })
}
