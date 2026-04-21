'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/brand/navbar'
import { Footer } from '@/components/brand/footer'

const stats = [
  { value: '+١٠K', label: 'مبدع مسجّل' },
  { value: '+٥٠', label: 'شريك تقني' },
  { value: '٩٨٪', label: 'نسبة الرضا' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0D0D1A' }}>
      <Navbar />

      {/* Hero */}
      <main className="flex-1 relative overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: 0,
            width: '800px',
            height: '600px',
            background:
              'radial-gradient(ellipse 800px 600px at 80% 20%, rgba(82,52,183,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 0,
            left: 0,
            width: '600px',
            height: '500px',
            background:
              'radial-gradient(ellipse 600px 500px at 10% 90%, rgba(158,89,205,0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Right column (text) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-2 text-right"
            >
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{
                  background: 'rgba(82,52,183,0.15)',
                  border: '1px solid rgba(82,52,183,0.3)',
                  color: '#B0A8D4',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                المستقبل التقني يبدأ هنا
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                <span style={{ color: '#fff' }}>ارتق بمسيرتك مع</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  إترا للتمكين التقني
                </span>
              </h1>

              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#B0A8D4', maxWidth: '500px' }}>
                بوابة المبدعين هي مساحتك للانطلاق. انضم إلى نخبة من المتخصصين في عالم التقنية، وابنِ مستقبلك المهني في بيئة تدعم الابتكار والتميز.
              </p>

              <div className="flex items-center gap-4 mb-14">
                <Link
                  href="/register/criteria"
                  className="gradient-btn px-7 py-3.5 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  style={{
                    borderRadius: '999px',
                    boxShadow: '0 0 32px rgba(82,52,183,0.4)',
                  }}
                >
                  ابدأ رحلتك الآن
                </Link>
                <Link
                  href="/track"
                  className="px-6 py-3.5 font-semibold text-sm transition-all inline-flex items-center gap-2 hover:bg-white/5"
                  style={{
                    border: '1px solid rgba(82,52,183,0.4)',
                    color: '#fff',
                    borderRadius: '999px',
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(158,89,205,0.2)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9E59CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </span>
                  تتبع طلبك
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-row-reverse gap-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl font-black"
                      style={{ color: '#fff', fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#B0A8D4' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Left column (3D card visual) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 lg:order-1 relative flex items-center justify-center"
              style={{ perspective: '1200px', minHeight: '480px' }}
            >
              {/* Tilted card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  aspectRatio: '1 / 1',
                  transform: 'rotateY(12deg) rotateX(6deg) rotateZ(-3deg)',
                  background:
                    'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
                  border: '1px solid rgba(82,52,183,0.35)',
                  boxShadow:
                    '0 40px 80px -20px rgba(82,52,183,0.3), inset 0 0 60px rgba(82,52,183,0.08)',
                }}
              >
                {/* Circuit-board pattern inside */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(82,52,183,0.15) 0%, transparent 60%), linear-gradient(135deg, transparent 40%, rgba(158,89,205,0.08) 50%, transparent 60%)',
                  }}
                />
                <svg
                  className="absolute inset-0 w-full h-full opacity-40"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <defs>
                    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(82,52,183,0.15)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#5234B7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#9E59CD" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                  <circle cx="200" cy="200" r="40" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />
                  <circle cx="200" cy="200" r="80" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
                  <circle cx="200" cy="200" r="120" stroke="rgba(82,52,183,0.1)" strokeWidth="1" fill="none" />
                  <line x1="200" y1="40" x2="200" y2="140" stroke="rgba(82,52,183,0.2)" strokeWidth="1" />
                  <line x1="200" y1="260" x2="200" y2="360" stroke="rgba(82,52,183,0.2)" strokeWidth="1" />
                  <line x1="40" y1="200" x2="140" y2="200" stroke="rgba(82,52,183,0.2)" strokeWidth="1" />
                  <line x1="260" y1="200" x2="360" y2="200" stroke="rgba(82,52,183,0.2)" strokeWidth="1" />
                  {[
                    [200, 40],
                    [200, 360],
                    [40, 200],
                    [360, 200],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill="#9E59CD" />
                  ))}
                </svg>

                {/* Central glow dot */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                    boxShadow: '0 0 40px rgba(158,89,205,0.8)',
                  }}
                />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  top: '12%',
                  right: '-5%',
                  background: 'rgba(26,26,53,0.95)',
                  border: '1px solid rgba(82,52,183,0.4)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)' }}
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <path d="M4 1L1 6L4 11M10 1L13 6L10 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-[10px]" style={{ color: '#6B6490' }}>مطور ويب</div>
                  <div className="text-sm font-bold" style={{ color: '#34D399' }}>تم القبول</div>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  bottom: '12%',
                  left: '-5%',
                  background: 'rgba(26,26,53,0.95)',
                  border: '1px solid rgba(82,52,183,0.4)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#F59E0B" strokeWidth="1.5" />
                    <path d="M6 3V6L8 7.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-[10px]" style={{ color: '#6B6490' }}>مصمم UI/UX</div>
                  <div className="text-sm font-bold" style={{ color: '#F59E0B' }}>قيد المراجعة</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
