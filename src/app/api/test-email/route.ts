export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'dev only' }, { status: 403 })
  }

  try {
    const { transporter } = await import('@/lib/emails/transporter')
    await transporter.verify()

    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: '✅ اختبار نظام إيميلات إترا',
      html: '<div dir="rtl" style="font-family:Arial;padding:20px;"><h2 style="color:#5234B7;">🎉 نظام الإيميلات يعمل بشكل صحيح!</h2><p>تم الإرسال بنجاح من etrahub@gmail.com</p></div>',
    })

    return Response.json({ success: true, message: 'تم إرسال إيميل الاختبار بنجاح' })
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}
