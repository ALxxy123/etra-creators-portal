import { ETRA_LOGO_SRC } from '../logo'
import { getAppUrl } from '../app-url'

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function taskReminderTemplate(data: {
  applicantName: string
  trackingCode: string
  specialty: string
  level: string
  taskTitle: string
  deadlineHours: number
  deadlineAt: string
}): string {
  const year = new Date().getFullYear()
  const appUrl = getAppUrl()
  const safeName = escapeHtml(data.applicantName)
  const safeTrackingCode = escapeHtml(data.trackingCode)
  const safeTaskTitle = escapeHtml(data.taskTitle)
  const safeDeadline = escapeHtml(data.deadlineAt)

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>تذكير بموعد تسليم مهمة التقييم — إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eff8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0eff8;line-height:1px;">
  تذكير بموعد تسليم مهمة التقييم في إترا. الموعد النهائي: ${safeDeadline} ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff8;padding:34px 14px;">
  <tr>
    <td align="center">
      <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 46px rgba(30,20,70,0.14);">
        <tr>
          <td style="height:5px;background-color:#5234B7;background:linear-gradient(90deg,#5234B7 0%,#9E59CD 58%,#f59e0b 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background-color:#1b1537;background:linear-gradient(135deg,#17122f 0%,#5234B7 68%,#9E59CD 100%);padding:38px 34px 34px;text-align:center;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا للتمكين التقني" height="46" style="display:block;margin:0 auto 13px;height:46px;width:auto;outline:none;border:0;text-decoration:none;" />
            <p style="margin:0 0 22px;font-size:13px;color:rgba(255,255,255,0.78);letter-spacing:0.5px;">إترا للتمكين التقني</p>
            <span style="display:inline-block;background-color:rgba(245,158,11,0.18);border:1px solid rgba(251,191,36,0.42);border-radius:999px;padding:7px 18px;color:#ffedd5;font-size:12px;font-weight:900;">تذكير مهم</span>
            <h1 style="margin:18px 0 8px;font-size:27px;line-height:1.35;color:#ffffff;font-weight:900;">موعد تسليم مهمة التقييم قريب</h1>
            <p style="margin:0;color:rgba(255,255,255,0.78);font-size:14px;line-height:1.65;">يرجى تجهيز التسليم قبل انتهاء الوقت المحدد.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:34px 38px 8px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:900;color:#1a1236;">مرحباً ${safeName}،</p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.85;color:#4b4469;">
              هذا تذكير لطيف من فريق إترا بخصوص مهمة التقييم المسندة إليك. ننتظر تسليمك المنظم والواضح في الموعد المحدد حتى يكتمل تقييم طلبك بسلاسة.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1b1537;border-radius:16px;overflow:hidden;margin-bottom:24px;">
              <tr>
                <td style="padding:22px 24px;background-color:#1b1537;background:linear-gradient(135deg,#1b1537 0%,#2b2458 100%);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td colspan="2" style="padding:0 0 16px;border-bottom:1px solid rgba(255,255,255,0.12);">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">المهمة</p>
                        <p style="margin:0;font-size:18px;line-height:1.5;color:#ffffff;font-weight:900;">${safeTaskTitle}</p>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" valign="top" style="padding:16px 0 0 10px;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">الموعد النهائي</p>
                        <p style="margin:0;font-size:17px;line-height:1.5;color:#ffffff;font-weight:900;">${safeDeadline}</p>
                      </td>
                      <td width="50%" valign="top" style="padding:16px 10px 0 0;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">مدة التسليم</p>
                        <p style="margin:0;font-size:17px;color:#ffffff;font-weight:900;">${escapeHtml(data.deadlineHours)} ساعة</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff7ed;border:1px solid #fed7aa;border-right:5px solid #f59e0b;border-radius:14px;margin-bottom:24px;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 8px;font-size:15px;color:#9a3412;font-weight:900;">قبل الإرسال</p>
                  <p style="margin:0;font-size:13px;line-height:1.8;color:#7c2d12;">
                    تأكد أن روابط التسليم قابلة للفتح، وأن المخرجات مرتبة، وأنك أضفت شرحاً مختصراً يوضح قراراتك وطريقة التنفيذ. التنظيم جزء مهم من التقييم.
                  </p>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf9ff;border:1px solid #ede9fe;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:18px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:5px 0;color:#6b6490;font-size:13px;width:38%;">التخصص</td>
                      <td style="padding:5px 0;color:#1a1236;font-size:13px;font-weight:800;">${escapeHtml(data.specialty)}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;color:#6b6490;font-size:13px;">المستوى</td>
                      <td style="padding:5px 0;color:#1a1236;font-size:13px;font-weight:800;">${escapeHtml(data.level)}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;color:#6b6490;font-size:13px;">رمز التتبع</td>
                      <td dir="ltr" style="padding:5px 0;color:#5234B7;font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:900;letter-spacing:1px;text-align:right;">${safeTrackingCode}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td align="center">
                  <a href="${appUrl}/track" style="display:inline-block;background-color:#5234B7;background:linear-gradient(135deg,#5234B7 0%,#9E59CD 100%);color:#ffffff;text-decoration:none;padding:15px 34px;border-radius:12px;font-weight:900;font-size:15px;box-shadow:0 10px 24px rgba(82,52,183,0.28);">
                    متابعة حالة الطلب
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:18px 0 0;text-align:center;font-size:12px;line-height:1.7;color:#6b7280;">
              استخدم رمز التتبع عند الحاجة: <span dir="ltr" style="font-family:'Courier New',Courier,monospace;color:#5234B7;font-weight:800;letter-spacing:1px;">${safeTrackingCode}</span>
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 38px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:#ede9fe;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background-color:#faf9ff;padding:24px 38px 28px;text-align:center;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا" height="30" style="display:block;margin:0 auto 10px;height:30px;width:auto;opacity:0.74;outline:none;border:0;" />
            <p style="margin:0 0 5px;font-size:13px;color:#6b7280;">إترا للتمكين التقني — تبوك، المملكة العربية السعودية</p>
            <p style="margin:0 0 5px;font-size:12px;color:#9ca3af;">هذا البريد أُرسل تلقائياً من بوابة مبدعي إترا · للاستفسار: <a href="mailto:etrahub@gmail.com" style="color:#5234B7;text-decoration:none;">etrahub@gmail.com</a></p>
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
