import type { Metadata } from 'next'
import { Navbar } from '@/components/brand/navbar'

export const metadata: Metadata = {
  title: 'طلب الانضمام | بوابة مبدعي إترا',
  description: 'انضم إلى شبكة مبدعي إترا — التسويق والعقود والعملاء علينا.',
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
