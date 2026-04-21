import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('cv') as File | null

    if (!file) {
      return NextResponse.json({ error: 'لا يوجد ملف' }, { status: 400 })
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'يُقبل فقط ملفات PDF' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'حجم الملف يتجاوز 5MB' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const { data, error } = await supabase.storage
      .from('creator-cvs')
      .upload(fileName, file, { contentType: 'application/pdf' })

    if (error) {
      console.error('Storage upload error:', error)
      return NextResponse.json({ error: 'فشل رفع الملف' }, { status: 500 })
    }

    return NextResponse.json({ path: data.path }, { status: 200 })
  } catch (err) {
    console.error('POST /api/upload-cv error:', err)
    return NextResponse.json({ error: 'خطأ داخلي' }, { status: 500 })
  }
}
