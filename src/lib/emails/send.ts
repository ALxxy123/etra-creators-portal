import { transporter } from './transporter'
import { applicationReceivedTemplate } from './templates/application-received'
import { applicationAcceptedTemplate } from './templates/application-accepted'
import { applicationRejectedTemplate } from './templates/application-rejected'
import { newApplicationAdminTemplate } from './templates/new-application-admin'
import { contractCopyTemplate } from './templates/contract-copy'
import { taskAssignedTemplate } from './templates/task-assigned'
import { taskReminderTemplate } from './templates/task-reminder'
import { createAdminClient } from '@/lib/supabase/admin'
import { etraLogoAttachment } from './logo'
import { CONTRACT_ARTICLES, CONTRACT_VERSION } from '@/lib/contract'
import type { ContractSnapshot } from '@/types/database'

const GMAIL_USER = process.env.GMAIL_USER!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'etrahub@gmail.com'

const specialtyLabels: Record<string, string> = {
  web: 'تطوير الويب',
  mobile: 'تطبيقات الجوال',
  uiux: 'تصميم UI/UX',
  fullstack: 'تطوير Full Stack',
}

const levelLabels: Record<string, string> = {
  mid: 'Mid — متوسط',
  senior: 'Senior — متقدم',
}

type TaskRequirement = { order?: number; text: string }
type TaskDeliverable = { icon?: string; text: string }
type TaskEvaluationCriterion = { percentage: number; label: string }

function formatTaskDeadline(dateStr: string) {
  return new Date(dateStr).toLocaleString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Riyadh',
  })
}

function orderedRequirements(items: TaskRequirement[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
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
      attachments: [etraLogoAttachment],
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
      attachments: [etraLogoAttachment],
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

// ─── EMAIL: To applicant when rejected ──────────────────────────────────────
export async function sendApplicationRejectedEmail(
  application: {
    id: string
    full_name: string
    email: string
    tracking_code: string
    specialty: string
    level: string
  },
  reason: string | null
) {
  try {
    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${GMAIL_USER}>`,
      to: application.email,
      subject: `تحديث بخصوص طلبك في إترا — ${application.tracking_code}`,
      attachments: [etraLogoAttachment],
      html: applicationRejectedTemplate({
        applicantName: application.full_name,
        trackingCode: application.tracking_code,
        specialty: specialtyLabels[application.specialty] || application.specialty,
        level: levelLabels[application.level] || application.level,
        reason: reason && reason.trim().length > 0 ? reason.trim() : null,
      }),
    })

    await logEmailNotification({
      applicationId: application.id,
      type: 'application_rejected',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'sent',
    })

  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'application_rejected',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'failed',
      errorMessage: String(error),
    })
    throw error
  }
}

// ─── EMAIL: Assessment task assigned to applicant ──────────────────────────
export async function sendTaskAssignedEmail(
  application: {
    id: string
    full_name: string
    email: string
    tracking_code: string
    specialty: string
    level: string
  },
  task: {
    title: string
    title_ar: string
    subtitle_ar: string | null
    context_ar: string
    requirements_mid: TaskRequirement[]
    requirements_senior: TaskRequirement[]
    deliverables: TaskDeliverable[]
    evaluation_criteria: TaskEvaluationCriterion[]
  },
  assignment: {
    deadline_hours: number
    deadline_at: string
  }
) {
  const requirements = application.level === 'senior'
    ? [
        ...orderedRequirements(task.requirements_mid),
        ...orderedRequirements(task.requirements_senior),
      ]
    : orderedRequirements(task.requirements_mid)

  try {
    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${GMAIL_USER}>`,
      to: application.email,
      subject: `مهمة التقييم الخاصة بك في إترا — ${application.tracking_code}`,
      attachments: [etraLogoAttachment],
      html: taskAssignedTemplate({
        applicantName: application.full_name,
        trackingCode: application.tracking_code,
        specialty: specialtyLabels[application.specialty] || application.specialty,
        level: levelLabels[application.level] || application.level,
        taskTitle: task.title_ar,
        taskTitleEn: task.title,
        taskSubtitle: task.subtitle_ar,
        taskContext: task.context_ar,
        deadlineHours: assignment.deadline_hours,
        deadlineAt: formatTaskDeadline(assignment.deadline_at),
        requirements,
        deliverables: task.deliverables,
        evaluationCriteria: task.evaluation_criteria,
      }),
    })

    await logEmailNotification({
      applicationId: application.id,
      type: 'task_assigned',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'sent',
    })
  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'task_assigned',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'failed',
      errorMessage: String(error),
    })
    throw error
  }
}

