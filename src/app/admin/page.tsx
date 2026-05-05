'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { StatusBadge } from '@/components/ui/badge'
import { specialtyLabels, levelLabels, statusLabels, formatDate } from '@/lib/utils'
import type {
  ApplicationNote,
  ApplicationStatus,
  ApplicationStatusHistory,
  CreatorApplication,
} from '@/types/database'

interface Stats {
  total: number
  new: number
  under_review: number
  accepted: number
  rejected: number
}

const statsCards = [
  { key: 'total', label: 'إجمالي الطلبات', color: '#60A5FA' },
  { key: 'new', label: 'جديد', color: '#F59E0B' },
  { key: 'under_review', label: 'قيد المراجعة', color: '#60A5FA' },
  { key: 'accepted', label: 'مقبول', color: '#34D399' },
  { key: 'rejected', label: 'مرفوض', color: '#F87171' },
]

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<CreatorApplication[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSpecialty, setFilterSpecialty] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [selectedApp, setSelectedApp] = useState<CreatorApplication | null>(null)
  const [selectedNotes, setSelectedNotes] = useState<ApplicationNote[]>([])
  const [selectedHistory, setSelectedHistory] = useState<ApplicationStatusHistory[]>([])
  const [detailLoading, setDetailLoading] = useState(false)
  const [cvLoading, setCvLoading] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sort_by: 'created_at',
        sort_order: 'desc',
      })
      if (filterStatus !== 'all') params.append('status', filterStatus)
      if (filterSpecialty !== 'all') params.append('specialty', filterSpecialty)
      if (filterLevel !== 'all') params.append('level', filterLevel)
      if (search) params.append('search', search)

      const [appsRes, statsRes] = await Promise.all([
        fetch(`/api/admin/applications?${params}`),
        fetch('/api/admin/stats'),
      ])

      if (appsRes.ok) {
        const { data, count } = await appsRes.json()
        setApplications(data || [])
        setTotalCount(count || 0)
      }
      if (statsRes.ok) setStats(await statsRes.json())
    } catch {
      toast.error('فشل تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }, [page, filterStatus, filterSpecialty, filterLevel, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData()
  }, [loadData])

  const openApp = async (app: CreatorApplication) => {
    setSelectedApp(app)
    setNoteText('')
    setSelectedNotes([])
    setSelectedHistory([])
    setDetailLoading(true)
    try {
      const res = await fetch(`/api/admin/applications/${app.id}`)
      if (res.ok) {
        const detail = await res.json()
        if (detail.application) setSelectedApp(detail.application)
        setSelectedNotes(detail.notes || [])
        setSelectedHistory(detail.history || [])
      }
    } catch {
      toast.error('فشل تحميل التفاصيل')
    } finally {
      setDetailLoading(false)
    }
  }

  const closeApp = () => {
    setSelectedApp(null)
    setSelectedNotes([])
    setSelectedHistory([])
  }

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success(`تم تغيير الحالة إلى ${statusLabels[status]}`)
      setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a))
      if (selectedApp?.id === id) {
        setSelectedApp((prev) => prev ? { ...prev, status } : null)
        // refresh history after status change
        const detailRes = await fetch(`/api/admin/applications/${id}`)
        if (detailRes.ok) {
          const detail = await detailRes.json()
          setSelectedHistory(detail.history || [])
        }
      }
      loadData()
    } catch {
      toast.error('فشل تحديث الحالة')
    }
  }

  const saveNote = async () => {
    if (!selectedApp || !noteText.trim()) return
    setSavingNote(true)
    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: noteText }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      toast.success('تم حفظ الملاحظة')
      setNoteText('')
      if (data.note) setSelectedNotes((prev) => [data.note, ...prev])
    } catch {
      toast.error('فشل حفظ الملاحظة')
    } finally {
      setSavingNote(false)
    }
  }

  const deleteNote = async (noteId: string) => {
    if (!selectedApp) return
    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}?note_id=${noteId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'فشل الحذف')
      }
      setSelectedNotes((prev) => prev.filter((n) => n.id !== noteId))
      toast.success('تم حذف الملاحظة')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل حذف الملاحظة')
    }
  }

  const downloadCV = async () => {
    if (!selectedApp || !selectedApp.cv_file_path) return
    setCvLoading(true)
    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}/cv`)
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'تعذر فتح الملف')
      window.open(data.url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل فتح السيرة الذاتية')
    } finally {
      setCvLoading(false)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const bulkUpdateStatus = async (status: ApplicationStatus) => {
    if (selectedIds.size === 0) return
    try {
      await Promise.all([...selectedIds].map((id) =>
        fetch(`/api/admin/applications/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        })
      ))
      toast.success(`تم تحديث ${selectedIds.size} طلبات`)
      setSelectedIds(new Set())
      loadData()
    } catch {
      toast.error('فشل التحديث الجماعي')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: '#fff' }}>إدارة الطلبات</h1>
          <p className="text-sm mt-1" style={{ color: '#6B6490' }}>مراجعة وتصفية طلبات انضمام المبدعين</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {statsCards.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 text-center cursor-pointer transition-all hover:-translate-y-0.5"
            onClick={() => setFilterStatus(s.key === 'total' ? 'all' : s.key)}
            style={{
              border: filterStatus === (s.key === 'total' ? 'all' : s.key)
                ? `1px solid ${s.color}60`
                : '1px solid rgba(82,52,183,0.25)',
            }}
          >
            <div className="text-2xl font-black mb-1" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>
              {stats ? stats[s.key as keyof Stats] : '—'}
            </div>
            <div className="text-xs" style={{ color: '#6B6490' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 rounded-xl flex items-center gap-4"
            style={{ background: 'rgba(82,52,183,0.15)', border: '1px solid rgba(82,52,183,0.3)' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#fff' }}>
              {selectedIds.size} طلب محدد
            </span>
            <div className="flex gap-2">
              {(['accepted', 'rejected', 'under_review'] as ApplicationStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => bulkUpdateStatus(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(82,52,183,0.2)', color: '#B0A8D4', border: '1px solid rgba(82,52,183,0.3)' }}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="mr-auto text-sm" style={{ color: '#6B6490' }}>
              إلغاء التحديد
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="glass-card p-4 mb-6 flex flex-wrap gap-3 items-center">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="بحث بالاسم أو البريد أو الكود..."
          className="flex-1 min-w-48 px-4 py-2.5 rounded-xl text-sm"
          style={{ background: 'rgba(18,18,42,0.6)' }}
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
          className="px-4 py-2.5 rounded-xl text-sm"
          style={{ width: 'auto' }}
        >
          <option value="all">جميع الحالات</option>
          {Object.entries(statusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select
          value={filterSpecialty}
          onChange={(e) => { setFilterSpecialty(e.target.value); setPage(1) }}
          className="px-4 py-2.5 rounded-xl text-sm"
          style={{ width: 'auto' }}
        >
          <option value="all">جميع التخصصات</option>
          {Object.entries(specialtyLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select
          value={filterLevel}
          onChange={(e) => { setFilterLevel(e.target.value); setPage(1) }}
          className="px-4 py-2.5 rounded-xl text-sm"
          style={{ width: 'auto' }}
        >
          <option value="all">جميع المستويات</option>
          {Object.entries(levelLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#5234B7', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(82,52,183,0.2)' }}>
                <th className="p-4 text-right w-10">
                  <input
                    type="checkbox"
                    onChange={(e) => setSelectedIds(e.target.checked ? new Set(applications.map((a) => a.id)) : new Set())}
                    className="rounded"
                    style={{ width: 'auto', padding: '0' }}
                  />
                </th>
                {['المتقدم', 'التخصص', 'المستوى', 'التاريخ', 'الحالة', 'إجراء'].map((h) => (
                  <th key={h} className="p-4 text-right text-xs font-semibold" style={{ color: '#6B6490' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="transition-colors cursor-pointer"
                  style={{
                    borderBottom: '1px solid rgba(82,52,183,0.1)',
                    background: hoveredRow === app.id ? 'rgba(82,52,183,0.08)' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredRow(app.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => openApp(app)}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(app.id)}
                      onChange={() => toggleSelect(app.id)}
                      style={{ width: 'auto', padding: '0' }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-sm" style={{ color: '#fff' }}>{app.full_name}</div>
                    <div className="text-xs" style={{ color: '#6B6490' }}>{app.email}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#6B6490', fontFamily: 'Space Grotesk' }}>{app.tracking_code}</div>
                  </td>
                  <td className="p-4 text-sm" style={{ color: '#B0A8D4' }}>{specialtyLabels[app.specialty]}</td>
                  <td className="p-4 text-sm" style={{ color: '#B0A8D4' }}>{levelLabels[app.level]}</td>
                  <td className="p-4 text-sm" style={{ color: '#6B6490' }}>{formatDate(app.created_at)}</td>
                  <td className="p-4"><StatusBadge status={app.status} /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openApp(app)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)' }}
                        title="عرض"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, 'accepted')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399', border: '1px solid rgba(52,211,153,0.2)' }}
                        title="قبول"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, 'rejected')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: 'rgba(248,113,113,0.1)', color: '#F87171', border: '1px solid rgba(248,113,113,0.2)' }}
                        title="رفض"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-sm" style={{ color: '#6B6490' }}>
                    لا توجد طلبات تطابق معايير البحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalCount > 20 && (
          <div className="flex items-center justify-between p-4" style={{ borderTop: '1px solid rgba(82,52,183,0.1)' }}>
            <span className="text-xs" style={{ color: '#6B6490' }}>
              {totalCount} طلب إجمالاً
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs"
                style={{ background: 'rgba(82,52,183,0.1)', color: '#B0A8D4', border: '1px solid rgba(82,52,183,0.2)' }}
              >
                السابق
              </button>
              <span className="px-3 py-1.5 text-xs" style={{ color: '#B0A8D4' }}>صفحة {page}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * 20 >= totalCount}
                className="px-3 py-1.5 rounded-lg text-xs"
                style={{ background: 'rgba(82,52,183,0.1)', color: '#B0A8D4', border: '1px solid rgba(82,52,183,0.2)' }}
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
              onClick={closeApp}
            />

            <motion.div
              key={selectedApp.id}
              initial={{ x: -520, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -520, opacity: 0 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden"
              style={{
                width: '520px',
                background: 'rgba(15,15,34,0.98)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(82,52,183,0.25)',
              }}
            >
              <div
                className="flex items-center justify-between px-6 py-5 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(82,52,183,0.2)' }}
              >
                <h2 className="text-lg font-bold" style={{ color: '#fff' }}>تفاصيل المتقدم</h2>
                <button
                  onClick={closeApp}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(82,52,183,0.1)', color: '#6B6490', border: '1px solid rgba(82,52,183,0.2)' }}
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'الاسم', value: selectedApp.full_name },
                    { label: 'البريد', value: selectedApp.email },
                    { label: 'الجوال', value: selectedApp.phone },
                    { label: 'المدينة', value: selectedApp.city },
                    { label: 'التخصص', value: specialtyLabels[selectedApp.specialty] },
                    { label: 'المستوى', value: levelLabels[selectedApp.level] },
                    { label: 'الخبرة', value: selectedApp.years_of_experience + ' سنوات' },
                    { label: 'كود التتبع', value: selectedApp.tracking_code, mono: true },
                  ].map(({ label, value, mono }) => (
                    <div key={label} className="flex justify-between text-sm py-2" style={{ borderBottom: '1px solid rgba(82,52,183,0.08)' }}>
                      <span style={{ color: '#6B6490' }}>{label}</span>
                      <span style={{ color: '#fff', fontFamily: mono ? 'Space Grotesk' : undefined }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedApp.linkedin_or_github_url && (
                    <a
                      href={selectedApp.linkedin_or_github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
                      style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.25)' }}
                    >
                      🔗 LinkedIn / GitHub
                    </a>
                  )}
                  {selectedApp.portfolio_url && (
                    <a
                      href={selectedApp.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
                      style={{ background: 'rgba(167,139,250,0.1)', color: '#C4B5FD', border: '1px solid rgba(167,139,250,0.25)' }}
                    >
                      🎨 معرض الأعمال
                    </a>
                  )}
                  {selectedApp.cv_file_path && (
                    <button
                      onClick={downloadCV}
                      disabled={cvLoading}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: 'rgba(245,158,11,0.1)',
                        color: '#F59E0B',
                        border: '1px solid rgba(245,158,11,0.25)',
                        opacity: cvLoading ? 0.6 : 1,
                      }}
                    >
                      📄 {cvLoading ? 'جارٍ الفتح...' : 'تحميل السيرة الذاتية'}
                    </button>
                  )}
                </div>

                {selectedApp.bio && (
                  <div className="mb-6 p-3 rounded-xl text-sm leading-relaxed" style={{ background: 'rgba(18,18,42,0.5)', color: '#B0A8D4', border: '1px solid rgba(82,52,183,0.1)' }}>
                    {selectedApp.bio}
                  </div>
                )}

                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>الحالة الحالية</label>
                  <StatusBadge status={selectedApp.status} />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>تغيير الحالة</label>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => updateStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                  >
                    {Object.entries(statusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>

                {/* Status history */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#B0A8D4' }}>سجل تغيير الحالات</label>
                  {detailLoading ? (
                    <p className="text-xs" style={{ color: '#6B6490' }}>جارٍ التحميل...</p>
                  ) : selectedHistory.length === 0 ? (
                    <p className="text-xs" style={{ color: '#6B6490' }}>لا يوجد تغييرات بعد</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedHistory.map((h) => (
                        <div
                          key={h.id}
                          className="p-3 rounded-lg text-xs flex items-center justify-between"
                          style={{ background: 'rgba(18,18,42,0.5)', border: '1px solid rgba(82,52,183,0.1)' }}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            {h.previous_status && (
                              <>
                                <span style={{ color: '#6B6490' }}>{statusLabels[h.previous_status]}</span>
                                <span style={{ color: '#4B4B6B' }}>←</span>
                              </>
                            )}
                            <span style={{ color: '#fff', fontWeight: 600 }}>{statusLabels[h.new_status]}</span>
                          </div>
                          <span style={{ color: '#6B6490' }}>{formatDateTime(h.changed_at)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes list */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#B0A8D4' }}>
                    الملاحظات السابقة {selectedNotes.length > 0 && `(${selectedNotes.length})`}
                  </label>
                  {detailLoading ? (
                    <p className="text-xs" style={{ color: '#6B6490' }}>جارٍ التحميل...</p>
                  ) : selectedNotes.length === 0 ? (
                    <p className="text-xs" style={{ color: '#6B6490' }}>لا توجد ملاحظات بعد</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedNotes.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 rounded-lg text-sm"
                          style={{ background: 'rgba(18,18,42,0.5)', border: '1px solid rgba(82,52,183,0.1)' }}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="text-xs" style={{ color: '#6B6490' }}>{formatDateTime(n.created_at)}</span>
                            <button
                              onClick={() => deleteNote(n.id)}
                              className="text-xs"
                              style={{ color: '#F87171' }}
                              title="حذف"
                            >
                              حذف
                            </button>
                          </div>
                          <p style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>{n.note_text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add note */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>إضافة ملاحظة</label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={3}
                    maxLength={1000}
                    className="w-full px-3 py-2 rounded-xl text-sm"
                    placeholder="اكتب ملاحظتك هنا..."
                  />
                </div>
              </div>

              <div
                className="flex-shrink-0 p-5 flex gap-3"
                style={{ borderTop: '1px solid rgba(82,52,183,0.2)', background: 'rgba(15,15,34,0.98)' }}
              >
                <button
                  onClick={saveNote}
                  disabled={savingNote || !noteText.trim()}
                  className="gradient-btn flex-1 py-3 text-white text-sm font-bold"
                  style={{ borderRadius: '10px' }}
                >
                  {savingNote ? 'جارٍ الحفظ...' : 'حفظ الملاحظة'}
                </button>
                <button
                  onClick={() => updateStatus(selectedApp.id, 'accepted')}
                  className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}
                >
                  قبول
                </button>
                <button
                  onClick={() => updateStatus(selectedApp.id, 'rejected')}
                  className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(248,113,113,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}
                >
                  رفض
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
