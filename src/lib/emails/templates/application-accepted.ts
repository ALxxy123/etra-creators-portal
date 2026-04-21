import { ETRA_LOGO_URL } from '../logo'

export function applicationAcceptedTemplate(data: {
  applicantName: string
  trackingCode: string
  specialty: string
  level: string
}): string {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>تهانينا — انضممت إلى شبكة مبدعي إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eff8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0eff8;line-height:1px;">
  مبارك ${data.applicantName} — لقد اجتزت جميع مراحل التقييم وانضممت رسمياً إلى شبكة مبدعي إترا ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
</div>

<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff8;padding:32px 16px;">
  <tr>
    <td align="center">

      <!-- Card -->
      <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(5,150,105,0.10);">

        <!-- Top accent bar -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#059669 0%,#10b981 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#047857 0%,#10b981 100%);padding:40px 32px 32px;text-align:center;">
            <div style="font-size:52px;line-height:1;margin-bottom:16px;">🎉</div>
            <img src="${ETRA_LOGO_URL}" alt="إترا" height="40" style="display:block;margin:0 auto 10px;height:40px;width:auto;" />
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.80);letter-spacing:0.5px;">إترا للتمكين التقني</p>
          </td>
        </tr>

        <!-- Status banner -->
        <tr>
          <td style="background-color:#f0fdf4;border-bottom:1px solid #a7f3d0;padding:14px 32px;text-align:center;">
            <span style="display:inline-block;background-color:#d1fae5;color:#065f46;border:1px solid #6ee7b7;padding:5px 18px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.3px;">✓ &nbsp;تم قبولك في شبكة مبدعي إترا</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">

            <!-- Greeting -->
            <p style="margin:0 0 6px;font-size:24px;font-weight:800;color:#047857;text-align:center;">مبارك ${data.applicantName}! 🌟</p>
            <p style="margin:0 0 28px;font-size:15px;color:#4b4469;line-height:1.75;text-align:center;">لقد اجتزت جميع مراحل التقييم بنجاح. يسعدنا إخبارك بأنه تم قبولك رسمياً لتكون جزءاً من شبكة النخبة لمبدعي إترا.</p>

            <!-- Welcome card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#faf9ff 0%,#f0fdf4 100%);border:1px solid #a7f3d0;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px 28px;text-align:center;">
                  <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:#047857;">أنت الآن مبدع إترا ✦</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#1a1236;">
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;width:40%;text-align:right;">التخصص</td>
                      <td style="padding:6px 0;font-weight:600;text-align:right;padding-right:12px;">${data.specialty}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">المستوى</td>
                      <td style="padding:6px 0;font-weight:600;padding-right:12px;">${data.level}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">رمز التتبع</td>
                      <td style="padding:6px 0;font-weight:600;padding-right:12px;font-family:'Courier New',Courier,monospace;letter-spacing:2px;">${data.trackingCode}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Benefits 2x2 grid (using nested tables) -->
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1236;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">مزايا عضويتك في الشبكة</p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <!-- Benefit 1 -->
                <td width="50%" style="padding-left:8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4;border-radius:10px;height:100%;">
                    <tr>
                      <td style="padding:16px;">
                        <p style="margin:0 0 6px;font-size:20px;">🚀</p>
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#047857;">مشاريع مستمرة</p>
                        <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">مشاريع حقيقية مع عملاء موثوقين تصلك مباشرة</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- Benefit 2 -->
                <td width="50%" style="padding-right:8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;border-radius:10px;height:100%;">
                    <tr>
                      <td style="padding:16px;">
                        <p style="margin:0 0 6px;font-size:20px;">💰</p>
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#5234B7;">دفع مضمون</p>
                        <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">60% من قيمة كل مشروع تُحوَّل فور اكتمال المرحلة</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr><td colspan="2" style="height:8px;"></td></tr>
              <tr>
                <!-- Benefit 3 -->
                <td width="50%" style="padding-left:8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbeb;border-radius:10px;height:100%;">
                    <tr>
                      <td style="padding:16px;">
                        <p style="margin:0 0 6px;font-size:20px;">📄</p>
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#b45309;">حماية قانونية</p>
                        <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">عقود رسمية وإدارة النزاعات على عاتق إترا</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- Benefit 4 -->
                <td width="50%" style="padding-right:8px;vertical-align:top;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border-radius:10px;height:100%;">
                    <tr>
                      <td style="padding:16px;">
                        <p style="margin:0 0 6px;font-size:20px;">🤝</p>
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#334155;">شبكة نخبة</p>
                        <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">انضمام إلى مجتمع المبدعين التقنيين المتميزين</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- 3-step next steps -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:32px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 18px;font-size:15px;font-weight:700;color:#1a1236;">الخطوات التالية</p>

                  <!-- Step 1 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:30px;height:30px;background:linear-gradient(135deg,#047857,#10b981);border-radius:50%;text-align:center;line-height:30px;font-size:13px;font-weight:700;color:#fff;display:inline-block;">١</div>
                      </td>
                      <td style="padding-top:5px;">
                        <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#1a1236;">إتمام العقد الرسمي</p>
                        <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">سيتواصل معك فريق إترا قريباً لتوقيع عقد التعاون</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Step 2 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:30px;height:30px;background:linear-gradient(135deg,#047857,#10b981);border-radius:50%;text-align:center;line-height:30px;font-size:13px;font-weight:700;color:#fff;display:inline-block;">٢</div>
                      </td>
                      <td style="padding-top:5px;">
                        <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#1a1236;">الانضمام إلى القناة</p>
                        <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">ستتلقى دعوة للانضمام إلى مجموعة مبدعي إترا</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Step 3 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:30px;height:30px;background:linear-gradient(135deg,#047857,#10b981);border-radius:50%;text-align:center;line-height:30px;font-size:13px;font-weight:700;color:#fff;display:inline-block;">٣</div>
                      </td>
                      <td style="padding-top:5px;">
                        <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#1a1236;">استقبال أول مشروع</p>
                        <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">ستبدأ إترا بتخصيص المشاريع المناسبة لمهاراتك</p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <!-- Closing quote -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-right:4px solid #10b981;margin-bottom:32px;">
              <tr>
                <td style="padding:12px 18px;">
                  <p style="margin:0;font-size:15px;color:#047857;font-weight:600;font-style:italic;line-height:1.65;">"يسعدنا أن تكون جزءاً من رحلة التمكين التقني في المملكة. معاً نبني مستقبلاً رقمياً أكثر إبداعاً."</p>
                  <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">— فريق إترا للتمكين التقني</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
              <tr>
                <td align="center">
                  <a href="https://etra-creators.vercel.app/track" style="display:inline-block;background:linear-gradient(135deg,#047857 0%,#10b981 100%);color:#ffffff;text-decoration:none;padding:15px 36px;border-radius:10px;font-weight:700;font-size:15px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(5,150,105,0.30);">الدخول إلى بوابة مبدعي إترا ←</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:#d1fae5;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#f0fdf4;padding:24px 40px;text-align:center;">
            <img src="${ETRA_LOGO_URL}" alt="إترا" height="28" style="display:block;margin:0 auto 10px;height:28px;width:auto;opacity:0.7;" />
            <p style="margin:0 0 5px;font-size:13px;color:#6b7280;">إترا للتمكين التقني — تبوك، المملكة العربية السعودية</p>
            <p style="margin:0 0 5px;font-size:12px;color:#9ca3af;">هذا البريد أُرسل تلقائياً · للاستفسار: <a href="mailto:etrahub@gmail.com" style="color:#047857;text-decoration:none;">etrahub@gmail.com</a></p>
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
