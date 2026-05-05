import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, PlatformSettingKey } from '@/types/database'

export type PlatformSettings = Record<PlatformSettingKey, boolean>

const defaults: PlatformSettings = {
  allow_registrations: true,
  email_notifications: true,
}

export async function getPlatformSettings(
  supabase: SupabaseClient<Database>,
  keys: PlatformSettingKey[] = ['allow_registrations', 'email_notifications'],
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('platform_settings')
    .select('key, value')
    .in('key', keys) as {
      data: { key: PlatformSettingKey; value: boolean }[] | null
      error: { message: string } | null
    }

  if (error) {
    console.error('Failed to load platform settings:', error)
    return defaults
  }

  return (data ?? []).reduce<PlatformSettings>(
    (acc, row) => ({ ...acc, [row.key]: row.value }),
    { ...defaults },
  )
}
