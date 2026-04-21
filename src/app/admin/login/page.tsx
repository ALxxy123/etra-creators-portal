'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { EtraLogo } from '@/components/brand/etra-logo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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
        </div>
      </motion.div>
    </div>
  )
}
