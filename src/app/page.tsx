'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/brand/navbar'
import { Footer } from '@/components/brand/footer'
import { HomeSections } from '@/components/brand/home-sections'

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
                بوابة مبدعين إترا
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                <span style={{ color: '#fff' }}>انضم إلى</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  شبكة إترا التقنية
                </span>
              </h1>

              <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#B0A8D4', maxWidth: '540px' }}>
<<<<<<< HEAD
                مبدعين إترا هي شبكة تنفيذ تقنية احترافية تجمع المطورين والمصممين وصنّاع المنتجات للعمل على مشاريع حقيقية تحت إدارة إترا، بمنهجية واضحة، عقود رسمية، وتوزيع أرباح عادل.
              </p>

              <p className="text-sm leading-relaxed mb-8" style={{ color: '#6B6490', maxWidth: '540px' }}>
                لسنا بوابة توظيف تقليدية، ولا برنامجاً تدريبياً. نحن نبني شبكة من المبدعين المستقلين القادرين على تنفيذ مشاريع تقنية بجودة عالية، ضمن منظومة احترافية تحفظ الحقوق وتوضح المسؤوليات.
=======
                مبدعين إترا هي شبكة تنفيذ تقنية احترافية تجمع المطورين، المصممين، وصنّاع المنتجات للعمل على مشاريع حقيقية تحت إدارة إترا، بمنهجية واضحة، عقود رسمية، وتوزيع أرباح عادل.
              </p>

              <p className="text-sm leading-relaxed mb-8" style={{ color: '#6B6490', maxWidth: '540px' }}>
                لسنا بوابة توظيف تقليدية، ولا برنامجًا تدريبيًا. نحن نبني شبكة من المبدعين المستقلين القادرين على تنفيذ مشاريع تقنية بجودة عالية، ضمن منظومة احترافية تحفظ الحقوق وتوضح المسؤوليات.
>>>>>>> 9fe6f65c6d908bbd1299d5d2142d6d2fff7b226b
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
                  ابدأ طلب الانضمام
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
<<<<<<< HEAD
        <HomeSections />
