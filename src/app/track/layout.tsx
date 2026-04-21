import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'تتبع حالة طلبك | إترا',
  description: 'تتبع حالة طلب انضمامك إلى شبكة مبدعي إترا باستخدام رمز التتبع.',
}

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
