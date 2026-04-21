'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { EtraLogo } from '@/components/brand/etra-logo'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

const navItems = [
  { href: '/admin', label: 'الطلبات', icon: '📋', exact: true },
  { href: '/admin/creators', label: 'المبدعون المقبولون', icon: '✅', exact: false },
  { href: '/admin/stats', label: 'الإحصائيات', icon: '📊', exact: false },
  { href: '/admin/settings', label: 'الإعدادات', icon: '⚙️', exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('تم تسجيل الخروج')
    router.push('/admin/login')
  }

  return (
    <aside
      className="min-h-screen flex flex-col p-6 fixed right-0 top-0 bottom-0 z-40"
      style={{
        width: '260px',
        background: '#0F0F22',
        borderLeft: '1px solid rgba(82,52,183,0.2)',
      }}
    >
      <div className="mb-8">
        <EtraLogo size="sm" />
        <p className="text-xs mt-2" style={{ color: '#6B6490' }}>لوحة إدارة المبدعين</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium"
              style={{
                background: isActive ? 'rgba(82,52,183,0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(82,52,183,0.4)' : '1px solid transparent',
                color: isActive ? '#fff' : '#B0A8D4',
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mt-4 transition-colors w-full"
        style={{ color: '#F87171', background: 'rgba(248,113,113,0.05)' }}
      >
        <span>🚪</span>
        تسجيل الخروج
      </button>
    </aside>
  )
}
