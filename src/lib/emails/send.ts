import { transporter } from './transporter'
import { applicationReceivedTemplate } from './templates/application-received'
import { applicationAcceptedTemplate } from './templates/application-accepted'
import { newApplicationAdminTemplate } from './templates/new-application-admin'
import { createAdminClient } from '@/lib/supabase/admin'

const GMAIL_USER = process.env.GMAIL_USER!
const ADMIN_EMAIL = 'etrahub@gmail.com'

const specialtyLabels: Record<string, string> = {
  mobile: 'تطبيقات الجوال',
  uiux: 'تصميم UI/UX',
  frontend: 'تطوير الواجهات الأمامية',
  backend: 'تطوير الخوادم والـ Backend',
  fullstack: 'تطوير Full Stack',
}

const levelLabels: Record<string, string> = {
  mid: 'Mid — متوسط',
  senior: 'Senior — متقدم',
}

// ─── EMAIL 1: To applicant after registration ───────────────────────────────
export async function sendApplicationReceivedEmail(application: {
  id: string
  full_name: string
  email: string
  tracking_code: string
  specialty: string
  level: string
  created_at: string
}) {
  const submissionDate = new Date(application.created_at).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  try {
    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${GMAIL_USER}>`,
      to: application.email,
      subject: `✅ تم استلام طلبك — رمز التتبع: ${application.tracking_code}`,
      html: applicationReceivedTemplate({
        applicantName: application.full_name,
        trackingCode: application.tracking_code,
        specialty: specialtyLabels[application.specialty] || application.specialty,
        level: levelLabels[application.level] || application.level,
        submissionDate,
      }),
    })

    // Log success to Supabase
    await logEmailNotification({
      applicationId: application.id,
      type: 'application_received',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'sent',
    })

  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'application_received',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'failed',
      errorMessage: String(error),
    })
    throw error
  }
}

// ─── EMAIL 2: To applicant when accepted ────────────────────────────────────
export async function sendApplicationAcceptedEmail(application: {
  id: string
  full_name: string
  email: string
  tracking_code: string
  specialty: string
  level: string
}) {
  try {
    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${GMAIL_USER}>`,
      to: application.email,
      subject: `🎉 مبارك! تم قبولك في شبكة مبدعي إترا`,
      html: applicationAcceptedTemplate({
        applicantName: application.full_name,
        trackingCode: application.tracking_code,
        specialty: specialtyLabels[application.specialty] || application.specialty,
        level: levelLabels[application.level] || application.level,
      }),
    })

    await logEmailNotification({
      applicationId: application.id,
      type: 'application_accepted',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'sent',
    })

  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'application_accepted',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'failed',
      errorMessage: String(error),
    })
    throw error
  }
}

// ─── EMAIL 3: To ETRA admin on every new registration ───────────────────────
export async function sendNewApplicationAdminAlert(
  application: {
    id: string
    full_name: string
    email: string
    phone: string
    city: string
    specialty: string
    level: string
    years_of_experience: string
    linkedin_or_github_url: string
    portfolio_url?: string | null
    bio?: string | null
    tracking_code: string
    created_at: string
  },
  totalCount: number
) {
  const submissionDate = new Date(application.created_at).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  try {
    await transporter.sendMail({
      from: `"بوابة مبدعي إترا" <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🔔 متقدم جديد: ${application.full_name} — ${specialtyLabels[application.specialty] || application.specialty}`,
      html: newApplicationAdminTemplate({
        applicantName: application.full_name,
        applicantEmail: application.email,
        applicantPhone: application.phone,
        applicantCity: application.city,
        specialty: specialtyLabels[application.specialty] || application.specialty,
        level: levelLabels[application.level] || application.level,
        yearsOfExperience: application.years_of_experience,
        linkedinOrGithub: application.linkedin_or_github_url,
        portfolio: application.portfolio_url ?? undefined,
        bio: application.bio ?? undefined,
        trackingCode: application.tracking_code,
        submissionDate,
        totalCount,
      }),
    })

    await logEmailNotification({
      applicationId: application.id,
      type: 'new_application_admin',
      recipientEmail: ADMIN_EMAIL,
      recipientName: 'فريق إترا',
      status: 'sent',
    })

  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'new_application_admin',
      recipientEmail: ADMIN_EMAIL,
      recipientName: 'فريق إترا',
      status: 'failed',
      errorMessage: String(error),
    })
    throw error
  }
}

// ─── HELPER: Log email to Supabase ──────────────────────────────────────────
async function logEmailNotification(data: {
  applicationId: string
  type: string
  recipientEmail: string
  recipientName: string
  status: 'sent' | 'failed'
  errorMessage?: string
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any
  await supabase.from('email_notifications').insert({
    application_id: data.applicationId,
    notification_type: data.type,
    recipient_email: data.recipientEmail,
    recipient_name: data.recipientName,
    status: data.status,
    sent_at: data.status === 'sent' ? new Date().toISOString() : null,
    error_message: data.errorMessage ?? null,
  })
}
