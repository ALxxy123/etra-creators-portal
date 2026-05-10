'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EtraLogo } from './etra-logo'

export function Navbar() {
  const pathname = usePathname()
  const isPortalActive =
    pathname === '/' ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/track')

  return (
    <nav
      dir="ltr"
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{
        background: 'rgba(13,13,26,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(82,52,183,0.2)',
        height: '110px',
      }}
    >
      {/* Left: Logo */}
      <Link href="/" className="flex-shrink-0">
        <EtraLogo size="sm" />
      </Link>

      {/* Right: Active section link */}
      <Link
        href="/"
        className="relative py-1 text-sm font-semibold"
        style={{ color: isPortalActive ? '#fff' : '#B0A8D4' }}
      >
        بوابة المبدعين
        {isPortalActive && (
          <span
            className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)' }}
          />
        )}
      </Link>
    </nav>
  )
}
