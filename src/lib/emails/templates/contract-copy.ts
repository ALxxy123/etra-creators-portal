import { ETRA_LOGO_SRC } from '../logo'
import type { ContractSnapshotArticle } from '@/types/database'

export function contractCopyTemplate(data: {
  applicantName: string
  trackingCode: string
  contractVersion: string
  acceptedAt: string
  acceptanceIp: string | null
  articles: ContractSnapshotArticle[]
}): string {
  const year = new Date().getFullYear()

  const articlesHtml = data.articles.map((a) => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf9ff;border:1px solid #e5deff;border-right:3px solid #5234B7;border-radius:10px;margin-bottom:14px;">
      <tr>
        <td style="padding:18px 22px;">
          <p style="margin:0 0 8px;font-size:14px;font-weight:800;color:#5234B7;">البند (${a.number}) — ${a.title}</p>
          <p style="margin:0;font-size:13px;color:#3a3458;line-height:1.85;">${a.body}</p>
        </td>
      </tr>
    </table>
  `).join('')

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>نسخة عقدك الموقّع — إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eff8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0eff8;line-height:1px;">
  نسخة من العقد الذي وقّعت عليه إلكترونياً مع إترا للتمكين التقني · احتفظ بها لسجلاتك ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff8;padding:32px 16px;">
  <tr>
    <td align="center">

      <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(82,52,183,0.10);">

        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#5234B7 0%,#9E59CD 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1236 0%,#3a2476 100%);padding:36px 32px 28px;text-align:center;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا" height="40" style="display:block;margin:0 auto 14px;height:40px;width:auto;" />
            <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#fff;letter-spacing:0.3px;">عقد التعاون الإلكتروني</p>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);">نسخة موثّقة من البنود التي وافقت عليها</p>
          </td>
        </tr>

        <!-- Status banner -->
        <tr>
          <td style="background-color:#faf9ff;border-bottom:1px solid #e5deff;padding:12px 32px;text-align:center;">
            <span style="display:inline-block;background-color:#ede5ff;color:#5234B7;border:1px solid #cbb5f5;padding:5px 18px;border-radius:999px;font-size:12px;font-weight:700;">✓ &nbsp;عقد نافذ بتاريخ ${data.acceptedAt}</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">

            <p style="margin:0 0 8px;font-size:18px;font-weight:800;color:#1a1236;text-align:right;">عزيزي/تي ${data.applicantName}</p>
            <p style="margin:0 0 24px;font-size:14px;color:#4b4469;line-height:1.85;text-align:right;">
              تجد فيما يلي نسخةً كاملة من بنود العقد الإلكتروني الذي وافقت عليه عند تسجيلك في بوابة مبدعي إترا. يُرجى الاحتفاظ بهذا البريد كمستند رسمي ضمن سجلاتك الشخصية.
            </p>

            <!-- Parties -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#fafafe 0%,#f5f3ff 100%);border:1px solid #e5deff;border-radius:12px;margin-bottom:24px;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-size:13px;font-weight:800;color:#5234B7;text-align:right;">أطراف العقد</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#1a1236;">
                    <tr>
                      <td style="padding:4px 0;color:#6b7280;width:35%;text-align:right;">الطرف الأول</td>
                      <td style="padding:4px 0;font-weight:600;text-align:right;padding-right:12px;">شركة إترا للتمكين التقني</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;color:#6b7280;text-align:right;">الطرف الثاني</td>
                      <td style="padding:4px 0;font-weight:600;text-align:right;padding-right:12px;">${data.applicantName}</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;color:#6b7280;text-align:right;">رمز التتبع</td>
                      <td style="padding:4px 0;font-weight:600;text-align:right;padding-right:12px;font-family:'Courier New',Courier,monospace;letter-spacing:1.5px;">${data.trackingCode}</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;color:#6b7280;text-align:right;">إصدار العقد</td>
                      <td style="padding:4px 0;font-weight:600;text-align:right;padding-right:12px;font-family:'Courier New',Courier,monospace;">${data.contractVersion}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Articles -->
            <p style="margin:0 0 14px;font-size:15px;font-weight:800;color:#1a1236;text-align:right;border-bottom:2px solid #ede5ff;padding-bottom:10px;">بنود العقد</p>

            ${articlesHtml}

            <!-- Acceptance proof -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:10px;margin-top:24px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;font-size:12px;font-weight:800;color:#92400e;text-align:right;">دليل الموافقة الإلكترونية</p>
                  <p style="margin:0 0 4px;font-size:12px;color:#78350f;text-align:right;line-height:1.7;">
                    وقت الموافقة: <span style="font-family:'Courier New',Courier,monospace;font-weight:600;">${data.acceptedAt}</span>
                  </p>
                  ${data.acceptanceIp ? `<p style="margin:0;font-size:12px;color:#78350f;text-align:right;line-height:1.7;">
                    عنوان IP: <span style="font-family:'Courier New',Courier,monospace;font-weight:600;">${data.acceptanceIp}</span>
                  </p>` : ''}
                </td>
              </tr>
            </table>

            <p style="margin:24px 0 0;font-size:12px;color:#6b7280;text-align:right;line-height:1.7;">
              تمثّل موافقتك الإلكترونية على البنود أعلاه عقداً ملزماً بكافة آثاره القانونية وفقاً للأنظمة المعمول بها في المملكة العربية السعودية. للاستفسار يمكنك التواصل معنا على
              <a href="mailto:etrahub@gmail.com" style="color:#5234B7;text-decoration:none;font-weight:600;">etrahub@gmail.com</a>.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#faf9ff;padding:22px 36px;text-align:center;border-top:1px solid #e5deff;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا" height="26" style="display:block;margin:0 auto 8px;height:26px;width:auto;opacity:0.65;" />
            <p style="margin:0 0 4px;font-size:12px;color:#6b7280;">إترا للتمكين التقني — تبوك، المملكة العربية السعودية</p>
            <p style="margin:0;font-size:11px;color:#9ca3af;">&copy; ${year} ETRA. جميع الحقوق محفوظة.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`
}
