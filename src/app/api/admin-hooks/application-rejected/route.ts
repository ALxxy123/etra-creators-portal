import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendApplicationRejectedEmail } from '@/lib/emails/send'
import type { CreatorApplication } from '@/types/database'

export const runtime = 'nodejs'

// Triggered by the admin app when an application's status flips to "rejected".
// Sends a respectful rejection email to the applicant, optionally including the
// reason recorded by the reviewer.

export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_WEBHOOK_SECRET
  if (!expected) {
    console.error('ADMIN_WEBHOOK_SECRET is not configured on the portal')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const provided = req.headers.get('x-admin-webhook-secret')
  if (provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({})) as {
    application_id?: string
    reason?: string | null
  }
  const applicationId = body.application_id
  if (!applicationId || typeof applicationId !== 'string') {
    return NextResponse.json({ error: 'application_id is required' }, { status: 400 })
  }
  const reason = typeof body.reason === 'string' ? body.reason : null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any
  const { data, error } = await supabase
    .from('creator_applications')
    .select('*')
    .eq('id', applicationId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }

  const app = data as CreatorApplication

  try {
    await sendApplicationRejectedEmail(app, reason)
  } catch (err) {
    console.error('sendApplicationRejectedEmail failed:', err)
    return NextResponse.json({ error: 'Email send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
