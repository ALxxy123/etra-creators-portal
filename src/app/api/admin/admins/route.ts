import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import type { AdminRole } from '@/types/database'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ListedAdmin {
  user_id: string
  email: string | null
  role: AdminRole
  created_at: string
}

export async function GET() {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    if (auth.adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'صلاحيات غير كافية' }, { status: 403 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = auth.supabaseAdmin as any
    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('user_id, role, created_at')
      .order('created_at', { ascending: true }) as {
        data: { user_id: string; role: AdminRole; created_at: string }[] | null
        error: { message: string } | null
      }

    if (error || !admins) {
      return NextResponse.json({ error: 'فشل جلب قائمة الأدمنز' }, { status: 500 })
    }

    const enriched: ListedAdmin[] = await Promise.all(
      admins.map(async (a) => {
        const { data } = await supabase.auth.admin.getUserById(a.user_id) as {
          data: { user: { email: string | null } | null } | null
        }
        return {
          user_id: a.user_id,
          email: data?.user?.email ?? null,
          role: a.role,
          created_at: a.created_at,
        }
      }),
    )

    return NextResponse.json({ admins: enriched })
  } catch (err) {
    console.error('GET /api/admin/admins error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    if (auth.adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'صلاحيات غير كافية' }, { status: 403 })
    }

    const body = await req.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const role: AdminRole = body.role === 'admin' ? 'admin' : 'reviewer'

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'بريد إلكتروني غير صالح' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = auth.supabaseAdmin as any

    // Find user by email; if not found, create one with magic-link invite flow
    let userId: string | null = null
    const { data: existing } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 }) as {
      data: { users: { id: string; email?: string | null }[] } | null
    }
    const match = existing?.users.find((u) => u.email?.toLowerCase() === email)
    if (match) {
      userId = match.id
    } else {
      const { data: invited, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email) as {
        data: { user: { id: string } | null } | null
        error: { message: string } | null
      }
      if (inviteErr || !invited?.user) {
        return NextResponse.json({ error: 'فشل إنشاء/دعوة المستخدم' }, { status: 500 })
      }
      userId = invited.user.id
    }

    if (!userId) {
      return NextResponse.json({ error: 'تعذر تحديد المستخدم' }, { status: 500 })
    }

    const { error: upsertErr } = await supabase
      .from('admin_users')
      .upsert({ user_id: userId, role }, { onConflict: 'user_id' })

    if (upsertErr) {
      return NextResponse.json({ error: 'فشل إضافة الأدمن' }, { status: 500 })
    }

    return NextResponse.json({ success: true, user_id: userId, role })
  } catch (err) {
    console.error('POST /api/admin/admins error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    if (auth.adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'صلاحيات غير كافية' }, { status: 403 })
    }

    const url = new URL(req.url)
    const userId = url.searchParams.get('user_id')
    if (!userId) {
      return NextResponse.json({ error: 'معرّف المستخدم مطلوب' }, { status: 400 })
    }

    if (userId === auth.user.id) {
      return NextResponse.json({ error: 'لا يمكنك إزالة نفسك' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = auth.supabaseAdmin as any
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('user_id', userId)

    if (error) {
      return NextResponse.json({ error: 'فشل إزالة الأدمن' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/admin/admins error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
