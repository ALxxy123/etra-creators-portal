import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Navbar } from '@/components/brand/navbar'
import { createAdminClient } from '@/lib/supabase/admin'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'طلب الانضمام | بوابة مبدعي إترا',
  description: 'انضم إلى شبكة مبدعي إترا — التسويق والعقود والعملاء علينا.',
}

async function getRegistrationsOpen(): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any
    const { data } = await supabase
      .from('platform_settings')
      .select('value')
      .eq('key', 'allow_registrations')
      .single()
    return data?.value !== false
  } catch {
    return true // fail open
  }
}

export default async function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Allow success page even when registrations are closed
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || ''
  const isSuccessPage = pathname.includes('/register/success')

  const isOpen = await getRegistrationsOpen()

  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>
      <Navbar />
      {isOpen || isSuccessPage ? (
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
      ) : (
        <RegistrationsClosed />
      )}
    </div>
  )
}

function RegistrationsClosed() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        direction: 'rtl',
        fontFamily: 'Tajawal, sans-serif',
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 600px 400px at 75% 20%, rgba(82,52,183,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 400px 300px at 15% 75%, rgba(158,89,205,0.10) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '520px', textAlign: 'center', position: 'relative' }}>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <Image
            src="/etra-logo.png"
            alt="إترا"
            width={110}
            height={38}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Icon */}
        <div style={{
          width: '88px',
          height: '88px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(82,52,183,0.2), rgba(158,89,205,0.15))',
          border: '1px solid rgba(82,52,183,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 1.5C8.41 1.5 5.5 4.41 5.5 8v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-1.5V8c0-3.59-2.91-6.5-6.5-6.5Zm0 2C14.48 3.5 16.5 5.52 16.5 8v1h-9V8C7.5 5.52 9.52 3.5 12 3.5Zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
              fill="rgba(158,89,205,0.8)"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#fff',
          margin: '0 0 12px',
          lineHeight: 1.3,
        }}>
          التسجيل مغلق حالياً
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#8B82B8',
          margin: '0 0 8px',
          lineHeight: 1.7,
        }}>
          نشكرك على اهتمامك بالانضمام إلى شبكة مبدعي إترا
        </p>
        <p style={{
          fontSize: '15px',
          color: '#6B6490',
          margin: '0 0 40px',
          lineHeight: 1.7,
        }}>
          تابعنا على منصاتنا لتكون أول من يعلم عند فتح باب التسجيل القادم
        </p>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(82,52,183,0.4), transparent)',
          margin: '0 auto 36px',
          width: '80%',
        }} />

        {/* CTA */}
        <p style={{ fontSize: '14px', color: '#B0A8D4', marginBottom: '20px', fontWeight: '600' }}>
          تابع حساباتنا وابقَ على اطلاع
        </p>

        <a
          href="https://linktr.ee/etrahub"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 36px',
            background: 'linear-gradient(135deg, #5234B7, #9E59CD)',
            borderRadius: '14px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Tajawal, sans-serif',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(82,52,183,0.35)',
            transition: 'opacity 0.2s',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M13 3L21 12L13 21M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          تابع حسابات إترا
        </a>

        <p style={{
          fontSize: '12px',
          color: '#4B4B6B',
          marginTop: '32px',
        }}>
          linktr.ee/etrahub
        </p>
      </div>
    </div>
  )
}
