'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Stats {
  total: number
  new: number
  under_review: number
  accepted: number
  rejected: number
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const acceptanceRate = stats && stats.total > 0
    ? Math.round((stats.accepted / stats.total) * 100)
    : 0

  const kpis = [
    { label: 'إجمالي الطلبات', value: stats?.total ?? 0, icon: '📋', color: '#60A5FA' },
    { label: 'معدل القبول', value: `${acceptanceRate}٪`, icon: '📈', color: '#34D399' },
    { label: 'قيد المراجعة', value: stats?.under_review ?? 0, icon: '🔍', color: '#F59E0B' },
    { label: 'مبدعون مقبولون', value: stats?.accepted ?? 0, icon: '✅', color: '#34D399' },
  ]

  const statusDist = stats ? [
    { label: 'جديد', value: stats.new, color: '#F59E0B', pct: stats.total ? (stats.new / stats.total) * 100 : 0 },
    { label: 'قيد المراجعة', value: stats.under_review, color: '#60A5FA', pct: stats.total ? (stats.under_review / stats.total) * 100 : 0 },
    { label: 'مقبول', value: stats.accepted, color: '#34D399', pct: stats.total ? (stats.accepted / stats.total) * 100 : 0 },
    { label: 'مرفوض', value: stats.rejected, color: '#F87171', pct: stats.total ? (stats.rejected / stats.total) * 100 : 0 },
  ] : []

  return (
    <div>
      <h1 className="text-3xl font-black mb-2" style={{ color: '#fff' }}>إحصائيات المنصة</h1>
      <p className="text-sm mb-8" style={{ color: '#6B6490' }}>نظرة عامة على أداء بوابة المبدعين</p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: '#5234B7', borderTopColor: 'transparent' }} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl mb-3">{k.icon}</div>
                <div className="text-3xl font-black mb-1" style={{ color: k.color, fontFamily: 'Space Grotesk' }}>
                  {k.value}
                </div>
                <div className="text-sm" style={{ color: '#6B6490' }}>{k.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-6" style={{ color: '#fff' }}>توزيع الحالات</h2>
              <div className="space-y-4">
                {statusDist.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: '#B0A8D4' }}>{s.label}</span>
                      <span style={{ color: s.color, fontFamily: 'Space Grotesk' }}>
                        {s.value} ({s.pct.toFixed(1)}٪)
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(82,52,183,0.15)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-6" style={{ color: '#fff' }}>ملخص سريع</h2>
              <div className="space-y-4">
                {[
                  { label: 'الطلبات الجديدة المنتظرة', value: stats?.new ?? 0, color: '#F59E0B' },
                  { label: 'طلبات تحت المراجعة', value: stats?.under_review ?? 0, color: '#60A5FA' },
                  { label: 'المبدعون المقبولون', value: stats?.accepted ?? 0, color: '#34D399' },
                  { label: 'الطلبات المرفوضة', value: stats?.rejected ?? 0, color: '#F87171' },
                  { label: 'معدل القبول الكلي', value: `${acceptanceRate}٪`, color: '#34D399' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-sm py-2" style={{ borderBottom: '1px solid rgba(82,52,183,0.1)' }}>
                    <span style={{ color: '#B0A8D4' }}>{item.label}</span>
                    <span className="font-bold" style={{ color: item.color, fontFamily: 'Space Grotesk' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
