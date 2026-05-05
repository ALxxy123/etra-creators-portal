'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import type { AdminRole } from '@/types/database'

interface PlatformSettings {
  allow_registrations: boolean
  email_notifications: boolean
}

interface AdminEntry {
  user_id: string
  email: string | null
  role: AdminRole
  created_at: string
}

const SETTINGS_META: { key: keyof PlatformSettings; label: string; desc: string }[] = [
  {
    key: 'allow_registrations',
    label: 'السماح بالتسجيلات الجديدة',
    desc: 'تفعيل أو تعطيل نموذج التسجيل للمبدعين الجدد',
  },
  {
    key: 'email_notifications',
    label: 'الإشعارات البريدية',
    desc: 'إرسال إشعار فوري عند وصول طلب جديد',
  },
]

const ROLE_LABELS: Record<AdminRole, string> = {
  admin: 'مدير',
  reviewer: 'مراجع',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [savingPwd, setSavingPwd] = useState(false)

  const [settings, setSettings] = useState<PlatformSettings>({
    allow_registrations: true,
    email_notifications: true,
  })
  const [toggling, setToggling] = useState<string | null>(null)

  const [admins, setAdmins] = useState<AdminEntry[] | null>(null)
  const [adminsLoading, setAdminsLoading] = useState(false)
  const [forbidden, setForbidden] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('reviewer')
  const [addingAdmin, setAddingAdmin] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const loadAdmins = useCallback(async () => {
    setAdminsLoading(true)
    try {
      const res = await fetch('/api/admin/admins')
      if (res.status === 403) {
        setForbidden(true)
        setAdmins(null)
        return
      }
      if (!res.ok) {
        toast.error('فشل تحميل قائمة الأدمنز')
        return
      }
      const data = await res.json()
      setAdmins(data.admins || [])
      setForbidden(false)
    } catch {
      toast.error('فشل تحميل قائمة الأدمنز')
    } finally {
      setAdminsLoading(false)
    }
  }, [])

  useEffect(() => {
    async function load() {
      const [{ data: userData }, settingsRes] = await Promise.all([
        supabase.auth.getUser(),
        fetch('/api/admin/settings'),
      ])

      setUserEmail(userData.user?.email || '')
      setUserId(userData.user?.id || '')

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json() as PlatformSettings
        setSettings(prev => ({ ...prev, ...settingsData }))
      }

      setLoading(false)
      void loadAdmins()
    }
    load()
  }, [loadAdmins])

  async function handleToggle(key: keyof PlatformSettings) {
    const newValue = !settings[key]
    setToggling(key)
    setSettings(prev => ({ ...prev, [key]: newValue }))

    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: newValue }),
    })

    if (!res.ok) {
      setSettings(prev => ({ ...prev, [key]: !newValue }))
      toast.error('فشل حفظ الإعداد')
    } else {
      toast.success(newValue ? 'تم التفعيل' : 'تم التعطيل')
    }

    setToggling(null)
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }
    setSavingPwd(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      toast.error('فشل تحديث كلمة المرور')
    } else {
      toast.success('تم تحديث كلمة المرور بنجاح')
      setNewPassword('')
    }
    setSavingPwd(false)
  }

  const handleAddAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = newAdminEmail.trim().toLowerCase()
    if (!email) return
    setAddingAdmin(true)
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: newAdminRole }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'فشل إضافة الأدمن')
      toast.success('تمت إضافة الأدمن بنجاح')
      setNewAdminEmail('')
      setNewAdminRole('reviewer')
      void loadAdmins()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل إضافة الأدمن')
    } finally {
      setAddingAdmin(false)
    }
  }

  const handleRemoveAdmin = async (id: string) => {
    if (id === userId) {
      toast.error('لا يمكنك إزالة نفسك')
      return
    }
    if (!confirm('هل أنت متأكد من إزالة هذا الأدمن؟')) return
    setRemovingId(id)
    try {
      const res = await fetch(`/api/admin/admins?user_id=${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'فشل الإزالة')
      }
      toast.success('تمت إزالة الأدمن')
      setAdmins((prev) => (prev ? prev.filter((a) => a.user_id !== id) : prev))
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل الإزالة')
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <div style={{ color: '#6B6490', fontSize: '14px' }}>جارٍ التحميل...</div>
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-black mb-2" style={{ color: '#fff' }}>إعدادات النظام</h1>
      <p className="text-sm mb-8" style={{ color: '#6B6490' }}>إدارة حساب المدير وإعدادات المنصة</p>

      <div className="max-w-2xl space-y-6">

        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#fff' }}>معلومات الحساب</h2>
          <div
            className="p-4 rounded-xl text-sm"
            style={{ background: 'rgba(18,18,42,0.5)', border: '1px solid rgba(82,52,183,0.15)' }}
          >
            <p style={{ color: '#6B6490' }}>البريد الإلكتروني</p>
            <p className="font-semibold mt-1" style={{ color: '#fff' }}>{userEmail}</p>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#fff' }}>تغيير كلمة المرور</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>
                كلمة المرور الجديدة
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl text-sm"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              disabled={savingPwd}
              className="gradient-btn px-6 py-3 rounded-xl text-white font-semibold text-sm"
            >
              {savingPwd ? 'جارٍ الحفظ...' : 'تحديث كلمة المرور'}
            </button>
          </form>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#fff' }}>إعدادات المنصة</h2>
          <div className="space-y-4">
            {SETTINGS_META.map((s) => {
              const isOn = settings[s.key]
              const isLoading = toggling === s.key

              return (
                <div
                  key={s.key}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: 'rgba(18,18,42,0.5)',
                    border: '1px solid rgba(82,52,183,0.15)',
                  }}
                >
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#fff' }}>{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6B6490' }}>{s.desc}</p>
                  </div>

                  <button
                    onClick={() => handleToggle(s.key)}
                    disabled={isLoading}
                    aria-label={s.label}
                    style={{
                      width: '48px',
                      height: '26px',
                      borderRadius: '13px',
                      border: 'none',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      position: 'relative',
                      flexShrink: 0,
                      transition: 'background 0.25s ease',
                      background: isOn
                        ? 'linear-gradient(135deg, #5234B7, #9E59CD)'
                        : 'rgba(255,255,255,0.1)',
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '3px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#fff',
                        transition: 'right 0.25s ease, left 0.25s ease',
                        ...(isOn ? { right: '3px' } : { right: '25px' }),
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </button>
                </div>
              )
            })}
          </div>
          <p className="text-xs mt-4" style={{ color: '#4B4B6B' }}>
            يتم حفظ الإعدادات تلقائياً فور التبديل
          </p>
        </div>

        {/* Admin management */}
        {!forbidden && (
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold mb-1" style={{ color: '#fff' }}>إدارة الأدمنز</h2>
            <p className="text-xs mb-5" style={{ color: '#6B6490' }}>
              أضف أدمنز جدد أو أزل صلاحياتهم. الأدمنز الجدد سيستلمون رابط دعوه على بريدهم.
            </p>

            <form onSubmit={handleAddAdmin} className="flex flex-wrap gap-3 mb-6">
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                required
                placeholder="email@example.com"
                dir="ltr"
                className="flex-1 min-w-48 px-4 py-3 rounded-xl text-sm"
              />
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value as AdminRole)}
                className="px-4 py-3 rounded-xl text-sm"
                style={{ width: 'auto' }}
              >
                <option value="reviewer">{ROLE_LABELS.reviewer}</option>
                <option value="admin">{ROLE_LABELS.admin}</option>
              </select>
              <button
                type="submit"
                disabled={addingAdmin}
                className="gradient-btn px-6 py-3 rounded-xl text-white font-semibold text-sm"
              >
                {addingAdmin ? 'جارٍ الإضافة...' : 'إضافة'}
              </button>
            </form>

            {adminsLoading && (
              <p className="text-xs" style={{ color: '#6B6490' }}>جارٍ التحميل...</p>
            )}

            {!adminsLoading && admins && admins.length > 0 && (
              <div className="space-y-2">
                {admins.map((a) => (
                  <div
                    key={a.user_id}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(18,18,42,0.5)', border: '1px solid rgba(82,52,183,0.15)' }}
                  >
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#fff' }}>
                        {a.email || '—'}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#6B6490' }}>
                        {ROLE_LABELS[a.role]} · أُضيف {formatDate(a.created_at)}
                        {a.user_id === userId && ' · أنت'}
                      </p>
                    </div>
                    {a.user_id !== userId && (
                      <button
                        onClick={() => handleRemoveAdmin(a.user_id)}
                        disabled={removingId === a.user_id}
                        className="px-3 py-2 rounded-lg text-xs font-semibold"
                        style={{
                          background: 'rgba(248,113,113,0.1)',
                          color: '#F87171',
                          border: '1px solid rgba(248,113,113,0.25)',
                          opacity: removingId === a.user_id ? 0.6 : 1,
                        }}
                      >
                        {removingId === a.user_id ? 'جارٍ...' : 'إزالة'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!adminsLoading && admins && admins.length === 0 && (
              <p className="text-xs" style={{ color: '#6B6490' }}>لا يوجد أدمنز</p>
            )}
          </div>
        )}

        {forbidden && (
          <div
            className="glass-card p-5 text-sm"
            style={{ color: '#B0A8D4', borderColor: 'rgba(245,158,11,0.3)' }}
          >
            ℹ️ إدارة الأدمنز متاحه فقط لأصحاب صلاحية &quot;مدير&quot;.
          </div>
        )}

      </div>
    </div>
  )
}
