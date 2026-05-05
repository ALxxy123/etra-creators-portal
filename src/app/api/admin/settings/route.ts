import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getPlatformSettings } from '@/lib/server/platform-settings'
import type { PlatformSettingKey } from '@/types/database'

const SETTING_KEYS = ['allow_registrations', 'email_notifications'] as const satisfies readonly PlatformSettingKey[]

function isSettingKey(value: unknown): value is PlatformSettingKey {
  return typeof value === 'string' && SETTING_KEYS.includes(value as PlatformSettingKey)
}

export async function GET() {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    const settings = await getPlatformSettings(auth.supabaseAdmin)
    return NextResponse.json(settings)
  } catch (err) {
    console.error('GET /api/admin/settings error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    if (auth.adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    if (!isSettingKey(body.key) || typeof body.value !== 'boolean') {
      return NextResponse.json({ error: 'إعداد غير صالح' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (auth.supabaseAdmin as any)
      .from('platform_settings')
      .upsert(
        { key: body.key, value: body.value, updated_at: new Date().toISOString() },
        { onConflict: 'key' },
      )
      .select('key, value, updated_at')
      .single() as {
        data: { key: PlatformSettingKey; value: boolean; updated_at: string } | null
        error: { message: string } | null
      }

    if (error) {
      console.error('PATCH /api/admin/settings Supabase error:', error)
      return NextResponse.json({ error: 'فشل حفظ الإعداد' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('PATCH /api/admin/settings error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
