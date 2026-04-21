import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendApplicationAcceptedEmail } from '@/lib/emails/send'
import type { CreatorApplication } from '@/types/database'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabaseSession = await createClient()

    const { data: { user } } = await supabaseSession.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAdmin = createAdminClient() as any
    const { data: adminUser } = await supabaseAdmin.from('admin_users').select('role').eq('user_id', user.id).single()
    if (!adminUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const updates: Record<string, unknown> = {}

    const ALLOWED_STATUSES = ['new', 'reviewing', 'accepted', 'rejected'] as const
    if (body.status) {
      if (!(ALLOWED_STATUSES as readonly string[]).includes(body.status)) {
        return NextResponse.json({ error: 'حالة غير صالحة' }, { status: 400 })
      }
      updates.status = body.status
    }

    if (body.note_text !== undefined) {
      const noteText = String(body.note_text).trim().slice(0, 1000)
      if (noteText.length === 0) {
        return NextResponse.json({ error: 'الملاحظة فارغة' }, { status: 400 })
      }
      await supabaseAdmin.from('application_notes').insert({
        application_id: id,
        note_text: noteText,
        created_by: user.id,
      })
    }

    if (Object.keys(updates).length > 0) {
      const { data, error } = await supabaseAdmin
        .from('creator_applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single() as { data: CreatorApplication | null; error: { message: string } | null }

      if (error) return NextResponse.json({ error: 'خطأ في تحديث البيانات' }, { status: 500 })

      if (body.status === 'accepted' && data) {
        sendApplicationAcceptedEmail(data).catch(console.error)
      }

      return NextResponse.json(data)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PATCH /api/admin/applications/[id] error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
