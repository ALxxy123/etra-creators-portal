import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { checkRateLimit, getClientIp, rateLimitHeaders } from '@/lib/security/rate-limit'
import type { CreatorApplication } from '@/types/database'

export async function GET(req: NextRequest) {
  const ip = getClientIp(req)
  const rateLimit = checkRateLimit(`track:${ip}`, {
    limit: 30,
    windowMs: 5 * 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'too_many_requests' },
      { status: 429, headers: rateLimitHeaders(rateLimit) },
    )
  }

  const code = req.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'missing_code' }, { status: 400 })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any
    const { data, error } = await supabase
      .from('creator_applications')
      .select('tracking_code, full_name, specialty, status, created_at')
      .eq('tracking_code', code.trim().toUpperCase())
      .single() as { data: Pick<CreatorApplication, 'tracking_code' | 'full_name' | 'specialty' | 'status' | 'created_at'> | null; error: { message: string } | null }

    if (error || !data) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    return NextResponse.json({
      tracking_code: data.tracking_code,
      full_name: data.full_name,
      specialty: data.specialty,
      status: data.status,
      submission_date: data.created_at,
    })
  } catch (err) {
    console.error('GET /api/track error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
