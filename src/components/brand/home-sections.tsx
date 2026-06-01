'use client'

import { motion } from 'framer-motion'

// Reusable section title row aligned to the right (RTL).
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="text-right mb-8 max-w-2xl mr-0 ml-auto">
      <div className="text-xs font-bold tracking-[0.3em] mb-2" style={{ color: '#9E59CD' }}>
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#fff' }}>
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base leading-relaxed" style={{ color: '#B0A8D4' }}>
          {description}
        </p>
      )}
    </div>
  )
}

const whyJoin = [
  'الوصول إلى مشاريع تقنية حقيقية بدل البحث الفردي عن العملاء.',
  'العمل ضمن منظومة احترافية تدير نطاق العمل والعقود والتحصيل.',
  'بناء Portfolio أقوى من خلال مشاريع فعلية.',
  'وضوح الحقوق والمسؤوليات قبل بداية كل مشروع.',
  'مراجعة جودة وتوجيه تقني لضمان مخرجات أفضل.',
  'نموذج أرباح واضح وعادل بين المبدع وإترا.',
]

const whatYouGet = [
  'فرص للمشاركة في مشاريع تقنية حقيقية.',
  'إدارة احترافية للمشروع من طرف إترا.',
  'توثيق واضح لنطاق العمل والمخرجات.',
  'آلية مالية واضحة لتوزيع المستحقات.',
  'بيئة عمل مبنية على الجودة والالتزام.',
  'فرصة للتطور المهني وبناء سجل أعمال أقوى.',
  'مشاركة أرباح واضحة: 60٪ للمبدع و40٪ لإترا.',
]

export function HomeSections() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 space-y-20">
      {/* 1. What is مبدعين إترا */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          eyebrow="عن المبادرة"
          title="ما هي مبدعين إترا؟"
          description="مبدعين إترا هي مبادرة تقنية تهدف إلى بناء شبكة تنفيذ احترافية تحت مظلة إترا، تضم أصحاب المهارات التقنية القادرين على المشاركة في تنفيذ مشاريع حقيقية للعملاء والجهات، ضمن نموذج واضح لإدارة المشاريع، توزيع الأرباح، وضمان جودة التنفيذ."
        />
        <div
          className="rounded-2xl p-6 flex items-start gap-4 max-w-3xl mr-0 ml-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(82,52,183,0.12) 0%, rgba(158,89,205,0.06) 100%)',
            border: '1px solid rgba(158,89,205,0.3)',
            borderRight: '3px solid #9E59CD',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3.5" stroke="#fff" strokeWidth="1.6" />
            </svg>
          </div>
          <p className="text-sm md:text-base font-semibold text-right leading-relaxed" style={{ color: '#fff' }}>
            شبكة تقنية للمبدعين المستقلين، وليست وظيفة مباشرة أو برنامجاً تدريبياً.
          </p>
        </div>
      </motion.div>

      {/* 2. Why join */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader eyebrow="القيمة" title="لماذا تنضم إلى مبدعين إترا؟" />
        <div className="grid md:grid-cols-2 gap-4">
          {whyJoin.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'rgba(18,18,42,0.5)',
                border: '1px solid rgba(82,52,183,0.18)',
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: 'rgba(158,89,205,0.15)', border: '1px solid rgba(158,89,205,0.35)' }}
              >
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3 3 7-7" stroke="#9E59CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-right flex-1" style={{ color: '#B0A8D4' }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3. What مبدع إترا gets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader eyebrow="المنافع" title="ماذا يحصل عليه مبدع إترا؟" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {whatYouGet.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="p-5 rounded-xl flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,53,0.7) 0%, rgba(18,18,42,0.9) 100%)',
                border: '1px solid rgba(82,52,183,0.22)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 mr-auto"
                style={{ background: 'rgba(82,52,183,0.2)' }}
              >
                <span className="text-xs font-black" style={{ color: '#9E59CD', fontFamily: 'Space Grotesk' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-right" style={{ color: '#fff' }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 4. Nature of relationship + Trust message (paired) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-5"
      >
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.8) 0%, rgba(18,18,42,0.9) 100%)',
            border: '1px solid rgba(82,52,183,0.22)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(82,52,183,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3.5" stroke="#9E59CD" strokeWidth="1.6" />
                <circle cx="17" cy="10" r="2.5" stroke="#9E59CD" strokeWidth="1.6" />
                <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" stroke="#9E59CD" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-lg font-black text-right flex-1" style={{ color: '#fff' }}>
              طبيعة العلاقة
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-right" style={{ color: '#B0A8D4' }}>
            الانضمام إلى مبدعين إترا لا يعني التوظيف المباشر، بل يعني الانضمام كـ «مبدع/منفّذ مستقل ضمن شبكة إترا التقنية»، ويتم التعاون حسب المشاريع المتاحة، وطبيعة المهارات المطلوبة، والاتفاقات المعتمدة لكل مشروع.
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(82,52,183,0.12) 0%, rgba(158,89,205,0.06) 100%)',
            border: '1px solid rgba(158,89,205,0.3)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-black text-right flex-1" style={{ color: '#fff' }}>
              تنظيم العلاقة وحماية الحقوق
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-right" style={{ color: '#B0A8D4' }}>
            تعمل إترا على تنظيم العلاقة بين المبدعين والعملاء من خلال إدارة المشروع، توضيح نطاق العمل، متابعة الجودة، وتنظيم المستحقات، بما يضمن تجربة أكثر احترافية للطرفين.
          </p>
        </div>
      </motion.div>

      {/* 5. Profit model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          eyebrow="النموذج الاقتصادي"
          title="نموذج أرباح واضح"
          description="يعتمد نموذج مبدعين إترا على توزيع أرباح واضح: 60٪ للمبدع المنفذ، و40٪ لإترا مقابل إدارة المشروع، التسويق، استقطاب العملاء، التفاوض، المتابعة، التحصيل، وضمان جودة التجربة."
        />
        <div
          className="rounded-2xl p-8 grid md:grid-cols-2 gap-6 items-center"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,53,0.85) 0%, rgba(18,18,42,0.95) 100%)',
            border: '1px solid rgba(82,52,183,0.25)',
          }}
        >
          {/* Visual split bar */}
          <div className="order-2 md:order-1">
            <div className="flex items-center justify-between mb-3 text-xs font-bold" style={{ fontFamily: 'Space Grotesk' }}>
              <span style={{ color: '#5234B7' }}>40٪ إترا</span>
              <span style={{ color: '#9E59CD' }}>60٪ المبدع</span>
            </div>
            <div className="flex rounded-full overflow-hidden" style={{ height: '14px', background: 'rgba(255,255,255,0.04)' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg, #9E59CD 0%, #5234B7 100%)' }}
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                style={{ background: 'rgba(82,52,183,0.4)' }}
              />
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: '#6B6490' }}>
              تشمل حصة إترا (40٪) إدارة المشروع، التسويق، استقطاب العملاء، التفاوض، المتابعة، التحصيل، وضمان جودة التجربة.
            </p>
          </div>

          {/* Big share number */}
          <div className="order-1 md:order-2 text-center">
            <div
              className="inline-block text-7xl md:text-8xl font-black leading-none"
              style={{
                fontFamily: 'Space Grotesk',
                background: 'linear-gradient(135deg, #9E59CD 0%, #5234B7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              60٪
            </div>
            <p className="text-sm font-semibold mt-2" style={{ color: '#fff' }}>
              حصة المبدع من إجمالي قيمة كل مشروع
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