// ─── EMAIL: Assessment task reminder to applicant ─────────────────────────
export async function sendTaskReminderEmail(
  application: {
    id: string
    full_name: string
    email: string
    tracking_code: string
    specialty: string
    level: string
  },
  task: {
    title_ar: string
  },
  assignment: {
    deadline_hours: number
    deadline_at: string
  }
) {
  try {
    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${GMAIL_USER}>`,
      to: application.email,
      subject: `تذكير بتسليم مهمة التقييم — ${application.tracking_code}`,
      attachments: [etraLogoAttachment],
      html: taskReminderTemplate({
        applicantName: application.full_name,
        trackingCode: application.tracking_code,
        specialty: specialtyLabels[application.specialty] || application.specialty,
        level: levelLabels[application.level] || application.level,
        taskTitle: task.title_ar,
        deadlineHours: assignment.deadline_hours,
        deadlineAt: formatTaskDeadline(assignment.deadline_at),
      }),
    })

    await logEmailNotification({
      applicationId: application.id,
      type: 'task_reminder',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'sent',
    })
  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'task_reminder',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'failed',
      errorMessage: String(error),
    })
    throw error
  }
}

// ─── EMAIL: Signed contract copy to applicant ───────────────────────────────
export async function sendContractCopyEmail(application: {
  id: string
  full_name: string
  email: string
  tracking_code: string
  contract_version: string | null
  contract_accepted_at: string | null
  contract_acceptance_ip: string | null
  contract_snapshot: ContractSnapshot | null
}) {
  const version = application.contract_version ?? CONTRACT_VERSION
  const acceptedAtIso = application.contract_accepted_at ?? new Date().toISOString()
  const acceptedAt = new Date(acceptedAtIso).toLocaleString('ar-SA', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
  const articles = application.contract_snapshot?.articles ?? CONTRACT_ARTICLES

  try {
    await transporter.sendMail({
      from: `"إترا للتمكين التقني" <${GMAIL_USER}>`,
      to: application.email,
      subject: `📄 نسخة عقدك مع إترا — ${application.tracking_code}`,
      attachments: [etraLogoAttachment],
      html: contractCopyTemplate({
        applicantName: application.full_name,
        trackingCode: application.tracking_code,
        contractVersion: version,
        acceptedAt,
        acceptanceIp: application.contract_acceptance_ip,
        articles,
      }),
    })

    await logEmailNotification({
      applicationId: application.id,
      type: 'contract_copy',
      recipientEmail: application.email,
      recipientName: application.full_name,
      status: 'sent',
    })
  } catch (error) {
    await logEmailNotification({
      applicationId: application.id,
      type: 'contract_copy',
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
      attachments: [etraLogoAttachment],
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
  const { error } = await supabase.from('email_notifications').insert({
    application_id: data.applicationId,
    notification_type: data.type,
    recipient_email: data.recipientEmail,
    recipient_name: data.recipientName,
    status: data.status,
    sent_at: data.status === 'sent' ? new Date().toISOString() : null,
    error_message: data.errorMessage ?? null,
  })

  if (error) {
    console.error('Failed to log email notification:', {
      applicationId: data.applicationId,
      type: data.type,
      status: data.status,
      error: error.message,
    })
  }
}
