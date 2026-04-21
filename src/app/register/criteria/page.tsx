'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProgressBar } from '@/components/registration/progress-bar'

type CriterionId = 'experience' | 'portfolio' | 'specialties' | 'commitment'

const specialties = [
  { id: 'mobile', label: 'تطبيقات الجوال' },
  { id: 'uiux', label: 'تصميم UI/UX' },
  { id: 'frontend', label: 'تطوير الواجهات الأمامية' },
  { id: 'backend', label: 'تطوير الخوادم والـ Backend' },
  { id: 'fullstack', label: 'تطوير Full Stack' },
]

function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.5" stroke="#9E59CD" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.5" stroke="#9E59CD" strokeWidth="1.6" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 19c0-2 2-4 4-4s3 1.5 3 4" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="#9E59CD" strokeWidth="1.6" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8 6L2 12L8 18M16 6L22 12L16 18" stroke="#9E59CD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2.6 5.8 6.4.7-4.8 4.4 1.3 6.3L12 17l-5.5 3.2 1.3-6.3L3 9.5l6.4-.7L12 3Z" stroke="#9E59CD" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export default function CriteriaPage() {
  const router = useRouter()
  const [checked, setChecked] = useState<Record<CriterionId, boolean>>({
    experience: false,
    portfolio: false,
    specialties: false,
    commitment: false,
  })
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])

  const allChecked = Object.values(checked).every(Boolean)

  const toggleCriterion = (id: CriterionId) =>
    setChecked((p) => ({ ...p, [id]: !p[id] }))

  const toggleSpec = (id: string) =>
    setSelectedSpecs((p) => (p.includes(id) ? p.filter((s) => s !== id) : [...p, id]))

  const handleContinue = () => {
    if (!allChecked) return
    sessionStorage.setItem(
      'criteria_acknowledged',
      JSON.stringify({ ...checked, specialties: selectedSpecs }),
    )
    router.push('/register/terms')
  }

  return (
    <div>
      <ProgressBar currentStep={1} />

      {/* Warning banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 px-5 py-4 rounded-2xl flex items-center gap-3"
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.35)',
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(239,68,68,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 12H1L7 1Z" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7 6V8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="10" r="0.6" fill="#EF4444" />
          </svg>
        </div>
        <div className="flex-1 text-right">
          <div className="text-sm font-bold mb-0.5" style={{ color: '#F87171' }}>
            تنبيه هام
          </div>
          <div className="text-xs" style={{ color: '#FCA5A5' }}>
            يرجى الموافقة على جميع المعايير الأساسية للاستمرار في عملية التسجيل
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
        {/* Step label */}
        <div className="pt-2 hidden md:block">
          <div
            className="text-xs font-bold tracking-[0.3em]"
            style={{ color: '#6B6490', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            01 STEP
          </div>
        </div>

        <div className="space-y-4">
          {/* Card 1 — Experience */}
          <CriterionCard
            icon={<PeopleIcon />}
            title="الخبرة المهنية"
            subtitle="سنوات من العمل الفعلي في المشاريع التقنية"
            checked={checked.experience}
            onToggle={() => toggleCriterion('experience')}
            checkLabel="أؤكد استيفاء هذا المعيار"
          >
            <p className="text-sm leading-relaxed" style={{ color: '#B0A8D4' }}>
              خبرة لا تقل عن 3 سنوات في مجال التطوير أو التصميم التقني، مع القدرة على تقديم مشاريع حقيقية منجزة لعملاء أو منظمات فعلية.
            </p>
          </CriterionCard>

          {/* Card 2 — Portfolio */}
          <CriterionCard
            icon={<FolderIcon />}
            title="معرض الأعمال"
            subtitle="توثيق المشاريع السابقة بشكل احترافي"
            checked={checked.portfolio}
            onToggle={() => toggleCriterion('portfolio')}
            checkLabel="أؤكد استيفاء هذا المعيار"
          >
            <p className="text-sm leading-relaxed" style={{ color: '#B0A8D4' }}>
              معرض أعمال (Portfolio) يضم 5 مشاريع أو أكثر، موثّقة بروابط أو ملفات قابلة للمراجعة والتحقق من قِبل فريق إترا.
            </p>
          </CriterionCard>

          {/* Card 3 — Specialties */}
          <CriterionCard
            icon={<CodeIcon />}
            title="التخصصات التقنية المدعومة"
            subtitle="اختر التخصصات التي تمتلك خبرة فيها"
            checked={checked.specialties}
            onToggle={() => toggleCriterion('specialties')}
            checkLabel="أؤكد امتلاكي الخبرة في التخصص المختار"
          >
            <div className="flex flex-wrap gap-2.5">
              {specialties.map((s) => {
                const active = selectedSpecs.includes(s.id)
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSpec(s.id)}
                    className="px-4 py-2 text-xs font-semibold rounded-full transition-all"
                    style={{
                      background: active
                        ? 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)'
                        : 'rgba(18,18,42,0.6)',
                      border: active
                        ? '1px solid transparent'
                        : '1px solid rgba(82,52,183,0.35)',
                      color: active ? '#fff' : '#B0A8D4',
                      boxShadow: active ? '0 0 16px rgba(82,52,183,0.4)' : 'none',
                    }}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </CriterionCard>

          {/* Card 4 — Commitment */}
          <CriterionCard
            icon={<StarIcon />}
            title="الالتزام المهني والجودة"
            subtitle="التزام تام بالمواعيد والمعايير"
            checked={checked.commitment}
            onToggle={() => toggleCriterion('commitment')}
            checkLabel="أوافق وأتعهد بذلك"
          >
            <p className="text-sm leading-relaxed" style={{ color: '#B0A8D4' }}>
              الالتزام بالمواعيد النهائية، والإبلاغ المبكر عن أي عوائق، والخضوع لمعايير جودة إترا مع تقديم أفضل مستوى ممكن في كل مشروع.
            </p>
          </CriterionCard>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 text-sm font-semibold rounded-full transition-all hover:bg-white/5"
          style={{ color: '#B0A8D4', border: '1px solid rgba(176,168,212,0.2)' }}
        >
          رجوع
        </button>
        <button
          onClick={handleContinue}
          disabled={!allChecked}
          className="gradient-btn px-7 py-3 text-white font-bold text-sm inline-flex items-center gap-2 transition-all"
          style={{
            borderRadius: '999px',
            opacity: allChecked ? 1 : 0.4,
            cursor: allChecked ? 'pointer' : 'not-allowed',
            boxShadow: allChecked ? '0 0 28px rgba(82,52,183,0.4)' : 'none',
          }}
        >
          المتابعة إلى شروط العمل
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function CriterionCard({
  icon,
  title,
  subtitle,
  checked,
  onToggle,
  checkLabel,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  checked: boolean
  onToggle: () => void
  checkLabel: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6"
      style={{
        background:
          'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
        border: checked ? '1px solid rgba(82,52,183,0.5)' : '1px solid rgba(82,52,183,0.18)',
        boxShadow: checked ? 'inset 0 0 40px rgba(82,52,183,0.08)' : 'none',
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(82,52,183,0.15)',
            border: '1px solid rgba(82,52,183,0.3)',
          }}
        >
          {icon}
        </div>
        <div className="flex-1 text-right">
          <h3 className="font-bold text-base mb-1" style={{ color: '#fff' }}>
            {title}
          </h3>
          <p className="text-xs" style={{ color: '#6B6490' }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mb-4">{children}</div>

      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
        style={{
          background: checked ? 'rgba(82,52,183,0.15)' : 'rgba(13,13,26,0.5)',
          border: checked ? '1px solid rgba(82,52,183,0.4)' : '1px solid rgba(82,52,183,0.15)',
        }}
      >
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
          style={{
            background: checked
              ? 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)'
              : 'transparent',
            border: checked ? 'none' : '1.5px solid rgba(82,52,183,0.5)',
            boxShadow: checked ? '0 0 10px rgba(82,52,183,0.5)' : 'none',
          }}
        >
          {checked && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-sm font-semibold flex-1 text-right" style={{ color: checked ? '#fff' : '#B0A8D4' }}>
          {checkLabel}
        </span>
      </button>
    </motion.div>
  )
}
