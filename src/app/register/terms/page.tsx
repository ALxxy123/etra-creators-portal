'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProgressBar } from '@/components/registration/progress-bar'

type ProjectTab = 'web' | 'mobile' | 'uiux'

const projectTypes: Record<ProjectTab, { label: string; bars: { label: string; pct: number; color: string }[] }> = {
  web: {
    label: 'مشروع ويب',
    bars: [
      { label: 'UI/UX & Prototype',        pct: 15, color: '#9E59CD' },
      { label: 'تطوير الواجهة الأمامية',   pct: 25, color: '#5234B7' },
      { label: 'تطوير الخوادم والـ API',    pct: 35, color: '#7B5AC7' },
      { label: 'قاعدة البيانات',             pct: 10, color: '#8B6DD4' },
      { label: 'Testing & Deployment',      pct: 15, color: '#6B4FC8' },
    ],
  },
  mobile: {
    label: 'تطبيق جوال',
    bars: [
      { label: 'تصميم الشاشات UI',          pct: 15, color: '#9E59CD' },
      { label: 'تطوير التطبيق',              pct: 40, color: '#5234B7' },
      { label: 'Backend & API',             pct: 30, color: '#7B5AC7' },
      { label: 'Testing & Publishing',      pct: 15, color: '#6B4FC8' },
    ],
  },
  uiux: {
    label: 'تصميم UI/UX',
    bars: [
      { label: 'بحث المستخدم',              pct: 20, color: '#9E59CD' },
      { label: 'Wireframes & Flow',         pct: 20, color: '#5234B7' },
      { label: 'التصميم عالي الدقة',         pct: 40, color: '#7B5AC7' },
      { label: 'Prototype & Handoff',       pct: 20, color: '#6B4FC8' },
    ],
  },
}

const tabKeys: ProjectTab[] = ['web', 'mobile', 'uiux']

const donutSegments = [
  { label: 'حصة المبدع', pct: 60, color: '#9E59CD' },
  { label: 'حصة إترا', pct: 40, color: '#5234B7' },
]

const infoCards = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#9E59CD" strokeWidth="1.6" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'طبيعة العقد',
    content: 'شراكة مرنة تتيح لك العمل كمستقل ضمن بيئة تقنية متكاملة، وليست علاقة توظيف دائمة.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#9E59CD" strokeWidth="1.6" />
        <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'الدفع والمستحقات',
    content: 'تُصرف المستحقات خلال 7 أيام من اعتماد التسليم، مع تقارير شفافة عن كل دفعة.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" stroke="#9E59CD" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'الدعم التقني',
    content: 'نوفر بيئة عمل متكاملة ودعماً مستمراً بالأدوات والمستشارين لضمان جودة المشاريع.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#9E59CD" strokeWidth="1.6" />
        <path d="M12 7v5l3 2" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'الالتزامات',
    content: 'الالتزام بالمواعيد، السرية التامة، ومعايير جودة إترا طوال فترة التعاون.',
  },
]

