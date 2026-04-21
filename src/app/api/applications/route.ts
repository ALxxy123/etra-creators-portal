import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { applicationSchema } from '@/lib/validations/application'
import { sendApplicationReceivedEmail, sendNewApplicationAdminAlert } from '@/lib/emails/send'
import type { CreatorApplication } from '@/types/database'

export async function POST(req: NextRequest) {
  try {
    // Check if registrations are open
    const adminClient = createAdminClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: regSetting } = await (adminClient as any)
      .from('platform_settings')
      .select('value')
      .eq('key', 'allow_registrations')
      .single()

    if (regSetting && regSetting.value === false) {
      return NextResponse.json({ error: 'التسجيلات مغلقة حالياً' }, { status: 403 })
    }

    const body = await req.json()
    const parsed = applicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'بيانات غير صالحة', details: parsed.error.flatten() }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = adminClient as any
    const { data, error } = await supabase
      .from('creator_applications')
      .insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        city: parsed.data.city,
        specialty: parsed.data.specialty,
        level: parsed.data.level,
        years_of_experience: parsed.data.years_of_experience,
        linkedin_or_github_url: parsed.data.linkedin_or_github_url,
        portfolio_url: parsed.data.portfolio_url || null,
        cv_file_path: body.cv_file_path || null,
        bio: parsed.data.bio || null,
        criteria_acknowledged: parsed.data.criteria_acknowledged,
        terms_acknowledged: parsed.data.terms_acknowledged,
        terms_acknowledged_at: new Date().toISOString(),
        status: 'new',
      })
      .select('*')
      .single() as { data: CreatorApplication | null; error: { message: string } | null }

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'فشل حفظ الطلب' }, { status: 500 })
    }

    const application = data as CreatorApplication

    // Fire emails — don't await (non-blocking)
    const { count } = await supabase
      .from('creator_applications')
      .select('*', { count: 'exact', head: true })

    Promise.all([
      sendApplicationReceivedEmail(application).catch(console.error),
      sendNewApplicationAdminAlert(application, count ?? 1).catch(console.error),
    ])

    return NextResponse.json({ id: application.id, tracking_code: application.tracking_code }, { status: 201 })
  } catch (err) {
    console.error('POST /api/applications error:', err)
    return NextResponse.json({ error: 'خطأ داخلي في الخادم' }, { status: 500 })
  }
}
