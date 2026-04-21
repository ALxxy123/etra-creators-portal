import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { randomUUID } from 'crypto'

// PDF magic bytes: %PDF-
const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2D])

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('cv') as File | null

    if (!file) {
      return NextResponse.json({ error: 'لا يوجد ملف' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'حجم الملف يتجاوز 5MB' }, { status: 400 })
    }

    // Validate actual PDF magic bytes — not just MIME type
    const buffer = Buffer.from(await file.arrayBuffer())
    if (!buffer.slice(0, 5).equals(PDF_MAGIC)) {
      return NextResponse.json({ error: 'الملف ليس PDF صالحاً' }, { status: 400 })
    }

    // Use random UUID — never user-provided filename
    const fileName = `${randomUUID()}.pdf`

    const supabase = createAdminClient()
    const { data, error } = await supabase.storage
      .from('creator-cvs')
      .upload(fileName, buffer, { contentType: 'application/pdf' })

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