function DonutChart() {
  const size = 160
  const stroke = 22
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const segmentsWithOffset = donutSegments.reduce<{ label: string; pct: number; color: string; offset: number; len: number }[]>((acc, s) => {
    const prev = acc[acc.length - 1]
    const len = (s.pct / 100) * circumference
    return [...acc, { ...s, len, offset: prev ? prev.offset + prev.len : 0 }]
  }, [])
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(82,52,183,0.15)" strokeWidth={stroke} fill="none" />
        {segmentsWithOffset.map((s) => (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={s.color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${s.len} ${circumference - s.len}`}
            strokeDashoffset={-s.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-black" style={{ color: '#fff', fontFamily: 'Space Grotesk' }}>60٪</div>
        <div className="text-[10px] mt-0.5" style={{ color: '#B0A8D4' }}>للمبدع</div>
      </div>
    </div>
  )
}

export default function TermsPage() {
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)
  const [activeTab, setActiveTab] = useState<ProjectTab>('web')

  const handleContinue = () => {
    if (!agreed) return
    sessionStorage.setItem('terms_acknowledged', 'true')
    router.push('/register/form')
  }

  return (
    <div>
      <ProgressBar currentStep={2} />

      <div className="mb-6 text-right">
        <div className="text-xs font-bold tracking-[0.3em] mb-2" style={{ color: '#9E59CD' }}>02 STEP</div>
        <h1 className="text-3xl font-black mb-2" style={{ color: '#fff' }}>بنود العمل</h1>
        <p className="text-sm" style={{ color: '#B0A8D4' }}>
          اطّلع على النموذج الاقتصادي للشراكة قبل الموافقة على البنود.
        </p>
      </div>

      {/* Top row — distribution + donut */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Task distribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(26,26,53,0.8)',
            border: '1px solid rgba(82,52,183,0.25)',
            borderRadius: '14px',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(82,52,183,0.2)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#9E59CD" strokeWidth="1.6" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#9E59CD" strokeWidth="1.6" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#9E59CD" strokeWidth="1.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#9E59CD" strokeWidth="1.6" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-sm" style={{ color: '#fff' }}>توزيع حصتك على بنود المشروع</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>كيف تُوزَّع الـ 60% على مكونات المشروع</p>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex gap-1.5 mb-4">
            {tabKeys.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={
                  activeTab === tab
                    ? { background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)', color: '#fff', border: 'none' }
                    : { background: 'transparent', color: '#6B6490', border: '1px solid rgba(82,52,183,0.3)' }
                }
              >
                {projectTypes[tab].label}
              </button>
            ))}
          </div>

          {/* Bars */}
          <div className="space-y-4">
            {projectTypes[activeTab].bars.map((t, i) => (
              <div key={`${activeTab}-${t.label}`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span
                    className="text-xs font-bold"
                    style={{
                      fontFamily: 'Space Grotesk',
                      background: `linear-gradient(90deg, ${t.color}, #9E59CD)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t.pct}٪
                  </span>
                  <span className="text-xs" style={{ color: '#fff' }}>{t.label}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: '6px', background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    key={`${activeTab}-bar-${i}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.pct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${t.color} 0%, #9E59CD 100%)` }}
                  />
                </div>
                <p className="text-right mt-1" style={{ fontSize: '11px', color: '#6B6490' }}>
                  من إجمالي 60% حصة المبدع
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className="mt-4 text-right"
            style={{
              background: 'rgba(82,52,183,0.06)',
              border: '1px solid rgba(82,52,183,0.15)',
              borderRight: '3px solid #5234B7',
              borderRadius: '8px',
              padding: '12px 16px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#B0A8D4', margin: 0, lineHeight: 1.6 }}>
              تُحدَّد نسب كل بند بدقة لكل مشروع على حدة بحسب متطلباته وطبيعة العمل المطلوب، بالتنسيق بين إترا والمبدع قبل انطلاق المشروع.
            </p>
          </div>
        </motion.div>

        {/* Donut — participation model */}
        <motion.div
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
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(82,52,183,0.2)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 3a9 9 0 1 1-9 9" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M12 3v9h9" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-sm" style={{ color: '#fff' }}>نموذج المشاركة</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>توزيع العوائد لكل مشروع</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <DonutChart />
            <div className="space-y-3">
              {donutSegments.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                  <div className="text-right">
                    <div className="text-xs font-bold" style={{ color: '#fff' }}>{s.label}</div>
                    <div className="text-[10px]" style={{ color: '#6B6490' }}>{s.pct}٪ من الإيرادات</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info cards grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {infoCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="flex gap-4 p-5 rounded-2xl"
            style={{
              background: 'rgba(18,18,42,0.5)',
              border: '1px solid rgba(82,52,183,0.18)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(82,52,183,0.15)', border: '1px solid rgba(82,52,183,0.25)' }}
            >
              {card.icon}
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold mb-1 text-sm" style={{ color: '#fff' }}>{card.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#B0A8D4' }}>{card.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agreement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 rounded-2xl flex items-start gap-4 cursor-pointer transition-all mb-6"
        style={{
          background: agreed ? 'rgba(82,52,183,0.15)' : 'rgba(18,18,42,0.5)',
          border: agreed ? '1px solid rgba(82,52,183,0.5)' : '1px solid rgba(82,52,183,0.18)',
        }}
        onClick={() => setAgreed(!agreed)}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            background: agreed ? 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)' : 'transparent',
            border: agreed ? 'none' : '1.5px solid rgba(82,52,183,0.5)',
            boxShadow: agreed ? '0 0 10px rgba(82,52,183,0.5)' : 'none',
          }}
        >
          {agreed && (
            <svg width="12" height="10" viewBox="0 0 11 9" fill="none">
              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div className="flex-1 text-right">
          <p className="font-bold text-sm" style={{ color: '#fff' }}>
            أقرّ بأنني قرأت جميع بنود العمل وأوافق عليها
          </p>
          <p className="text-xs mt-1" style={{ color: '#6B6490' }}>
            موافقتك تُعدّ إقراراً قانونياً بالالتزام ببنود الشراكة مع إترا.
          </p>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => router.push('/register/criteria')}
          className="px-6 py-3 text-sm font-semibold rounded-full transition-all hover:bg-white/5"
          style={{ color: '#B0A8D4', border: '1px solid rgba(176,168,212,0.2)' }}
        >
          رجوع
        </button>
        <button
          onClick={handleContinue}
          disabled={!agreed}
          className="gradient-btn px-7 py-3 text-white font-bold text-sm inline-flex items-center gap-2 transition-all"
          style={{
            borderRadius: '999px',
            opacity: agreed ? 1 : 0.4,
            cursor: agreed ? 'pointer' : 'not-allowed',
            boxShadow: agreed ? '0 0 28px rgba(82,52,183,0.4)' : 'none',
          }}
        >
          المتابعة لنموذج التسجيل
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
