export function getAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (!raw) return 'https://etra-creators.vercel.app'
  return raw.replace(/\/+$/, '')
}
