'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { EtraLogo } from '@/components/brand/etra-logo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [sendingReset, setSendingReset] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', data.user.id)
        .single()

      if (!adminUser) {
        await supabase.auth.signOut()
        toast.error('ليس لديك صلاحية الوصول للوحة التحكم')
        return
      }

      router.push('/admin')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  const handleSendReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!resetEmail.trim()) return
    setSendingReset(true)
    try {
      const redirectTo = `${window.location.origin}/admin/reset-password`
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo,
      })
      if (error) throw error
      toast.success('تم إرسال رابط استرجاع كلمة المرور إلى بريدك')
      setShowReset(false)
      setResetEmail('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل إرسال الرابط')
    } finally {
      setSendingReset(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0D0D1A' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-10">
          <div className="flex justify-center mb-8">
            <EtraLogo size="lg" className="items-center" />
          </div>

          <AnimatePresence mode="wait">
            {!showReset ? (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-2xl font-black text-center mb-2" style={{ color: '#fff' }}>لوحة التحكم</h1>
                <p className="text-center text-sm mb-8" style={{ color: '#6B6490' }}>تسجيل دخول المدير</p>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="admin@etra.sa"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>كلمة المرور</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="••••••••"
                      dir="ltr"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="gradient-btn w-full py-3 rounded-xl text-white font-bold"
                  >
                    {loading ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="w-full mt-4 text-xs font-semibold transition-colors"
                  style={{ color: '#9E59CD' }}
                >
                  نسيت كلمة المرور؟
                </button>
              </motion.div>
            ) : (
              <motion.div key="reset" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-2xl font-black text-center mb-2" style={{ color: '#fff' }}>استرجاع كلمة المرور</h1>
                <p className="text-center text-sm mb-8" style={{ color: '#6B6490' }}>
                  أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة التعيين
                </p>

                <form onSubmit={handleSendReset} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="admin@etra.sa"
                      dir="ltr"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sendingReset}
                    className="gradient-btn w-full py-3 rounded-xl text-white font-bold"
                  >
                    {sendingReset ? 'جارٍ الإرسال...' : 'إرسال رابط الاسترجاع'}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setShowReset(false)}
                  className="w-full mt-4 text-xs font-semibold"
                  style={{ color: '#6B6490' }}
                >
                  ← العودة لتسجيل الدخول
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
