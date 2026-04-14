import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET

  // Verify Vercel cron secret when configured
  if (cronSecret) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  revalidateTag('linear-data')

  return NextResponse.json({
    success: true,
    revalidated: true,
    timestamp: new Date().toISOString(),
  })
}
