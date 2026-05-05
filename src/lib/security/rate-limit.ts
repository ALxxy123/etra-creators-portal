import type { NextRequest } from 'next/server'

interface RateLimitOptions {
  limit: number
  windowMs: number
}

interface RateLimitBucket {
  count: number
  resetAt: number
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfter: number
}

const buckets = new Map<string, RateLimitBucket>()

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < 1000) return

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    forwardedFor ||
    'unknown'
  )
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  cleanupExpiredBuckets(now)

  const existing = buckets.get(key)
  const bucket = existing && existing.resetAt > now
    ? existing
    : { count: 0, resetAt: now + options.windowMs }

  bucket.count += 1
  buckets.set(key, bucket)

  const remaining = Math.max(options.limit - bucket.count, 0)
  const retryAfter = Math.max(Math.ceil((bucket.resetAt - now) / 1000), 1)

  return {
    allowed: bucket.count <= options.limit,
    limit: options.limit,
    remaining,
    resetAt: bucket.resetAt,
    retryAfter,
  }
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    'Retry-After': String(result.retryAfter),
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  }
}
