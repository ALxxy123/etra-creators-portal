import { ETRA_LOGO_SRC } from '../logo'
import { getAppUrl } from '../app-url'

interface TaskItem {
  text: string
  order?: number
}

interface TaskDeliverable {
  icon?: string
  text: string
}

interface TaskCriterion {
  percentage: number
  label: string
}

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderRequirementRows(items: TaskItem[]) {
  return items
    .map((item, index) => {
      const number = index + 1
      return `
        <tr>
          <td width="38" valign="top" style="padding:0 0 12px 12px;">
            <span style="display:inline-block;width:28px;height:28px;border-radius:50%;background-color:#5234B7;color:#ffffff;text-align:center;line-height:28px;font-size:13px;font-weight:800;">${number}</span>
          </td>
          <td valign="top" style="padding:3px 0 12px;font-size:14px;line-height:1.75;color:#2b2545;">
            ${escapeHtml(item.text)}
          </td>
        </tr>`
    })
    .join('')
}

function renderDeliverableRows(items: TaskDeliverable[]) {
  return items
    .map((item) => `
      <tr>
        <td width="30" valign="top" style="padding:0 0 10px 10px;color:#9E59CD;font-size:15px;font-weight:800;">•</td>
        <td valign="top" style="padding:0 0 10px;font-size:14px;line-height:1.65;color:#2b2545;">
          ${escapeHtml(item.text)}
        </td>
      </tr>`)
    .join('')
}

