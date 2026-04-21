export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ApplicationStatus = 'new' | 'under_review' | 'accepted' | 'rejected'
export type Specialty = 'mobile' | 'uiux' | 'frontend' | 'backend' | 'fullstack'
export type Level = 'mid' | 'senior'
export type YearsOfExperience = '3-4' | '5-7' | '8-10' | '10+'
export type AdminRole = 'admin' | 'reviewer'

export interface CriteriaAcknowledged {
  experience_3y: boolean
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
  status: ApplicationStatus
  created_at: string
  updated_at: string
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

export interface AdminUser {
  user_id: string
  role: AdminRole
  created_at: string
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
      admin_users: {
        Row: AdminUser
        Insert: Omit<AdminUser, 'created_at'>
        Update: never
        Relationships: []
      }
      email_notifications: {
        Row: EmailNotification
        Insert: Omit<EmailNotification, 'id' | 'created_at'>
        Update: Partial<Pick<EmailNotification, 'status' | 'error_message'>>
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
