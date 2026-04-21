import { ETRA_LOGO_URL } from '../logo'

export function applicationReceivedTemplate(data: {
  applicantName: string
  trackingCode: string
  specialty: string
  level: string
  submissionDate: string
}): string {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>تم استلام طلبك — إترا</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eff8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0eff8;line-height:1px;">
  تم استلام طلبك بنجاح · رمز التتبع: ${data.trackingCode} · تستغرق المراجعة حوالي ٥ أيام عمل ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
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
          <td style="background:linear-gradient(135deg,#5234B7 0%,#9E59CD 100%);padding:40px 32px 36px;text-align:center;">
            <img src="${ETRA_LOGO_URL}" alt="إترا" height="44" style="display:block;margin:0 auto 10px;height:44px;width:auto;" />
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.80);letter-spacing:0.5px;">إترا للتمكين التقني</p>
          </td>
        </tr>

        <!-- Status banner -->
        <tr>
          <td style="background-color:#fffbeb;border-bottom:1px solid #fde68a;padding:14px 32px;text-align:center;">
            <span style="display:inline-block;background-color:#fef3c7;color:#b45309;border:1px solid #fcd34d;padding:5px 18px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.3px;">⏳ &nbsp;طلبك قيد المراجعة</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">

            <!-- Greeting -->
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1236;">مرحباً ${data.applicantName}،</p>
            <p style="margin:0 0 28px;font-size:15px;color:#4b4469;line-height:1.75;">شكراً لتقديمك طلب الانضمام إلى شبكة مبدعي إترا. لقد استُلم طلبك بنجاح، ويتولى فريقنا مراجعته حالياً. تستغرق عملية المراجعة عادةً حوالي ٥ أيام عمل.</p>

            <!-- Tracking code box -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;border:2px solid #5234B7;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px 28px;text-align:center;">
                  <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#7c3aed;font-weight:700;">رمز تتبع طلبك</p>
                  <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:26px;font-weight:800;color:#5234B7;letter-spacing:5px;">${data.trackingCode}</p>
                  <p style="margin:0;font-size:12px;color:#6b7280;">احتفظ بهذا الرمز — ستحتاجه لمتابعة حالة طلبك عبر الموقع</p>
                </td>
              </tr>
            </table>

            <!-- Application summary table -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:32px;font-size:14px;">
              <tr style="background-color:#fafafa;">
                <td style="padding:12px 18px;color:#6b7280;width:38%;border-bottom:1px solid #e5e7eb;">الاسم الكامل</td>
                <td style="padding:12px 18px;font-weight:600;color:#1a1236;border-bottom:1px solid #e5e7eb;">${data.applicantName}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;color:#6b7280;border-bottom:1px solid #e5e7eb;">التخصص</td>
                <td style="padding:12px 18px;font-weight:600;color:#1a1236;border-bottom:1px solid #e5e7eb;">${data.specialty}</td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:12px 18px;color:#6b7280;border-bottom:1px solid #e5e7eb;">المستوى</td>
                <td style="padding:12px 18px;font-weight:600;color:#1a1236;border-bottom:1px solid #e5e7eb;">${data.level}</td>
              </tr>
              <tr>
                <td style="padding:12px 18px;color:#6b7280;">تاريخ التقديم</td>
                <td style="padding:12px 18px;font-weight:600;color:#1a1236;">${data.submissionDate}</td>
              </tr>
            </table>

            <!-- Section heading -->
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1236;border-bottom:2px solid #f3f4f6;padding-bottom:10px;">ملخص آلية العمل في إترا</p>

            <!-- Term card 1: Financial split -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;border-radius:10px;border-right:4px solid #5234B7;margin-bottom:12px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#5234B7;">التوزيع المالي</p>
                  <!-- Split bar -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                    <tr>
                      <td width="40%" style="background:linear-gradient(90deg,#5234B7,#9E59CD);border-radius:6px 0 0 6px;padding:7px 10px;text-align:center;">
                        <span style="font-size:12px;color:#fff;font-weight:700;">إترا · 40%</span>
                      </td>
                      <td width="60%" style="background:linear-gradient(90deg,#059669,#10b981);border-radius:0 6px 6px 0;padding:7px 10px;text-align:center;">
                        <span style="font-size:12px;color:#fff;font-weight:700;">المبدع · 60%</span>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0;font-size:13px;color:#4b4469;line-height:1.6;">تحصل على <strong style="color:#059669;">60%</strong> من قيمة كل مشروع، وتحتفظ إترا بـ<strong>40%</strong> مقابل التسويق والإدارة والتحصيل.</p>
                </td>
              </tr>
            </table>

            <!-- Term card 2: Payment -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4;border-radius:10px;border-right:4px solid #059669;margin-bottom:12px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#047857;">آلية الدفع</p>
                  <p style="margin:0;font-size:13px;color:#4b4469;line-height:1.6;">تتولى إترا استلام المبالغ من العملاء كاملاً، ويُحوَّل نصيبك فور اكتمال كل مرحلة متفق عليها.</p>
                </td>
              </tr>
            </table>

            <!-- Term card 3: Contract -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbeb;border-radius:10px;border-right:4px solid #d97706;margin-bottom:12px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#b45309;">العقد الرسمي</p>
                  <p style="margin:0;font-size:13px;color:#4b4469;line-height:1.6;">يُوقَّع عقد رسمي قبل بدء أي مشروع، يحدد نطاق العمل والمبلغ ومواعيد التسليم وحقوق كل طرف.</p>
                </td>
              </tr>
            </table>

            <!-- Term card 4: Obligations -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border-radius:10px;border-right:4px solid #64748b;margin-bottom:12px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#334155;">الالتزامات المهنية</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#4b4469;">
                    <tr><td style="padding:3px 0 3px 0;vertical-align:top;">·&nbsp;</td><td style="padding:3px 0;line-height:1.55;">الالتزام الكامل بمعايير جودة إترا في كل مشروع</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">·&nbsp;</td><td style="padding:3px 0;line-height:1.55;">عدم التواصل المالي المباشر مع العملاء خارج إطار إترا</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">·&nbsp;</td><td style="padding:3px 0;line-height:1.55;">الحفاظ على سرية معلومات العملاء والمشاريع</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">·&nbsp;</td><td style="padding:3px 0;line-height:1.55;">الالتزام بمواعيد التسليم المتفق عليها مسبقاً</td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Term card 5: ETRA services -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;border-radius:10px;border-right:4px solid #9E59CD;margin-bottom:32px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#9E59CD;">ما تقدمه إترا لك</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#4b4469;">
                    <tr><td style="padding:3px 0;vertical-align:top;">✦&nbsp;</td><td style="padding:3px 0;line-height:1.55;">التسويق واستقطاب العملاء المناسبين</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">✦&nbsp;</td><td style="padding:3px 0;line-height:1.55;">التفاوض وتحديد نطاق المشروع ومتطلباته</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">✦&nbsp;</td><td style="padding:3px 0;line-height:1.55;">إعداد العقود والشؤون القانونية كاملاً</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">✦&nbsp;</td><td style="padding:3px 0;line-height:1.55;">تحصيل المبالغ من العملاء والتعامل مع النزاعات</td></tr>
                    <tr><td style="padding:3px 0;vertical-align:top;">✦&nbsp;</td><td style="padding:3px 0;line-height:1.55;">إدارة التواصل مع العميل طوال مدة المشروع</td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- 4-step timeline -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#faf9ff 0%,#f5f3ff 100%);border-radius:12px;margin-bottom:32px;">
              <tr>
                <td style="padding:28px 28px 24px;">
                  <p style="margin:0 0 20px;font-size:16px;font-weight:700;color:#1a1236;text-align:center;">الخطوات القادمة</p>

                  <!-- Step 1 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:32px;height:32px;background:linear-gradient(135deg,#5234B7,#9E59CD);border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#fff;display:inline-block;">١</div>
                      </td>
                      <td style="padding-top:6px;font-size:14px;color:#333050;line-height:1.55;">مراجعة طلبك من قِبل فريق إترا خلال ٥ أيام عمل</td>
                    </tr>
                  </table>

                  <!-- Step 2 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:32px;height:32px;background:linear-gradient(135deg,#5234B7,#9E59CD);border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#fff;display:inline-block;">٢</div>
                      </td>
                      <td style="padding-top:6px;font-size:14px;color:#333050;line-height:1.55;">إرسال مهمة تقنية لتقييم مستواك المهني</td>
                    </tr>
                  </table>

                  <!-- Step 3 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:32px;height:32px;background:linear-gradient(135deg,#5234B7,#9E59CD);border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#fff;display:inline-block;">٣</div>
                      </td>
                      <td style="padding-top:6px;font-size:14px;color:#333050;line-height:1.55;">مقابلة تقنية مع أحد مراجعي إترا</td>
                    </tr>
                  </table>

                  <!-- Step 4 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="36" valign="top" style="padding-left:12px;">
                        <div style="width:32px;height:32px;background:linear-gradient(135deg,#5234B7,#9E59CD);border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#fff;display:inline-block;">٤</div>
                      </td>
                      <td style="padding-top:6px;font-size:14px;color:#333050;line-height:1.55;">إتمام إجراءات التعاقد الرسمي والانضمام إلى الشبكة</td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
              <tr>
                <td align="center">
                  <a href="https://etra-creators.vercel.app/track" style="display:inline-block;background:linear-gradient(135deg,#5234B7 0%,#9E59CD 100%);color:#ffffff;text-decoration:none;padding:15px 36px;border-radius:10px;font-weight:700;font-size:15px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(82,52,183,0.30);">متابعة حالة طلبي ←</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:#ede9fe;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#faf9ff;padding:24px 40px;text-align:center;">
            <img src="${ETRA_LOGO_URL}" alt="إترا" height="28" style="display:block;margin:0 auto 10px;height:28px;width:auto;opacity:0.7;" />
            <p style="margin:0 0 5px;font-size:13px;color:#6b7280;">إترا للتمكين التقني — تبوك، المملكة العربية السعودية</p>
            <p style="margin:0 0 5px;font-size:12px;color:#9ca3af;">هذا البريد أُرسل تلقائياً · للاستفسار: <a href="mailto:etrahub@gmail.com" style="color:#7c3aed;text-decoration:none;">etrahub@gmail.com</a></p>
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
