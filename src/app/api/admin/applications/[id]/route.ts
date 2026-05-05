import { NextRequest, NextResponse } from 'next/server'
import { sendApplicationAcceptedEmail } from '@/lib/emails/send'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getPlatformSettings } from '@/lib/server/platform-settings'
import type {
  ApplicationNote,
  ApplicationStatusHistory,
  CreatorApplication,
} from '@/types/database'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAdmin = auth.supabaseAdmin as any

    const [appRes, notesRes, historyRes] = await Promise.all([
      supabaseAdmin
        .from('creator_applications')
        .select('*')
        .eq('id', id)
        .single() as Promise<{ data: CreatorApplication | null; error: { message: string } | null }>,
      supabaseAdmin
        .from('application_notes')
        .select('*')
        .eq('application_id', id)
        .order('created_at', { ascending: false }) as Promise<{ data: ApplicationNote[] | null; error: { message: string } | null }>,
      supabaseAdmin
        .from('application_status_history')
        .select('*')
        .eq('application_id', id)
        .order('changed_at', { ascending: false }) as Promise<{ data: ApplicationStatusHistory[] | null; error: { message: string } | null }>,
    ])

    if (appRes.error || !appRes.data) {
      return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 })
    }

    return NextResponse.json({
      application: appRes.data,
      notes: notesRes.data ?? [],
      history: historyRes.data ?? [],
    })
  } catch (err) {
    console.error('GET /api/admin/applications/[id] error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAdmin = auth.supabaseAdmin as any

    const body = await req.json()
    const updates: Record<string, unknown> = {}

    const ALLOWED_STATUSES = ['new', 'under_review', 'accepted', 'rejected'] as const
    if (body.status) {
      if (!(ALLOWED_STATUSES as readonly string[]).includes(body.status)) {
        return NextResponse.json({ error: 'حالة غير صالحة' }, { status: 400 })
      }
      updates.status = body.status
    }

    let createdNote: ApplicationNote | null = null
    if (body.note_text !== undefined) {
      const noteText = String(body.note_text).trim().slice(0, 1000)
      if (noteText.length === 0) {
        return NextResponse.json({ error: 'الملاحظة فارغة' }, { status: 400 })
      }
      const { data: note, error: noteErr } = await supabaseAdmin
        .from('application_notes')
        .insert({
          application_id: id,
          note_text: noteText,
          created_by: auth.user.id,
        })
        .select('*')
        .single() as { data: ApplicationNote | null; error: { message: string } | null }

      if (noteErr) {
        return NextResponse.json({ error: 'فشل حفظ الملاحظة' }, { status: 500 })
      }
      createdNote = note
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
        const settings = await getPlatformSettings(auth.supabaseAdmin)
        if (settings.email_notifications) {
          sendApplicationAcceptedEmail(data).catch(console.error)
        }
      }

      return NextResponse.json({ application: data, note: createdNote })
    }

    return NextResponse.json({ note: createdNote, success: true })
  } catch (err) {
    console.error('PATCH /api/admin/applications/[id] error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    if (auth.adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'صلاحيات غير كافية' }, { status: 403 })
    }

    const url = new URL(req.url)
    const noteId = url.searchParams.get('note_id')
    if (!noteId) {
      return NextResponse.json({ error: 'معرّف الملاحظة مطلوب' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAdmin = auth.supabaseAdmin as any
    const { error } = await supabaseAdmin
      .from('application_notes')
      .delete()
      .eq('id', noteId)
      .eq('application_id', id)

    if (error) {
      return NextResponse.json({ error: 'فشل حذف الملاحظة' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/admin/applications/[id] error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
