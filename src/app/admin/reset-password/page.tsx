'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { EtraLogo } from '@/components/brand/etra-logo'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let mounted = true

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (!mounted) return
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true)
      }
    })

    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) setReady(true)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.length < 8) {
      toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }
    if (password !== confirmPassword) {
      toast.error('كلمات المرور غير متطابقة')
      return
    }
    setSubmitting(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      toast.success('تم تحديث كلمة المرور بنجاح')
      router.push('/admin')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل تحديث كلمة المرور')
    } finally {
      setSubmitting(false)
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
          <h1 className="text-2xl font-black text-center mb-2" style={{ color: '#fff' }}>تعيين كلمة مرور جديدة</h1>
          <p className="text-center text-sm mb-8" style={{ color: '#6B6490' }}>
            أدخل كلمة مرور جديدة لحسابك
          </p>

          {!ready ? (
            <p className="text-center text-sm" style={{ color: '#6B6490' }}>
              جارٍ التحقق من الرابط...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#B0A8D4' }}>
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="gradient-btn w-full py-3 rounded-xl text-white font-bold"
              >
                {submitting ? 'جارٍ الحفظ...' : 'حفظ كلمة المرور الجديدة'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
