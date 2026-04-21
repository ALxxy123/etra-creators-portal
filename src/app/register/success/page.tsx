'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { EtraLogo } from '@/components/brand/etra-logo'

const timeline = [
  { num: 1, title: 'تم إرسال الطلب', state: 'done' as const },
  { num: 2, title: 'مراجعة الملف', state: 'active' as const },
  { num: 3, title: 'المهمة التقنية', state: 'pending' as const },
  { num: 4, title: 'القبول النهائي', state: 'pending' as const },
]

const nextSteps = [
  {
    num: 1,
    title: 'مراجعة الملف',
    desc: 'سيقوم فريقنا بمراجعة طلبك خلال 3-5 أيام عمل وإرسال تحديث إلى بريدك.',
  },
  {
    num: 2,
    title: 'المهمة التقنية',
    desc: 'في حال القبول الأولي، ستُرسَل إليك مهمة تقنية قصيرة لتقييم مهاراتك.',
  },
  {
    num: 3,
    title: 'مقابلة شخصية',
    desc: 'لقاء عن بُعد مع فريق التقييم لإتمام عملية القبول والتعارف.',
  },
]

export default function SuccessPage() {
  const router = useRouter()
  const [trackingCode] = useState(() => {
    if (typeof window === 'undefined') return ''
    return sessionStorage.getItem('tracking_code') ?? ''
  })
  const [applicantName] = useState(() => {
    if (typeof window === 'undefined') return ''
    return sessionStorage.getItem('applicant_name') ?? ''
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!trackingCode) {
      router.replace('/register/criteria')
      return
    }
    localStorage.setItem('etra_tracking_code', trackingCode)
  }, [trackingCode, router])

  const copyCode = () => {
    navigator.clipboard.writeText(trackingCode)
    setCopied(true)
    toast.success('تم نسخ رمز التتبع!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (!trackingCode) return null

  return (
    <div>
      {/* ETRA logo centered top */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-8"
      >
        <EtraLogo size="lg" />
      </motion.div>

      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
        className="mx-auto mb-6 rounded-full flex items-center justify-center relative"
        style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
          boxShadow: '0 0 60px rgba(158,89,205,0.6), 0 0 120px rgba(82,52,183,0.35)',
        }}
      >
        <div
          className="absolute inset-[-12px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(158,89,205,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        <svg width="48" height="36" viewBox="0 0 36 28" fill="none" className="relative">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            d="M3 14L13 24L33 4"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-2"
      >
        <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#fff' }}>
          تم إرسال طلبك بنجاح
        </h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: '#B0A8D4' }}>
          {applicantName ? `شكراً لك ${applicantName}. ` : ''}
          لقد استلمنا ملفك وسيقوم فريق إترا بمراجعته والتواصل معك قريباً عبر بريدك الإلكتروني.
        </p>
      </motion.div>

      {/* Tracking code pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center justify-center gap-3 mb-10"
      >
        <div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(82,52,183,0.12)',
            border: '1px solid rgba(82,52,183,0.35)',
          }}
        >
          <span className="text-xs" style={{ color: '#B0A8D4' }}>رمز التتبع</span>
          <span
            className="text-sm font-bold tracking-widest"
            style={{
              fontFamily: 'Space Grotesk, monospace',
              background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {trackingCode}
          </span>
          <button
            onClick={copyCode}
            className="text-xs font-semibold px-3 py-1 rounded-full transition-all"
            style={{
              background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(158,89,205,0.15)',
              color: copied ? '#34D399' : '#9E59CD',
            }}
          >
            {copied ? '✓ منسوخ' : 'نسخ'}
          </button>
        </div>
      </motion.div>

      {/* Horizontal timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-6 mb-6"
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
            initial={{ width: '0%' }}
            animate={{ width: '30%' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background: 'linear-gradient(90deg, #5234B7 0%, #9E59CD 100%)',
              top: '18px',
            }}
          />
          {timeline.map((t) => {
            const done = t.state === 'done'
            const active = t.state === 'active'
            return (
              <div key={t.num} className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    background:
                      done || active
                        ? 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)'
                        : 'rgba(18,18,42,0.9)',
                    border: done || active ? 'none' : '1px solid rgba(82,52,183,0.3)',
                    color: done || active ? '#fff' : '#6B6490',
                    boxShadow: active ? '0 0 18px rgba(82,52,183,0.6)' : 'none',
                  }}
                >
                  {done ? (
                    <svg width="12" height="10" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    t.num
                  )}
                </div>
                <span
                  className="text-xs font-semibold text-center"
                  style={{ color: active ? '#fff' : done ? '#B0A8D4' : '#6B6490' }}
                >
                  الخطوة {t.num}
                </span>
                <span className="text-[10px] text-center hidden md:block" style={{ color: '#6B6490' }}>
                  {t.title}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* 2-column layout: help + next steps */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {/* Help card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(82,52,183,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#9E59CD" strokeWidth="1.6" />
                <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.3-1 1-1 1.7" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.8" fill="#9E59CD" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-base" style={{ color: '#fff' }}>تحتاج مساعدة؟</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>نحن هنا للإجابة على استفساراتك</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: '#B0A8D4' }}>
            إذا كانت لديك أي أسئلة عن حالة طلبك أو خطوات التسجيل، يمكنك التواصل معنا مباشرةً وسنرد خلال 24 ساعة.
          </p>

          <div className="space-y-2.5">
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(13,13,26,0.5)', border: '1px solid rgba(82,52,183,0.15)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="#9E59CD" strokeWidth="1.6" />
                <path d="M3 7l9 6 9-6" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#B0A8D4', fontFamily: 'Space Grotesk' }} dir="ltr">
                support@etra.sa
              </span>
            </div>
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(13,13,26,0.5)', border: '1px solid rgba(82,52,183,0.15)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="#9E59CD" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#B0A8D4', fontFamily: 'Space Grotesk' }} dir="ltr">
                +966 11 123 4567
              </span>
            </div>
          </div>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(82,52,183,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-right flex-1">
              <h3 className="font-bold text-base" style={{ color: '#fff' }}>الخطوات القادمة</h3>
              <p className="text-xs" style={{ color: '#6B6490' }}>ماذا يحدث بعد إرسال طلبك</p>
            </div>
          </div>

          <div className="space-y-3">
            {nextSteps.map((s) => (
              <div key={s.num} className="flex gap-3 items-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                    color: '#fff',
                    fontFamily: 'Space Grotesk',
                  }}
                >
                  {s.num}
                </div>
                <div className="text-right flex-1">
                  <h4 className="text-sm font-bold mb-0.5" style={{ color: '#fff' }}>{s.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#B0A8D4' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-3"
      >
        <Link
          href="/track"
          className="px-6 py-3 text-sm font-semibold rounded-full transition-all hover:bg-white/5 inline-flex items-center gap-2"
          style={{ color: '#B0A8D4', border: '1px solid rgba(176,168,212,0.25)' }}
        >
          تتبّع حالة طلبي
        </Link>
        <Link
          href="/"
          className="gradient-btn px-7 py-3 text-white font-bold text-sm inline-flex items-center gap-2 transition-all"
          style={{
            borderRadius: '999px',
            boxShadow: '0 0 28px rgba(82,52,183,0.4)',
          }}
        >
          العودة للرئيسية
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}
