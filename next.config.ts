import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function getSupabaseOrigin() {
  const fallback = 'https://kfccxnpqozmndakzxtnq.supabase.co'
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!rawUrl) return fallback

  try {
    return new URL(rawUrl).origin
  } catch {
    return fallback
  }
}

const supabaseOrigin = getSupabaseOrigin()
const supabaseRealtimeOrigin = supabaseOrigin.replace(/^http/, 'ws')
const turnstileOrigin = 'https://challenges.cloudflare.com'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${turnstileOrigin}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      `img-src 'self' data: ${supabaseOrigin} https://i.ibb.co`,
      `connect-src 'self' ${supabaseOrigin} ${supabaseRealtimeOrigin} ${turnstileOrigin}`,
      `frame-src ${turnstileOrigin}`,
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: new URL(supabaseOrigin).hostname },
      { protocol: 'https', hostname: 'i.ibb.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
