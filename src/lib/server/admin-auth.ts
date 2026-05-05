import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { AdminRole } from '@/types/database'

export async function requireAdmin() {
  const supabaseSession = await createClient()
  const { data: { user } } = await supabaseSession.auth.getUser()

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  const supabaseAdmin = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: adminUser } = await (supabaseAdmin as any)
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single() as { data: { role: AdminRole } | null }

  if (!adminUser) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  return {
    ok: true as const,
    user,
    adminUser,
    supabaseAdmin,
  }
}
