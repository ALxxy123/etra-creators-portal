'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/brand/navbar'
import { Footer } from '@/components/brand/footer'
import { specialtyLabels, statusLabels, formatDate } from '@/lib/utils'
import type { ApplicationStatus, Specialty } from '@/types/database'

interface TrackResult {
  tracking_code: string
  full_name: string
  specialty: Specialty
  status: ApplicationStatus
  submission_date: string
}

const statusConfig: Record<ApplicationStatus, { icon: string; color: string; bg: string; border: string; message: string }> = {
  new: {
    icon: '⏳',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.3)',
    message: 'طلبك قيد الانتظار وسيتم مراجعته قريباً.',
  },
  under_review: {
    icon: '🔍',
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.3)',
    message: 'يتم الآن مراجعة طلبك من قِبل فريق إترا.',
  },
  accepted: {
    icon: '✅',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
    message: 'تهانينا! تم قبول طلبك. سيتواصل معك الفريق قريباً.',
  },
  rejected: {
    icon: '❌',
    color: '#F87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
    message: 'نأسف، لم يتم قبول طلبك في هذه الدورة. يمكنك إعادة التقديم لاحقاً.',
  },
}

export default function TrackPage() {
  const [code, setCode] = useState(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem('etra_tracking_code') ?? ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackResult | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleTrack = async () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)
    setNotFound(false)
    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(code.trim())}`)
      const data = await res.json()
      if (!res.ok || data.error) {
        setNotFound(true)
      } else {
        setResult(data)
      }
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-2 text-center" style={{ color: '#fff' }}>
            تتبّع حالة طلبك
          </h1>
          <p className="text-center mb-10" style={{ color: '#B0A8D4' }}>
            أدخل رمز التتبع الخاص بك للاطلاع على حالة طلبك.
          </p>

          <div className="glass-card p-8">
            <label className="block text-sm font-semibold mb-3" style={{ color: '#B0A8D4' }}>
              رمز التتبع
            </label>
            <div className="flex gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="ETRA-2026-XXXX0001"
                className="flex-1 px-4 py-3 rounded-xl text-sm"
                dir="ltr"
                style={{ fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}
              />
              <button
                onClick={handleTrack}
                disabled={loading || !code.trim()}
                className="gradient-btn px-6 py-3 rounded-xl text-white font-bold whitespace-nowrap"
              >
                {loading ? '...' : 'تتبّع'}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {notFound && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 glass-card p-8 text-center"
              >
                <div className="text-4xl mb-4">🔎</div>
                <h2 className="text-xl font-bold mb-2" style={{ color: '#fff' }}>لم يتم العثور على الطلب</h2>
                <p style={{ color: '#B0A8D4' }}>
                  تأكد من صحة كود التتبع وحاول مرة أخرى.
                </p>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <div
                  className="glass-card p-8"
                  style={{
                    background: statusConfig[result.status].bg,
                    border: `1px solid ${statusConfig[result.status].border}`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{statusConfig[result.status].icon}</div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: '#fff' }}>
                        {statusLabels[result.status]}
                      </h2>
                      <p className="text-sm mt-1" style={{ color: statusConfig[result.status].color }}>
                        {statusConfig[result.status].message}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p style={{ color: '#6B6490' }}>الاسم</p>
                      <p className="font-semibold mt-1" style={{ color: '#fff' }}>{result.full_name}</p>
                    </div>
                    <div>
                      <p style={{ color: '#6B6490' }}>التخصص</p>
                      <p className="font-semibold mt-1" style={{ color: '#fff' }}>{specialtyLabels[result.specialty]}</p>
                    </div>
                    <div>
                      <p style={{ color: '#6B6490' }}>رمز التتبع</p>
                      <p className="font-semibold mt-1" style={{ color: '#fff', fontFamily: 'Space Grotesk' }}>{result.tracking_code}</p>
                    </div>
                    <div>
                      <p style={{ color: '#6B6490' }}>تاريخ التقديم</p>
                      <p className="font-semibold mt-1" style={{ color: '#fff' }}>{formatDate(result.submission_date)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
