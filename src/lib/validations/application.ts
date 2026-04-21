import { z } from 'zod'

export const applicationSchema = z.object({
  full_name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل').max(100),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().regex(/^05\d{8}$/, 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام'),
  city: z.string().min(2, 'يرجى اختيار المدينة').max(50),
  specialty: z.enum(['mobile', 'uiux', 'frontend', 'backend', 'fullstack'] as const),
  level: z.enum(['mid', 'senior'] as const),
  years_of_experience: z.enum(['3-4', '5-7', '8-10', '10+'] as const),
  linkedin_or_github_url: z.string().url('يرجى إدخال رابط صحيح'),
  portfolio_url: z.string().url('يرجى إدخال رابط صحيح').optional().or(z.literal('')),
  bio: z.string().max(300, 'النبذة يجب ألا تتجاوز 300 حرف').optional().or(z.literal('')),
  criteria_acknowledged: z.object({
    experience_3y: z.literal(true),
    real_projects: z.literal(true),
    portfolio_5: z.literal(true),
    documented: z.literal(true),
    mid_or_senior: z.literal(true),
    deadline_commitment: z.literal(true),
    etra_quality: z.literal(true),
    contract_ready: z.literal(true),
  }),
  terms_acknowledged: z.literal(true),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
