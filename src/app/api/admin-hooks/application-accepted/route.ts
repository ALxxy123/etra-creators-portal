import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendApplicationAcceptedEmail, sendContractCopyEmail } from '@/lib/emails/send'
import type { CreatorApplication } from '@/types/database'

export const runtime = 'nodejs'

// Triggered by the admin app when an application's status flips to "accepted".
// Sends both the acceptance email and a signed copy of the contract the
// applicant agreed to, then stamps contract_sent_at so re-deliveries are
// observable and idempotent.

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

  const body = await req.json().catch(() => ({})) as { application_id?: string }
  const applicationId = body.application_id
  if (!applicationId || typeof applicationId !== 'string') {
    return NextResponse.json({ error: 'application_id is required' }, { status: 400 })
  }

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

  await Promise.all([
    sendApplicationAcceptedEmail(app).catch((err) => {
      console.error('sendApplicationAcceptedEmail failed:', err)
    }),
    sendContractCopyEmail(app).catch((err) => {
      console.error('sendContractCopyEmail failed:', err)
    }),
  ])

  await supabase
    .from('creator_applications')
    .update({ contract_sent_at: new Date().toISOString() })
    .eq('id', applicationId)

  return NextResponse.json({ ok: true })
}
