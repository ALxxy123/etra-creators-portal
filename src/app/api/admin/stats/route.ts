import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'

export async function GET() {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    const { data, error } = await auth.supabaseAdmin.from('application_stats').select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/admin/stats error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