function renderCriteriaRows(items: TaskCriterion[]) {
  return items
    .map((item) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #ede9fe;color:#5234B7;font-size:16px;font-weight:900;text-align:center;white-space:nowrap;">
          ${escapeHtml(item.percentage)}%
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #ede9fe;color:#2b2545;font-size:13px;line-height:1.55;">
          ${escapeHtml(item.label)}
        </td>
      </tr>`)
    .join('')
}

export function taskAssignedTemplate(data: {
  applicantName: string
  trackingCode: string
  specialty: string
  level: string
  taskTitle: string
  taskTitleEn: string
  taskSubtitle: string | null
  taskContext: string
  deadlineHours: number
  deadlineAt: string
  requirements: TaskItem[]
  deliverables: TaskDeliverable[]
  evaluationCriteria: TaskCriterion[]
}): string {
  const year = new Date().getFullYear()
  const appUrl = getAppUrl()
  const safeName = escapeHtml(data.applicantName)
  const safeTrackingCode = escapeHtml(data.trackingCode)
  const safeTaskTitle = escapeHtml(data.taskTitle)
  const safeTaskTitleEn = escapeHtml(data.taskTitleEn)
  const safeSubtitle = escapeHtml(data.taskSubtitle ?? 'مهمة تقييم عملية')
  const safeContext = escapeHtml(data.taskContext)
  const deadline = escapeHtml(data.deadlineAt)
  const requirementsHtml = renderRequirementRows(data.requirements)
  const deliverablesHtml = renderDeliverableRows(data.deliverables)
  const criteriaHtml = renderCriteriaRows(data.evaluationCriteria)

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>تم إرسال مهمة التقييم — إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eff8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0eff8;line-height:1px;">
  تم إرسال مهمة التقييم الخاصة بك في إترا. الموعد النهائي: ${deadline} ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff8;padding:34px 14px;">
  <tr>
    <td align="center">
      <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 46px rgba(30,20,70,0.14);">
        <tr>
          <td style="height:5px;background-color:#5234B7;background:linear-gradient(90deg,#5234B7 0%,#9E59CD 54%,#32D583 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background-color:#1b1537;background:linear-gradient(135deg,#17122f 0%,#5234B7 64%,#9E59CD 100%);padding:38px 34px 34px;text-align:center;">
            <img src="${ETRA_LOGO_SRC}" alt="إترا للتمكين التقني" height="46" style="display:block;margin:0 auto 13px;height:46px;width:auto;outline:none;border:0;text-decoration:none;" />
            <p style="margin:0 0 24px;font-size:13px;color:rgba(255,255,255,0.78);letter-spacing:0.5px;">إترا للتمكين التقني</p>
            <span style="display:inline-block;background-color:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.24);border-radius:999px;padding:7px 18px;color:#ffffff;font-size:12px;font-weight:800;">مهمة تقييم عملية</span>
            <h1 style="margin:18px 0 8px;font-size:28px;line-height:1.35;color:#ffffff;font-weight:900;">${safeTaskTitle}</h1>
            <p dir="ltr" style="margin:0;color:rgba(255,255,255,0.76);font-size:13px;line-height:1.5;">${safeTaskTitleEn}</p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#faf9ff;border-bottom:1px solid #ede9fe;padding:16px 34px;text-align:center;">
            <span style="display:inline-block;background-color:#f5f3ff;border:1px solid #ddd6fe;color:#5234B7;border-radius:999px;padding:6px 18px;font-size:13px;font-weight:800;">
              ${safeSubtitle}
            </span>
          </td>
        </tr>

        <tr>
          <td style="padding:34px 38px 10px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:900;color:#1a1236;">مرحباً ${safeName}،</p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.85;color:#4b4469;">
              تم ترشيحك للمرحلة العملية من تقييم مبدعي إترا. هذه المهمة مصممة لقياس طريقة تفكيرك، جودة التنفيذ، تنظيم التسليم، وقدرتك على التعامل مع متطلبات قريبة من مشاريع العملاء الفعلية.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1b1537;border-radius:16px;overflow:hidden;margin-bottom:26px;">
              <tr>
                <td style="padding:22px 24px;background-color:#1b1537;background:linear-gradient(135deg,#1b1537 0%,#2b2458 100%);">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" valign="top" style="padding:0 0 12px 10px;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">الموعد النهائي</p>
                        <p style="margin:0;font-size:18px;line-height:1.5;color:#ffffff;font-weight:900;">${deadline}</p>
                      </td>
                      <td width="50%" valign="top" style="padding:0 10px 12px 0;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">مدة التسليم</p>
                        <p style="margin:0;font-size:18px;color:#ffffff;font-weight:900;">${escapeHtml(data.deadlineHours)} ساعة</p>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" valign="top" style="border-top:1px solid rgba(255,255,255,0.12);padding:14px 0 0 10px;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">التخصص</p>
                        <p style="margin:0;font-size:14px;color:#ffffff;font-weight:800;">${escapeHtml(data.specialty)}</p>
                      </td>
                      <td width="50%" valign="top" style="border-top:1px solid rgba(255,255,255,0.12);padding:14px 10px 0 0;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">المستوى</p>
                        <p style="margin:0;font-size:14px;color:#ffffff;font-weight:800;">${escapeHtml(data.level)}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" valign="top" style="border-top:1px solid rgba(255,255,255,0.12);padding:14px 0 0;">
                        <p style="margin:0 0 6px;font-size:11px;color:#B0A8D4;font-weight:800;">رمز التتبع</p>
                        <p dir="ltr" style="margin:0;font-family:'Courier New',Courier,monospace;font-size:14px;color:#ffffff;font-weight:800;letter-spacing:2px;text-align:center;">${safeTrackingCode}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf9ff;border:1px solid #ede9fe;border-right:5px solid #5234B7;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 22px;">
                  <p style="margin:0 0 8px;font-size:15px;color:#5234B7;font-weight:900;">سياق المهمة</p>
                  <p style="margin:0;font-size:14px;line-height:1.85;color:#2b2545;">${safeContext}</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 14px;font-size:17px;font-weight:900;color:#1a1236;">المطلوب تنفيذه</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
              ${requirementsHtml}
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td width="50%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <p style="margin:0 0 12px;font-size:15px;color:#1a1236;font-weight:900;">المخرجات المطلوبة</p>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          ${deliverablesHtml}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="50%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:14px;overflow:hidden;">
                    <tr>
                      <td colspan="2" style="padding:18px 20px 8px;">
                        <p style="margin:0;font-size:15px;color:#1a1236;font-weight:900;">معايير التقييم</p>
                      </td>
                    </tr>
                    ${criteriaHtml}
                  </table>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff7ed;border:1px solid #fed7aa;border-radius:14px;margin-bottom:30px;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 8px;font-size:15px;color:#9a3412;font-weight:900;">إرشادات مهمة قبل التسليم</p>
                  <p style="margin:0;font-size:13px;line-height:1.8;color:#7c2d12;">
                    يُفضّل أن يكون التسليم منظماً وواضحاً، مع روابط قابلة للفتح، وشرح مختصر يوضح قراراتك وطريقة عملك. جودة العرض والتنظيم جزء من التقييم.
                  </p>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
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
