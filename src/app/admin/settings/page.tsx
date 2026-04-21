'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [savingPwd, setSavingPwd] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || '')
      setLoading(false)
    })
  }, [])

  const handleChangePassword = async (e: React.FormEvent) => {
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

  if (loading) return null

  return (
    <div>
      <h1 className="text-3xl font-black mb-2" style={{ color: '#fff' }}>إعدادات النظام</h1>
      <p className="text-sm mb-8" style={{ color: '#6B6490' }}>إدارة حساب المدير وإعدادات المنصة</p>

      <div className="max-w-xl space-y-6">
        {/* Account Info */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#fff' }}>معلومات الحساب</h2>
          <div className="p-4 rounded-xl text-sm" style={{ background: 'rgba(18,18,42,0.5)', border: '1px solid rgba(82,52,183,0.15)' }}>
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
            {[
              { label: 'السماح بالتسجيلات الجديدة', desc: 'تفعيل أو تعطيل نموذج التسجيل للمبدعين الجدد' },
              { label: 'الإشعارات البريدية', desc: 'إرسال إشعار فوري عند وصول طلب جديد' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'rgba(18,18,42,0.5)', border: '1px solid rgba(82,52,183,0.15)' }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: '#fff' }}>{s.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6B6490' }}>{s.desc}</p>
                </div>
                <div
                  className="w-11 h-6 rounded-full cursor-pointer relative transition-colors"
                  style={{ background: 'rgba(82,52,183,0.4)' }}
                >
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
