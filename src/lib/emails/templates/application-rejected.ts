import { ETRA_LOGO_SRC } from '../logo'
import { getAppUrl } from '../app-url'

export function applicationRejectedTemplate(data: {
  applicantName: string
  trackingCode: string
  specialty: string
  level: string
  reason: string | null
}): string {
  const year = new Date().getFullYear()
  const appUrl = getAppUrl()
  const reasonBlock = data.reason
    ? `
            <!-- Reason card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf9ff;border:1px solid #e9e4f6;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:22px 26px;">
                  <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#5234B7;letter-spacing:0.3px;">السبب الذي شاركه فريق المراجعة</p>
                  <p style="margin:0;font-size:14px;color:#3a2f5e;line-height:1.85;white-space:pre-wrap;">${escapeHtml(data.reason)}</p>
                </td>
              </tr>
            </table>`
    : ''

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>تحديث بخصوص طلبك في إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eff8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0eff8;line-height:1px;">
  شكراً لاهتمامك بإترا ${data.applicantName} — تحديث بخصوص نتيجة طلبك بعد المراجعة ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
</div>

<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff8;padding:32px 16px;">
  <tr>
    <td align="center">

      <!-- Card -->
      <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(82,52,183,0.10);">

        <!-- Top accent bar -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#5234B7 0%,#9E59CD 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1236 0%,#3a2f5e 100%);padding:40px 32px 32px;text-align:center;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا" height="40" style="display:block;margin:0 auto 12px;height:40px;width:auto;" />
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.78);letter-spacing:0.5px;">إترا للتمكين التقني</p>
          </td>
        </tr>

        <!-- Status banner -->
        <tr>
          <td style="background-color:#faf9ff;border-bottom:1px solid #e9e4f6;padding:14px 32px;text-align:center;">
            <span style="display:inline-block;background-color:#f3eefb;color:#5234B7;border:1px solid #d9cdee;padding:5px 18px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.3px;">تحديث بخصوص طلبك</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">

            <!-- Greeting -->
            <p style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1a1236;text-align:right;">عزيزنا ${data.applicantName}،</p>
            <p style="margin:0 0 22px;font-size:15px;color:#4b4469;line-height:1.85;text-align:right;">
              نشكرك على الوقت والجهد اللذين بذلتهما في تقديم طلبك للانضمام إلى شبكة مبدعي إترا، ونُقدّر اهتمامك بأن تكون جزءاً من رحلتنا.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#4b4469;line-height:1.85;text-align:right;">
              بعد مراجعة طلبك بعناية من قِبل فريقنا، نأسف لإبلاغك بأننا لن نتمكن من المُضيّ قُدماً معك في هذه المرحلة. هذا القرار لا يُقلّل من قيمة ما قدّمته، وإنما يعكس مواءمتنا الحالية مع احتياجات الشبكة وأولوياتها.
            </p>

            <!-- Application summary -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa;border:1px solid #ececf3;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#6b6490;letter-spacing:0.3px;">تفاصيل طلبك</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#1a1236;">
                    <tr>
                      <td style="padding:5px 0;color:#6b7280;width:40%;text-align:right;">التخصص</td>
                      <td style="padding:5px 0;font-weight:600;text-align:right;padding-right:12px;">${data.specialty}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;color:#6b7280;text-align:right;">المستوى</td>
                      <td style="padding:5px 0;font-weight:600;text-align:right;padding-right:12px;">${data.level}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;color:#6b7280;text-align:right;">رمز التتبع</td>
                      <td style="padding:5px 0;font-weight:600;text-align:right;padding-right:12px;font-family:'Courier New',Courier,monospace;letter-spacing:2px;">${data.trackingCode}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
${reasonBlock}

            <!-- Encouragement -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#faf9ff 0%,#f5f3ff 100%);border:1px solid #e9e4f6;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:22px 26px;">
                  <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#5234B7;">نتمنى لك التوفيق</p>
                  <p style="margin:0;font-size:14px;color:#4b4469;line-height:1.85;">
                    نُؤمن بأن لكل مبدع طريقه ووقته. نشجّعك على مواصلة صقل مهاراتك وبناء مشاريع تُمثّل قدراتك، ونرحّب بطلبك مجدداً مستقبلاً متى ما رأيت أن المواءمة قد تطوّرت.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Closing quote -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-right:4px solid #9E59CD;margin-bottom:28px;">
              <tr>
                <td style="padding:12px 18px;">
                  <p style="margin:0;font-size:14px;color:#5234B7;font-weight:600;font-style:italic;line-height:1.7;">"كل رحلة تبدأ بخطوة، وكل لا اليوم قد تكون نعم في الغد. شكراً لثقتك في إترا."</p>
                  <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">— فريق إترا للتمكين التقني</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
              <tr>
                <td align="center">
                  <a href="${appUrl}/track" style="display:inline-block;background:#ffffff;color:#5234B7;text-decoration:none;padding:13px 30px;border-radius:10px;font-weight:700;font-size:14px;letter-spacing:0.3px;border:1px solid #d9cdee;">عرض حالة طلبك ←</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:#ececf3;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#faf9ff;padding:24px 40px;text-align:center;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا" height="28" style="display:block;margin:0 auto 10px;height:28px;width:auto;opacity:0.7;" />
            <p style="margin:0 0 5px;font-size:13px;color:#6b7280;">إترا للتمكين التقني — تبوك، المملكة العربية السعودية</p>
            <p style="margin:0 0 5px;font-size:12px;color:#9ca3af;">هذا البريد أُرسل تلقائياً · للاستفسار: <a href="mailto:etrahub@gmail.com" style="color:#5234B7;text-decoration:none;">etrahub@gmail.com</a></p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; ${year} ETRA. جميع الحقوق محفوظة.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
