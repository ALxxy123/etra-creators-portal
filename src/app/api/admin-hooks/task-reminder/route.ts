import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTaskReminderEmail } from '@/lib/emails/send'
import type { CreatorApplication } from '@/types/database'

export const runtime = 'nodejs'

const payloadSchema = z.object({
  application_id: z.string().uuid(),
  task_id: z.string().uuid(),
  deadline_hours: z.union([z.literal(24), z.literal(48), z.literal(72)]),
  deadline_at: z.string().datetime({ offset: true }),
})

// Triggered by the admin app when an applicant needs a delivery reminder.
// The portal owns email delivery so reminders use the same sender, branding,
// logo attachment, and email notification log as all applicant emails.
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

  const parsed = payloadSchema.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { application_id: applicationId, task_id: taskId, deadline_hours, deadline_at } = parsed.data

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any

  const [{ data: application, error: appError }, { data: task, error: taskError }] = await Promise.all([
    supabase
      .from('creator_applications')
      .select('id, full_name, email, tracking_code, specialty, level')
      .eq('id', applicationId)
      .single(),
    supabase
      .from('assessment_tasks')
      .select('title_ar')
      .eq('id', taskId)
      .single(),
  ])

  if (appError || !application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }

  if (taskError || !task) {
    return NextResponse.json({ error: 'Task template not found' }, { status: 404 })
  }

  try {
    await sendTaskReminderEmail(
      application as Pick<CreatorApplication, 'id' | 'full_name' | 'email' | 'tracking_code' | 'specialty' | 'level'>,
      task,
      {
        deadline_hours,
        deadline_at,
      }
    )
  } catch (err) {
    console.error('sendTaskReminderEmail failed:', err)
    return NextResponse.json({ error: 'Email send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
