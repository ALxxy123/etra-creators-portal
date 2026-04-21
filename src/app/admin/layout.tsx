import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/sidebar'

export const metadata: Metadata = {
  title: 'لوحة تحكم مبدعي إترا',
  description: 'إدارة طلبات الانضمام لشبكة مبدعي إترا.',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#0D0D1A', direction: 'rtl' }}>
      <AdminSidebar />
      <main className="flex-1 p-8 min-h-screen" style={{ marginRight: '260px' }}>
        {children}
      </main>
    </div>
  )
}
