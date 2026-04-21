'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { specialtyLabels, levelLabels, formatDate } from '@/lib/utils'
import type { CreatorApplication } from '@/types/database'

export default function CreatorsPage() {
  const [creators, setCreators] = useState<CreatorApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('all')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const params = new URLSearchParams({ status: 'accepted', limit: '100' })
      if (filterSpecialty !== 'all') params.append('specialty', filterSpecialty)
      if (search) params.append('search', search)
      const res = await fetch(`/api/admin/applications?${params}`)
      if (res.ok) {
        const { data } = await res.json()
        setCreators(data || [])
      }
      setLoading(false)
    }
    load()
  }, [filterSpecialty, search])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: '#fff' }}>المبدعون المقبولون</h1>
          <p className="text-sm mt-1" style={{ color: '#6B6490' }}>إدارة ومتابعة المبدعين المقبولين في المنصة</p>
        </div>
        <div
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}
        >
          {creators.length} مبدع نشط
        </div>
      </div>

      <div className="glass-card p-4 mb-6 flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث..."
          className="flex-1 px-4 py-2.5 rounded-xl text-sm"
        />
        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm"
          style={{ width: 'auto' }}
        >
          <option value="all">جميع التخصصات</option>
          {Object.entries(specialtyLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: '#5234B7', borderTopColor: 'transparent' }} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {creators.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold" style={{ color: '#fff' }}>{c.full_name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#6B6490' }}>{c.email}</p>
                </div>
                <div
                  className="px-2 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}
                >
                  مقبول
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#6B6490' }}>التخصص</span>
                  <span style={{ color: '#B0A8D4' }}>{specialtyLabels[c.specialty]}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#6B6490' }}>المستوى</span>
                  <span style={{ color: '#B0A8D4' }}>{levelLabels[c.level]}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#6B6490' }}>المدينة</span>
                  <span style={{ color: '#B0A8D4' }}>{c.city}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#6B6490' }}>تاريخ القبول</span>
                  <span style={{ color: '#B0A8D4' }}>{formatDate(c.updated_at)}</span>
                </div>
              </div>
              {c.linkedin_or_github_url && (
                <a
                  href={c.linkedin_or_github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs mt-4 text-right"
                  style={{ color: '#60A5FA' }}
                >
                  🔗 الملف المهني
                </a>
              )}
            </motion.div>
          ))}
          {creators.length === 0 && (
            <div className="col-span-full text-center py-16 text-sm" style={{ color: '#6B6490' }}>
              لا يوجد مبدعون مقبولون حتى الآن
            </div>
          )}
        </div>
      )}
    </div>
  )
}
