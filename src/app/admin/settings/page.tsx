'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

interface PlatformSettings {
  allow_registrations: boolean
  email_notifications: boolean
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

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [savingPwd, setSavingPwd] = useState(false)

  const [settings, setSettings] = useState<PlatformSettings>({
    allow_registrations: true,
    email_notifications: true,
  })
  const [toggling, setToggling] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  useEffect(() => {
    async function load() {
      const [{ data: userData }, { data: settingsData }] = await Promise.all([
        supabase.auth.getUser(),
        db.from('platform_settings').select('key, value'),
      ])

      setUserEmail(userData.user?.email || '')

      if (settingsData) {
        const map: Partial<PlatformSettings> = {}
        for (const row of settingsData as { key: string; value: boolean }[]) {
          map[row.key as keyof PlatformSettings] = row.value
        }
        setSettings(prev => ({ ...prev, ...map }))
      }

      setLoading(false)
    }
    load()
  }, [])

  async function handleToggle(key: keyof PlatformSettings) {
    const newValue = !settings[key]
    setToggling(key)
    setSettings(prev => ({ ...prev, [key]: newValue }))

    const { error } = await db
      .from('platform_settings')
      .update({ value: newValue, updated_at: new Date().toISOString() })
      .eq('key', key)

    if (error) {
      // Revert on failure
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

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <div style={{ color: '#6B6490', fontSize: '14px' }}>جارٍ التحميل...</div>
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-black mb-2" style={{ color: '#fff' }}>إعدادات النظام</h1>
      <p className="text-sm mb-8" style={{ color: '#6B6490' }}>إدارة حساب المدير وإعدادات المنصة</p>

      <div className="max-w-xl space-y-6">

        {/* Account Info */}
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

        {/* Change Password */}
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

        {/* Platform Settings */}
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

                  {/* Toggle */}
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

      </div>
    </div>
  )
}
