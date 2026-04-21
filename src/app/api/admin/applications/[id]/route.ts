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

    if (body.status) updates.status = body.status
    if (body.note_text !== undefined) {
      await supabaseAdmin.from('application_notes').insert({
        application_id: id,
        note_text: body.note_text,
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

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

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
