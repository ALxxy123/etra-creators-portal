import { ETRA_LOGO_URL } from '../logo'

const specialtyPillStyle: Record<string, { bg: string; color: string; border: string }> = {
  mobile:    { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa', border: 'rgba(59,130,246,0.35)'  },
  uiux:      { bg: 'rgba(16,185,129,0.15)',  color: '#34d399', border: 'rgba(16,185,129,0.35)'  },
  frontend:  { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24', border: 'rgba(245,158,11,0.35)'  },
  backend:   { bg: 'rgba(239,68,68,0.15)',   color: '#f87171', border: 'rgba(239,68,68,0.35)'   },
  fullstack: { bg: 'rgba(167,139,250,0.15)', color: '#c4b5fd', border: 'rgba(167,139,250,0.35)' },
}

export function newApplicationAdminTemplate(data: {
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantCity: string
  specialty: string
  level: string
  yearsOfExperience: string
  linkedinOrGithub: string
  portfolio?: string
  bio?: string
  trackingCode: string
  submissionDate: string
  totalCount: number
}): string {
  const year = new Date().getFullYear()
  const pill = specialtyPillStyle[data.specialty] ?? specialtyPillStyle.fullstack
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>طلب انضمام جديد — لوحة تحكم إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f1e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#0f0f1e;line-height:1px;">
  طلب جديد من ${data.applicantName} — ${data.specialty} · ${data.level} · رمز التتبع ${data.trackingCode} ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
</div>

<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f0f1e;padding:32px 16px;">
  <tr>
    <td align="center">

      <!-- Card -->
      <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:#161625;border-radius:16px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,0.60);border:1px solid #2d2d44;">

        <!-- Top accent bar -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#5234B7 0%,#9E59CD 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Split header: logo + notification pill -->
        <tr>
          <td style="background:linear-gradient(135deg,#5234B7 0%,#9E59CD 100%);padding:28px 28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle">
                  <img src="${ETRA_LOGO_URL}" alt="إترا" height="34" style="display:block;height:34px;width:auto;filter:brightness(0) invert(1);" />
                </td>
                <td valign="middle" align="left">
                  <span style="display:inline-block;background-color:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.30);padding:5px 14px;border-radius:999px;font-size:12px;color:#fff;font-weight:600;letter-spacing:0.3px;">🔔 &nbsp;متقدم جديد</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background-color:rgba(245,158,11,0.08);border-top:1px solid rgba(245,158,11,0.15);border-bottom:1px solid rgba(245,158,11,0.15);padding:14px 28px;text-align:center;">
            <span style="font-size:14px;font-weight:700;color:#fbbf24;">⚡ &nbsp;وصل طلب انضمام جديد — يتطلب المراجعة</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">

            <!-- Applicant card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(26,26,53,0.70);border:1px solid rgba(82,52,183,0.22);border-radius:12px;margin-bottom:16px;">
              <tr>
                <td style="padding:18px 20px 14px;">
                  <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#a78bfa;border-bottom:1px solid rgba(167,139,250,0.15);padding-bottom:10px;">👤 &nbsp;بيانات المتقدم</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;">
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;width:32%;">الاسم</td>
                      <td style="padding:6px 0;font-weight:700;color:#f8fafc;">${data.applicantName}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;">البريد الإلكتروني</td>
                      <td style="padding:6px 0;"><a href="mailto:${data.applicantEmail}" style="color:#60a5fa;text-decoration:none;">${data.applicantEmail}</a></td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;">رقم الجوال</td>
                      <td style="padding:6px 0;color:#f8fafc;font-family:'Courier New',Courier,monospace;">${data.applicantPhone}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;">المدينة</td>
                      <td style="padding:6px 0;color:#f8fafc;">${data.applicantCity}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Professional card with color-coded specialty pill -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(26,26,53,0.70);border:1px solid rgba(82,52,183,0.22);border-radius:12px;margin-bottom:16px;">
              <tr>
                <td style="padding:18px 20px 14px;">
                  <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#a78bfa;border-bottom:1px solid rgba(167,139,250,0.15);padding-bottom:10px;">💼 &nbsp;المعلومات المهنية</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;">
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;width:32%;vertical-align:middle;">التخصص</td>
                      <td style="padding:6px 0;vertical-align:middle;">
                        <span style="display:inline-block;background-color:${pill.bg};color:${pill.color};border:1px solid ${pill.border};padding:4px 12px;border-radius:6px;font-size:12px;font-weight:700;">${data.specialty}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;">المستوى</td>
                      <td style="padding:6px 0;color:#f8fafc;font-weight:600;">${data.level}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;">سنوات الخبرة</td>
                      <td style="padding:6px 0;color:#f8fafc;">${data.yearsOfExperience}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#94a3b8;">لينكد إن / GitHub</td>
                      <td style="padding:6px 0;"><a href="${data.linkedinOrGithub}" target="_blank" style="color:#60a5fa;text-decoration:none;word-break:break-all;">رابط الحساب ↗</a></td>
                    </tr>
                    ${data.portfolio ? `<tr>
                      <td style="padding:6px 0;color:#94a3b8;">البورتفوليو</td>
                      <td style="padding:6px 0;"><a href="${data.portfolio}" target="_blank" style="color:#60a5fa;text-decoration:none;word-break:break-all;">رابط البورتفوليو ↗</a></td>
                    </tr>` : ''}
                  </table>
                </td>
              </tr>
            </table>

            <!-- Bio card (conditional) -->
            ${data.bio ? `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(26,26,53,0.70);border:1px solid rgba(82,52,183,0.22);border-radius:12px;margin-bottom:16px;">
              <tr>
                <td style="padding:18px 20px 16px;">
                  <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#a78bfa;">📝 &nbsp;نبذة المتقدم</p>
                  <p style="margin:0;font-size:13px;color:#b0a8d4;line-height:1.70;white-space:pre-wrap;">${data.bio}</p>
                </td>
              </tr>
            </table>` : ''}

            <!-- Tracking meta 3-col table -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(82,52,183,0.08);border:1px dashed rgba(167,139,250,0.30);border-radius:10px;margin-bottom:28px;">
              <tr>
                <td style="padding:16px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="33%" style="text-align:center;border-left:1px solid rgba(167,139,250,0.15);padding:0 12px 0 12px;">
                        <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">رمز التتبع</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#c4b5fd;font-family:'Courier New',Courier,monospace;letter-spacing:1px;">${data.trackingCode}</p>
                      </td>
                      <td width="33%" style="text-align:center;border-left:1px solid rgba(167,139,250,0.15);padding:0 12px;">
                        <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">تاريخ التقديم</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#e2e8f0;">${data.submissionDate}</p>
                      </td>
                      <td width="33%" style="text-align:center;padding:0 12px;">
                        <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">إجمالي الطلبات</p>
                        <p style="margin:0;font-size:18px;font-weight:800;color:#34d399;">${data.totalCount}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <a href="https://etra-creators.vercel.app/admin/applications" style="display:inline-block;background:linear-gradient(135deg,#5234B7 0%,#9E59CD 100%);color:#ffffff;text-decoration:none;padding:15px 36px;border-radius:10px;font-weight:700;font-size:14px;letter-spacing:0.3px;box-shadow:0 6px 24px rgba(82,52,183,0.40);">مراجعة الطلب في لوحة التحكم ←</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#11111a;border-top:1px solid #2d2d44;padding:18px 32px;text-align:center;">
            <p style="margin:0 0 5px;font-size:12px;color:#475569;">هذا الإشعار يُرسَل تلقائياً لفريق إترا عند كل طلب جديد</p>
            <p style="margin:0;font-size:11px;color:#334155;">&copy; ${year} ETRA — للاستفسار: <a href="mailto:etrahub@gmail.com" style="color:#7c3aed;text-decoration:none;">etrahub@gmail.com</a></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`
}
