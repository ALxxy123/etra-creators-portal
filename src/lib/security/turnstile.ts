interface TurnstileVerifyResponse {
  success: boolean
  'error-codes'?: string[]
}

let warned = false

export async function verifyTurnstileToken(token: unknown, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    if (process.env.NODE_ENV === 'production' && !warned) {
      console.warn('[turnstile] TURNSTILE_SECRET_KEY is not set — captcha verification is disabled. Set it in your hosting environment to harden the form against bots.')
      warned = true
    }
    return { ok: true, skipped: true }
  }

  if (typeof token !== 'string' || token.trim().length < 20) {
    return { ok: false, reason: 'captcha_required' as const }
  }

  try {
    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token.trim())
    if (remoteIp !== 'unknown') formData.append('remoteip', remoteIp)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) return { ok: false, reason: 'captcha_unavailable' as const }

    const data = await res.json() as TurnstileVerifyResponse
    return data.success
      ? { ok: true, skipped: false }
      : { ok: false, reason: data['error-codes']?.[0] ?? 'captcha_failed' }
  } catch {
    return { ok: false, reason: 'captcha_unavailable' as const }
  }
}
