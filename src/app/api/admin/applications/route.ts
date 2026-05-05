import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import type { ApplicationStatus, Level, Specialty } from '@/types/database'

const ALLOWED_STATUSES = ['new', 'under_review', 'accepted', 'rejected'] as const satisfies readonly ApplicationStatus[]
const ALLOWED_SPECIALTIES = ['mobile', 'uiux', 'frontend', 'backend', 'fullstack'] as const satisfies readonly Specialty[]
const ALLOWED_LEVELS = ['mid', 'senior'] as const satisfies readonly Level[]

function getAllowedParam<T extends string>(value: string | null, allowed: readonly T[]) {
  if (!value || value === 'all') return null
  return allowed.includes(value as T) ? value as T : null
}

function getBoundedInt(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value || '', 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(parsed, min), max)
}

function normalizeSearch(value: string | null) {
  return (value ?? '')
    .trim()
    .slice(0, 80)
    .replace(/[\\%*,()]/g, ' ')
    .replace(/\s+/g, ' ')
}

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) return auth.response

    const { supabaseAdmin } = auth

    const { searchParams } = req.nextUrl
    const status = getAllowedParam(searchParams.get('status'), ALLOWED_STATUSES)
    const specialty = getAllowedParam(searchParams.get('specialty'), ALLOWED_SPECIALTIES)
    const level = getAllowedParam(searchParams.get('level'), ALLOWED_LEVELS)
    const search = normalizeSearch(searchParams.get('search'))
    const page = getBoundedInt(searchParams.get('page'), 1, 1, 10000)
    const limit = getBoundedInt(searchParams.get('limit'), 20, 1, 100)
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

    if (status) query = query.eq('status', status)
    if (specialty) query = query.eq('specialty', specialty)
    if (level) query = query.eq('level', level)
    if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,tracking_code.ilike.%${search}%`)

    const { data, error, count } = await query
    if (error) return NextResponse.json({ error: 'خطأ في جلب البيانات' }, { status: 500 })

    return NextResponse.json({ data, count, page, limit })
  } catch (err) {
    console.error('GET /api/admin/applications error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
