export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ApplicationStatus = 'new' | 'under_review' | 'accepted' | 'rejected'
export type Specialty = 'web' | 'mobile' | 'uiux' | 'fullstack'
export type Level = 'mid' | 'senior'
export type YearsOfExperience = '1-2' | '3-4' | '5-7' | '8-10' | '10+'
export type PlatformSettingKey = 'allow_registrations' | 'email_notifications'

export interface CriteriaAcknowledged {
  experience_1y: boolean
  real_projects: boolean
  portfolio_5: boolean
  documented: boolean
  mid_or_senior: boolean
  deadline_commitment: boolean
  etra_quality: boolean
  contract_ready: boolean
}

export interface CreatorApplication {
  id: string
  tracking_code: string
  full_name: string
  email: string
  phone: string
  city: string
  specialty: Specialty
  level: Level
  years_of_experience: YearsOfExperience
  linkedin_or_github_url: string
  portfolio_url: string | null
  cv_file_path: string | null
  bio: string | null
  criteria_acknowledged: CriteriaAcknowledged
  terms_acknowledged: boolean
  terms_acknowledged_at: string | null
  contract_version: string | null
  contract_accepted_at: string | null
  contract_acceptance_ip: string | null
  contract_acceptance_user_agent: string | null
  contract_snapshot: ContractSnapshot | null
  contract_sent_at: string | null
  status: ApplicationStatus
  created_at: string
  updated_at: string
}

export interface ContractSnapshotArticle {
  number: string
  title: string
  body: string
}

export interface ContractSnapshot {
  version: string
  accepted_at: string
  articles: ContractSnapshotArticle[]
}

export interface ApplicationStatusHistory {
  id: string
  application_id: string
  previous_status: ApplicationStatus | null
  new_status: ApplicationStatus
  changed_by: string | null
  change_reason: string | null
  changed_at: string
}

export interface ApplicationNote {
  id: string
  application_id: string
  note_text: string
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface PlatformSetting {
  key: PlatformSettingKey
  value: boolean
  updated_at: string
}

export interface ApplicationStats {
  total: number
  new: number
  under_review: number
  accepted: number
  rejected: number
}

export interface EmailNotification {
  id: string
  application_id: string
  notification_type: string
  recipient_email: string
  recipient_name: string
  status: 'sent' | 'failed'
  sent_at: string | null
  error_message: string | null
  created_at: string
}

export type SubmissionStatus = 'pending' | 'submitted' | 'late' | 'reviewed'
export type DeadlineHours = 24 | 48 | 72

export interface TaskRequirement {
  order: number
  text: string
}

export interface TaskDeliverable {
  icon: string
  text: string
}

export interface TaskEvaluationCriterion {
  percentage: number
  label: string
}

export interface AssessmentTask {
  id: string
  specialty: Specialty
  title: string
  title_ar: string
  subtitle: string | null
  subtitle_ar: string | null
  context_ar: string
  requirements_mid: TaskRequirement[]
  requirements_senior: TaskRequirement[]
  deliverables: TaskDeliverable[]
  evaluation_criteria: TaskEvaluationCriterion[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ApplicationTask {
  id: string
  application_id: string
  task_id: string
  sent_by: string | null
  deadline_hours: DeadlineHours
  deadline_at: string
  submission_link: string | null
  submission_notes: string | null
  submission_status: SubmissionStatus
  submitted_at: string | null
  admin_score: number | null
  admin_feedback: string | null
  sent_at: string
  created_at: string
  updated_at: string
}

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: '12'
  }
  public: {
    Tables: {
      creator_applications: {
        Row: CreatorApplication
        Insert: Omit<CreatorApplication, 'id' | 'tracking_code' | 'created_at' | 'updated_at'> & { status?: ApplicationStatus }
        Update: Partial<Omit<CreatorApplication, 'id' | 'tracking_code' | 'created_at'>>
        Relationships: []
      }
      application_status_history: {
        Row: ApplicationStatusHistory
        Insert: Omit<ApplicationStatusHistory, 'id' | 'changed_at'>
        Update: never
        Relationships: []
      }
      application_notes: {
        Row: ApplicationNote
        Insert: Omit<ApplicationNote, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Pick<ApplicationNote, 'note_text'>>
        Relationships: []
      }
      platform_settings: {
        Row: PlatformSetting
        Insert: Omit<PlatformSetting, 'updated_at'> & { updated_at?: string }
        Update: Partial<Pick<PlatformSetting, 'value' | 'updated_at'>>
        Relationships: []
      }
      email_notifications: {
        Row: EmailNotification
        Insert: Omit<EmailNotification, 'id' | 'created_at'>
        Update: Partial<Pick<EmailNotification, 'status' | 'error_message'>>
        Relationships: []
      }
      assessment_tasks: {
        Row: AssessmentTask
        Insert: Omit<AssessmentTask, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AssessmentTask, 'id' | 'created_at'>>
        Relationships: []
      }
      application_tasks: {
        Row: ApplicationTask
        Insert: Omit<ApplicationTask, 'id' | 'sent_at' | 'created_at' | 'updated_at'> & { sent_at?: string }
        Update: Partial<
          Pick<
            ApplicationTask,
            | 'submission_link'
            | 'submission_notes'
            | 'submission_status'
            | 'submitted_at'
            | 'admin_score'
            | 'admin_feedback'
            | 'updated_at'
          >
        >
        Relationships: []
      }
    }
    Views: {
      application_stats: {
        Row: ApplicationStats
        Relationships: []
      }
    }
    Functions: {
      check_application_status: {
        Args: { tracking_code: string }
        Returns: {
          tracking_code: string
          full_name: string
          specialty: Specialty
          status: ApplicationStatus
          submission_date: string
        }[]
      }
      generate_tracking_code: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
