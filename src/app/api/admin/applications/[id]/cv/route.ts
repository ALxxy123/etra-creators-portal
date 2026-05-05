import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import type { CreatorApplication } from '@/types/database'

const CV_PATH_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.pdf$/i

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = auth.supabaseAdmin as any
    const { data: app, error } = await supabase
      .from('creator_applications')
      .select('cv_file_path, full_name')
      .eq('id', id)
      .single() as { data: Pick<CreatorApplication, 'cv_file_path' | 'full_name'> | null; error: { message: string } | null }

    if (error || !app) {
      return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 })
    }

    if (!app.cv_file_path) {
      return NextResponse.json({ error: 'لا توجد سيرة ذاتية مرفقة' }, { status: 404 })
    }

    if (!CV_PATH_REGEX.test(app.cv_file_path)) {
      return NextResponse.json({ error: 'مسار الملف غير صالح' }, { status: 400 })
    }

    const { data: signed, error: signErr } = await supabase.storage
      .from('creator-cvs')
      .createSignedUrl(app.cv_file_path, 60)

    if (signErr || !signed?.signedUrl) {
      return NextResponse.json({ error: 'تعذر إنشاء رابط التحميل' }, { status: 500 })
    }

    return NextResponse.json({ url: signed.signedUrl, expires_in: 60 })
  } catch (err) {
    console.error('GET /api/admin/applications/[id]/cv error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