=======

        {/* ====== What is مبدعين إترا ====== */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-16">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-10 text-right"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
                border: '1px solid rgba(82,52,183,0.2)',
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-5"
                style={{ background: 'rgba(82,52,183,0.15)', border: '1px solid rgba(82,52,183,0.3)', color: '#B0A8D4' }}
              >
                المبادرة
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#fff' }}>
                ما هي <span style={{
                  background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>مبدعين إترا</span>؟
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#B0A8D4' }}>
                مبدعين إترا هي مبادرة تقنية تهدف إلى بناء شبكة تنفيذ احترافية تحت مظلة إترا، تضم أصحاب المهارات التقنية القادرين على المشاركة في تنفيذ مشاريع حقيقية للعملاء والجهات، ضمن نموذج واضح لإدارة المشاريع، توزيع الأرباح، وضمان جودة التنفيذ.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-8 md:p-10 text-right flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(82,52,183,0.16) 0%, rgba(158,89,205,0.10) 100%)',
                border: '1px solid rgba(158,89,205,0.35)',
                boxShadow: 'inset 0 0 40px rgba(82,52,183,0.08)',
              }}
            >
              <div className="text-[11px] font-bold tracking-[0.25em] mb-3" style={{ color: '#9E59CD' }}>
                HIGHLIGHT
              </div>
              <p className="text-lg md:text-xl font-bold leading-relaxed" style={{ color: '#fff' }}>
                شبكة تقنية للمبدعين المستقلين،
                <br />
                وليست وظيفة مباشرة أو برنامجًا تدريبيًا.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ====== لماذا تنضم ====== */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="text-right mb-10 max-w-2xl mr-0 ml-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#fff' }}>
              لماذا تنضم إلى مبدعين إترا؟
            </h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#B0A8D4' }}>
              قيمة حقيقية مبنية على إدارة احترافية، لا وعود تسويقية.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'مشاريع حقيقية بدل البحث الفردي',
                desc: 'الوصول إلى مشاريع تقنية فعلية تأتيك عبر إترا، بدل استهلاك وقتك في استقطاب العملاء.',
              },
              {
                title: 'منظومة احترافية متكاملة',
                desc: 'العمل ضمن منظومة تدير نطاق العمل، العقود، والتحصيل من البداية حتى التسليم.',
              },
              {
                title: 'سجل أعمال أقوى',
                desc: 'بناء Portfolio حقيقي عبر مشاريع مُنفَّذة لعملاء وجهات فعلية، لا أعمال افتراضية.',
              },
              {
                title: 'وضوح الحقوق والمسؤوليات',
                desc: 'كل مشروع يبدأ بنطاق عمل واضح، ومخرجات محددة، ومسؤوليات معلنة لجميع الأطراف.',
              },
              {
                title: 'مراجعة جودة وتوجيه تقني',
                desc: 'بيئة تنفيذ تدعمك بمراجعة فنّية وتوجيه يضمن خروج المشروع بمستوى مهني عالٍ.',
              },
              {
                title: 'نموذج أرباح واضح وعادل',
                desc: 'توزيع شفاف للأرباح بين المبدع وإترا، مع تحويل المستحقات وفق آلية موثّقة.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl p-6 text-right transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
                  border: '1px solid rgba(82,52,183,0.2)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mr-auto"
                  style={{
                    background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                    boxShadow: '0 0 24px rgba(82,52,183,0.35)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#fff' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#B0A8D4' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ====== ماذا يحصل عليه مبدع إترا ====== */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="rounded-3xl p-8 md:p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(26,26,53,0.85) 0%, rgba(18,18,42,0.92) 100%)',
              border: '1px solid rgba(82,52,183,0.22)',
            }}
          >
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
              <div className="text-right">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-5"
                  style={{ background: 'rgba(82,52,183,0.15)', border: '1px solid rgba(82,52,183,0.3)', color: '#B0A8D4' }}
                >
                  القيمة
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#fff' }}>
                  ماذا يحصل عليه <span style={{
                    background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>مبدع إترا</span>؟
                </h2>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#B0A8D4' }}>
                  ليست مجرد فرصة للعمل، بل بيئة كاملة تدعم المبدع في كل مرحلة من رحلة تنفيذ المشروع.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  'فرص للمشاركة في مشاريع تقنية حقيقية.',
                  'إدارة احترافية للمشروع من طرف إترا.',
                  'توثيق واضح لنطاق العمل والمخرجات.',
                  'آلية مالية واضحة لتوزيع المستحقات.',
                  'بيئة عمل مبنية على الجودة والالتزام.',
                  'فرصة للتطور المهني وبناء سجل أعمال أقوى.',
                  'مشاركة أرباح واضحة: 60٪ للمبدع و40٪ لإترا.',
                ].map((line, i) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl text-right"
                    style={{
                      background: 'rgba(13,13,26,0.5)',
                      border: '1px solid rgba(82,52,183,0.15)',
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(82,52,183,0.18)', border: '1px solid rgba(82,52,183,0.35)' }}
                    >
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4L4 7L10 1" stroke="#9E59CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm leading-relaxed flex-1" style={{ color: '#E5E0F5' }}>
                      {line}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ====== نموذج الأرباح ====== */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-10 text-right"
              style={{
                background: 'linear-gradient(135deg, rgba(82,52,183,0.18) 0%, rgba(158,89,205,0.10) 100%)',
                border: '1px solid rgba(158,89,205,0.35)',
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                style={{ background: 'rgba(13,13,26,0.5)', border: '1px solid rgba(158,89,205,0.4)', color: '#9E59CD' }}
              >
                المالية
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#fff' }}>
                نموذج أرباح واضح
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#E5E0F5' }}>
                يعتمد نموذج مبدعين إترا على توزيع أرباح واضح: 60٪ للمبدع المنفّذ، و40٪ لإترا مقابل إدارة المشروع، التسويق، استقطاب العملاء، التفاوض، المتابعة، التحصيل، وضمان جودة التجربة.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-2xl p-5 text-right"
                  style={{ background: 'rgba(13,13,26,0.55)', border: '1px solid rgba(158,89,205,0.3)' }}
                >
                  <div
                    className="text-3xl md:text-4xl font-black mb-1"
                    style={{
                      fontFamily: 'Space Grotesk, monospace',
                      background: 'linear-gradient(135deg, #9E59CD 0%, #5234B7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    60٪
                  </div>
                  <div className="text-xs font-semibold" style={{ color: '#B0A8D4' }}>للمبدع المنفّذ</div>
                </div>
                <div
                  className="rounded-2xl p-5 text-right"
                  style={{ background: 'rgba(13,13,26,0.55)', border: '1px solid rgba(82,52,183,0.3)' }}
                >
                  <div
                    className="text-3xl md:text-4xl font-black mb-1"
                    style={{
                      fontFamily: 'Space Grotesk, monospace',
                      background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    40٪
                  </div>
                  <div className="text-xs font-semibold" style={{ color: '#B0A8D4' }}>لإترا</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-8 md:p-10 text-right"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
                border: '1px solid rgba(82,52,183,0.22)',
              }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-5" style={{ color: '#fff' }}>
                ماذا تغطّي حصة إترا؟
              </h3>
              <ul className="space-y-2.5">
                {[
                  'التسويق والترويج للشبكة وخدماتها.',
                  'استقطاب العملاء والجهات.',
                  'التفاوض وإعداد العقود الرسمية.',
                  'إدارة المشاريع ومتابعة التنفيذ.',
                  'الشؤون القانونية والتحصيل المالي.',
                  'مراجعة الجودة وحل النزاعات.',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#B0A8D4' }}>
                    <span style={{ color: '#9E59CD', marginTop: '4px' }}>◆</span>
                    <span className="flex-1">{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ====== طبيعة العلاقة + رسالة الثقة ====== */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-10 text-right"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
                border: '1px solid rgba(82,52,183,0.22)',
              }}
            >
              <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(82,52,183,0.18)', border: '1px solid rgba(82,52,183,0.35)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" stroke="#9E59CD" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black flex-1" style={{ color: '#fff' }}>
                  طبيعة العلاقة
                </h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#B0A8D4' }}>
                الانضمام إلى مبدعين إترا لا يعني التوظيف المباشر، بل يعني الانضمام كـ
                <span style={{ color: '#fff', fontWeight: 700 }}> «مبدع/منفّذ مستقل ضمن شبكة إترا التقنية» </span>
                ، ويتم التعاون حسب المشاريع المتاحة، وطبيعة المهارات المطلوبة، والاتفاقات المعتمدة لكل مشروع.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-8 md:p-10 text-right"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
                border: '1px solid rgba(82,52,183,0.22)',
              }}
            >
              <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(82,52,183,0.18)', border: '1px solid rgba(82,52,183,0.35)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" stroke="#9E59CD" strokeWidth="1.6" />
                    <path d="M8 12l3 3 5-6" stroke="#9E59CD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black flex-1" style={{ color: '#fff' }}>
                  ثقة مبنية على منظومة
                </h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#B0A8D4' }}>
                تعمل إترا على تنظيم العلاقة بين المبدعين والعملاء من خلال إدارة المشروع، توضيح نطاق العمل، متابعة الجودة، وتنظيم المستحقات، بما يضمن تجربة أكثر احترافية للطرفين.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ====== Final CTA strip ====== */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 mb-4">
          <div
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{
              background:
                'radial-gradient(ellipse 600px 300px at 50% 50%, rgba(82,52,183,0.2) 0%, transparent 70%), linear-gradient(135deg, rgba(26,26,53,0.85) 0%, rgba(18,18,42,0.92) 100%)',
              border: '1px solid rgba(82,52,183,0.3)',
            }}
          >
            <h3 className="text-2xl md:text-3xl font-black mb-3" style={{ color: '#fff' }}>
              جاهز للانضمام إلى شبكة إترا التقنية؟
            </h3>
            <p className="text-sm md:text-base mb-7 max-w-2xl mx-auto" style={{ color: '#B0A8D4' }}>
              تقديم الطلب لا يستغرق دقائق. سيقوم فريق إترا بمراجعة بياناتك وأعمالك السابقة، والتواصل معك حسب توافق مهاراتك مع المشاريع القادمة.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register/criteria"
                className="gradient-btn px-7 py-3.5 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                style={{ borderRadius: '999px', boxShadow: '0 0 32px rgba(82,52,183,0.4)' }}
              >
                ابدأ طلب الانضمام
              </Link>
              <Link
                href="/track"
                className="px-6 py-3.5 font-semibold text-sm transition-all inline-flex items-center gap-2 hover:bg-white/5"
                style={{ border: '1px solid rgba(82,52,183,0.4)', color: '#fff', borderRadius: '999px' }}
              >
                تتبع طلبك
              </Link>
            </div>
          </div>
        </section>
>>>>>>> 9fe6f65c6d908bbd1299d5d2142d6d2fff7b226b
      </main>

      <Footer />
    </div>
  )
}
