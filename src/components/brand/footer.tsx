import Link from 'next/link'
import { EtraLogo } from './etra-logo'

const WHATSAPP_NUMBER = '966551459985'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً إترا، أود الاستفسار عن')}`

export function Footer() {
  const linkClass = 'text-xs transition-colors hover:text-white'
  const linkStyle = { color: '#6B6490' }

  return (
    <footer className="mt-16 pb-8 px-6">
      <div className="flex flex-col items-center gap-3">
        <EtraLogo size="sm" className="items-center" />
        <div className="flex gap-6 text-xs">
          <Link href="/privacy" className={linkClass} style={linkStyle}>
            سياسة الخصوصية
          </Link>
          <Link href="/terms" className={linkClass} style={linkStyle}>
            الشروط والأحكام
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={linkStyle}
          >
            اتصل بنا
          </a>
        </div>
        <p className="text-xs" style={{ color: '#6B6490' }}>
          © 2026 إترا للتمكين التقني. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  )
}
