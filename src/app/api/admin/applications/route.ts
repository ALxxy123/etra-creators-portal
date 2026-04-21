import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  try {
    const supabaseSession = await createClient()

    // Verify authentication with the regular client
    const { data: { user } } = await supabaseSession.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Use admin client for authorization check and data fetching to bypass RLS
    const supabaseAdmin = createAdminClient()
    const { data: adminUser } = await supabaseAdmin.from('admin_users').select('role').eq('user_id', user.id).single()
    if (!adminUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = req.nextUrl
    const status = searchParams.get('status')
    const specialty = searchParams.get('specialty')
    const level = searchParams.get('level')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const ALLOWED_SORT = ['created_at', 'full_name', 'status', 'specialty'] as const
    type AllowedSort = typeof ALLOWED_SORT[number]
    const rawSort = searchParams.get('sort_by') || 'created_at'
    const sortBy: AllowedSort = (ALLOWED_SORT as readonly string[]).includes(rawSort)
      ? (rawSort as AllowedSort)
      : 'created_at'
    const sortOrder = searchParams.get('sort_order') === 'asc' ? 'asc' : 'desc'
    const from = (page - 1) * limit

    let query = supabaseAdmin
      .from('creator_applications')
      .select('*', { count: 'exact' })
      .range(from, from + limit - 1)
      .order(sortBy, { ascending: sortOrder === 'asc' })

    if (status && status !== 'all') query = query.eq('status', status)
    if (specialty && specialty !== 'all') query = query.eq('specialty', specialty)
    if (level && level !== 'all') query = query.eq('level', level)
    if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,tracking_code.ilike.%${search}%`)

    const { data, error, count } = await query
    if (error) return NextResponse.json({ error: 'خطأ في جلب البيانات' }, { status: 500 })

    return NextResponse.json({ data, count, page, limit })
  } catch (err) {
    console.error('GET /api/admin/applications error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
