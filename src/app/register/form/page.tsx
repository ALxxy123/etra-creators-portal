'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { applicationSchema, type ApplicationFormData } from '@/lib/validations/application'
import { cities, specialtyLabels, levelLabels, experienceLabels } from '@/lib/utils'

const steps = [
  { id: 1, label: 'الحساب' },
  { id: 2, label: 'الأساسي' },
  { id: 3, label: 'الملف المهني' },
  { id: 4, label: 'التحرير' },
]

const specialtyIcons: Record<string, React.ReactNode> = {
  mobile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  uiux: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  frontend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10l-3 2 3 2M16 10l3 2-3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8l-2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  backend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  fullstack: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 21h8M12 16v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 9l3 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export default function FormPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(3)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      criteria_acknowledged: {
        experience_3y: true,
        real_projects: true,
        portfolio_5: true,
        documented: true,
        mid_or_senior: true,
        deadline_commitment: true,
        etra_quality: true,
        contract_ready: true,
      },
      terms_acknowledged: true,
    },
  })

  const watchedSpecialty = useWatch({ control, name: 'specialty' })
  const watchedBio = useWatch({ control, name: 'bio' })

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('يُقبل فقط ملفات PDF')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الملف يجب ألا يتجاوز 5MB')
      return
    }
    setCvFile(file)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const onSubmit = async (data: ApplicationFormData) => {
    setSubmitting(true)
    try {
      let cvPath = ''
      if (cvFile) {
        const formData = new FormData()
        formData.append('cv', cvFile)
        const uploadRes = await fetch('/api/upload-cv', { method: 'POST', body: formData })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error || 'فشل رفع الملف')
        cvPath = uploadData.path
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, cv_file_path: cvPath || null }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'فشل إرسال الطلب')

      sessionStorage.setItem('tracking_code', result.tracking_code)
      sessionStorage.setItem('applicant_name', data.full_name)
      router.push('/register/success')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الطلب')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl text-sm'
  const labelClass = 'block text-xs font-semibold mb-2'

  return (
    <div>
      {/* Custom header with close button */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => router.push('/register/terms')}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/5"
          style={{ border: '1px solid rgba(176,168,212,0.25)' }}
          aria-label="إغلاق"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#B0A8D4" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black" style={{ color: '#fff' }}>إكمال ملف المبدع</h1>
          <p className="text-xs mt-1" style={{ color: '#B0A8D4' }}>
            المرحلة {activeStep} من {steps.length} · أكمل بياناتك لمراجعة طلبك
          </p>
        </div>
      </div>

      {/* Horizontal stepper */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
          border: '1px solid rgba(82,52,183,0.2)',
        }}
      >
        <div className="flex items-center justify-between relative">
          <div
            className="absolute h-0.5 left-[6%] right-[6%]"
            style={{ background: 'rgba(82,52,183,0.2)', top: '18px' }}
          />
          <motion.div
            className="absolute h-0.5 left-[6%]"
            style={{
              background: 'linear-gradient(90deg, #5234B7 0%, #9E59CD 100%)',
              top: '18px',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${((activeStep - 1) / (steps.length - 1)) * 88}%` }}
            transition={{ duration: 0.5 }}
          />
          {steps.map((s) => {
            const done = s.id < activeStep
            const active = s.id === activeStep
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className="flex flex-col items-center gap-2 relative z-10"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    background:
                      done || active
                        ? 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)'
                        : 'rgba(18,18,42,0.9)',
                    border: done || active ? 'none' : '1px solid rgba(82,52,183,0.3)',
                    color: done || active ? '#fff' : '#6B6490',
                    boxShadow: active ? '0 0 20px rgba(82,52,183,0.6)' : 'none',
                  }}
                >
                  {done ? (
                    <svg width="12" height="10" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: active ? '#fff' : '#6B6490' }}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Personal & contact (always visible as account + basic fields) */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(82,52,183,0.2)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#9E59CD" strokeWidth="1.6" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-sm" style={{ color: '#fff' }}>البيانات الأساسية</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>معلومات التواصل والحساب</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>الاسم الكامل *</label>
              <input {...register('full_name')} className={inputClass} placeholder="محمد عبدالله الأحمد" />
              {errors.full_name && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.full_name.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>البريد الإلكتروني *</label>
              <input {...register('email')} type="email" className={inputClass} placeholder="email@example.com" dir="ltr" />
              {errors.email && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>رقم الجوال *</label>
              <input {...register('phone')} className={inputClass} placeholder="05xxxxxxxx" dir="ltr" />
              {errors.phone && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.phone.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>المدينة *</label>
              <select {...register('city')} className={inputClass}>
                <option value="">اختر مدينتك</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.city.message}</p>}
            </div>
          </div>
        </motion.section>

        {/* Specialty sub-card */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(82,52,183,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8 6L2 12L8 18M16 6L22 12L16 18" stroke="#9E59CD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-sm" style={{ color: '#fff' }}>التخصص التقني</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>اختر المجال الذي تتقنه</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
            {Object.entries(specialtyLabels).map(([val, label]) => {
              const selected = watchedSpecialty === val
              return (
                <motion.button
                  type="button"
                  key={val}
                  onClick={() => setValue('specialty', val as 'mobile' | 'uiux' | 'frontend' | 'backend' | 'fullstack')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl text-center transition-all flex flex-col items-center gap-2"
                  style={{
                    background: selected ? 'rgba(82,52,183,0.25)' : 'rgba(13,13,26,0.5)',
                    border: selected ? '1px solid rgba(82,52,183,0.6)' : '1px solid rgba(82,52,183,0.15)',
                    boxShadow: selected ? '0 0 20px rgba(82,52,183,0.25)' : 'none',
                    color: selected ? '#fff' : '#9E59CD',
                  }}
                >
                  {specialtyIcons[val]}
                  <div className="text-xs font-semibold" style={{ color: selected ? '#fff' : '#B0A8D4' }}>
                    {label}
                  </div>
                </motion.button>
              )
            })}
          </div>
          {errors.specialty && <p className="text-xs mb-3" style={{ color: '#F87171' }}>{errors.specialty.message}</p>}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>المستوى المهني *</label>
              <select {...register('level')} className={inputClass}>
                <option value="">اختر مستواك</option>
                {Object.entries(levelLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              {errors.level && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.level.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>سنوات الخبرة *</label>
              <select {...register('years_of_experience')} className={inputClass}>
                <option value="">اختر سنوات الخبرة</option>
                {Object.entries(experienceLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              {errors.years_of_experience && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.years_of_experience.message}</p>}
            </div>
          </div>
        </motion.section>

        {/* Links & portfolio sub-card */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(82,52,183,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-sm" style={{ color: '#fff' }}>الروابط والمعرض</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>أضف روابط أعمالك وسيرتك الذاتية</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>رابط LinkedIn أو GitHub *</label>
              <input {...register('linkedin_or_github_url')} className={inputClass} placeholder="https://linkedin.com/in/..." dir="ltr" />
              {errors.linkedin_or_github_url && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.linkedin_or_github_url.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={{ color: '#B0A8D4' }}>رابط معرض الأعمال</label>
              <input {...register('portfolio_url')} className={inputClass} placeholder="https://portfolio.example.com" dir="ltr" />
              {errors.portfolio_url && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.portfolio_url.message}</p>}
            </div>
          </div>

          <label className={labelClass} style={{ color: '#B0A8D4' }}>السيرة الذاتية (PDF)</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('cv-input')?.click()}
            className="rounded-2xl p-8 text-center cursor-pointer transition-all"
            style={{
              background: dragOver ? 'rgba(82,52,183,0.15)' : 'rgba(13,13,26,0.5)',
              border: dragOver ? '2px dashed rgba(82,52,183,0.8)' : '2px dashed rgba(82,52,183,0.25)',
            }}
          >
            <div className="flex justify-center mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(82,52,183,0.2)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v13M12 3l-4 4M12 3l4 4" stroke="#9E59CD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="#9E59CD" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {cvFile ? (
              <div>
                <p className="font-semibold text-sm" style={{ color: '#34D399' }}>{cvFile.name}</p>
                <p className="text-xs mt-1" style={{ color: '#6B6490' }}>
                  {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#B0A8D4' }}>اسحب وأفلت الملف هنا</p>
                <p className="text-xs" style={{ color: '#6B6490' }}>أو انقر للاختيار · PDF فقط · حد أقصى 5MB</p>
              </div>
            )}
            <input
              id="cv-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        </motion.section>

        {/* Bio sub-card */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(82,52,183,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16M4 12h16M4 19h10" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-sm" style={{ color: '#fff' }}>نبذة مختصرة</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>عرّفنا بنفسك وما يميزك</p>
            </div>
          </div>

          <textarea
            {...register('bio')}
            rows={4}
            maxLength={300}
            className="w-full px-4 py-3 rounded-xl text-sm"
            placeholder="أخبرنا عن نفسك، شغفك، وما يميزك في مجالك..."
          />
          <p className="text-xs text-left mt-1" style={{ color: '#6B6490' }}>
            {(watchedBio || '').length}/300
          </p>
        </motion.section>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={() => router.push('/register/terms')}
            className="px-6 py-3 text-sm font-semibold rounded-full transition-all hover:bg-white/5"
            style={{ color: '#B0A8D4', border: '1px solid rgba(176,168,212,0.2)' }}
          >
            رجوع
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="gradient-btn px-8 py-3 text-white font-bold text-sm inline-flex items-center gap-2 transition-all"
            style={{
              borderRadius: '999px',
              boxShadow: '0 0 28px rgba(82,52,183,0.4)',
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
