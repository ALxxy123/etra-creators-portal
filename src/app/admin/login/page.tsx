'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { EtraLogo } from '@/components/brand/etra-logo'

type LoginMethod = 'password' | 'otp'
type OtpStep = 'email' | 'verify'

export default function AdminLoginPage() {
  const router = useRouter()
  const [method, setMethod] = useState<LoginMethod>('password')
  const [otpStep, setOtpStep] = useState<OtpStep>('email')

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [password, setPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError || !data.user) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      setLoading(false)
      return
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', data.user.id)
      .single()

    if (!adminData) {
      await supabase.auth.signOut()
      setError('ليس لديك صلاحية الوصول إلى لوحة التحكم')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    })

    if (otpError) {
      setError('فشل إرسال الرمز. تأكد من البريد الإلكتروني.')
      setLoading(false)
      return
    }

    setSuccess(`تم إرسال رمز OTP إلى ${email}`)
    setOtpStep('verify')
    setLoading(false)
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'email',
    })

    if (verifyError || !data.user) {
      setError('الرمز غير صحيح أو منتهي الصلاحية. حاول مجدداً.')
      setLoading(false)
      return
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', data.user.id)
      .single()

    if (!adminData) {
      await supabase.auth.signOut()
      setError('ليس لديك صلاحية الوصول إلى لوحة التحكم')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(13,13,26,0.8)',
    border: '1px solid rgba(82,52,183,0.3)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Tajawal, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    textAlign: 'right',
  }

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '14px',
    background: disabled
      ? 'rgba(82,52,183,0.4)'
      : 'linear-gradient(135deg, #5234B7, #9E59CD)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '700',
    fontFamily: 'Tajawal, sans-serif',
    cursor: disabled ? 'not-allowed' : 'pointer',
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      direction: 'rtl',
      fontFamily: 'Tajawal, sans-serif',
    }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(ellipse 700px 500px at 80% 20%, rgba(82,52,183,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 500px 400px at 10% 80%, rgba(158,89,205,0.12) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#12122A',
        border: '1px solid rgba(82,52,183,0.25)',
        borderRadius: '20px',
        padding: '40px 36px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <EtraLogo size="lg" />
        </div>
        <p style={{ fontSize: '13px', color: '#6B6490', margin: '0 0 28px', textAlign: 'center' }}>
          لوحة تحكم مبدعي إترا
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(13,13,26,0.6)',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '28px',
        }}>
          {([
            { key: 'password', label: 'كلمة المرور' },
            { key: 'otp', label: 'رمز OTP' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setMethod(tab.key)
                setError('')
                setSuccess('')
                setOtpStep('email')
                setOtpCode('')
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Tajawal, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: method === tab.key
                  ? 'linear-gradient(135deg, #5234B7, #9E59CD)'
                  : 'transparent',
                color: method === tab.key ? '#fff' : '#6B6490',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Password form */}
        {method === 'password' && (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#B0A8D4', marginBottom: '8px', fontWeight: '500' }}>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@etra.sa"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#B0A8D4', marginBottom: '8px', fontWeight: '500' }}>
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ ...inputStyle, fontSize: '15px', letterSpacing: '2px' }}
              />
            </div>

            {error && <ErrorBox message={error} />}

            <button type="submit" disabled={loading} style={btnStyle(loading)}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        )}

        {/* OTP form */}
        {method === 'otp' && (
          <div>
            {otpStep === 'email' && (
              <form onSubmit={handleSendOtp}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#B0A8D4', marginBottom: '8px', fontWeight: '500' }}>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@etra.sa"
                    required
                    style={inputStyle}
                  />
                  <p style={{ fontSize: '12px', color: '#6B6490', marginTop: '8px', marginBottom: 0 }}>
                    سيصلك رمز مكون من 6 أرقام على بريدك الإلكتروني
                  </p>
                </div>

                {error && <ErrorBox message={error} />}

                <button type="submit" disabled={loading} style={btnStyle(loading)}>
                  {loading ? 'جاري الإرسال...' : 'إرسال رمز OTP ←'}
                </button>
              </form>
            )}

            {otpStep === 'verify' && (
              <form onSubmit={handleVerifyOtp}>
                {success && (
                  <div style={{
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#34D399',
                    fontSize: '13px',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}>
                    ✅ {success}
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#B0A8D4', marginBottom: '8px', fontWeight: '500' }}>
                    رمز التحقق (6 أرقام)
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    required
                    autoFocus
                    style={{
                      ...inputStyle,
                      fontSize: '28px',
                      fontWeight: '800',
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      letterSpacing: '8px',
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#6B6490', marginTop: '8px', marginBottom: 0, textAlign: 'center' }}>
                    الرمز صالح لمدة 10 دقائق
                  </p>
                </div>

                {error && <ErrorBox message={error} />}

                <button
                  type="submit"
                  disabled={loading || otpCode.length !== 6}
                  style={btnStyle(loading || otpCode.length !== 6)}
                >
                  {loading ? 'جاري التحقق...' : 'تأكيد الدخول ✓'}
                </button>

                <button
                  type="button"
                  onClick={() => { setOtpStep('email'); setOtpCode(''); setError(''); setSuccess('') }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '10px',
                    background: 'transparent',
                    border: '1px solid rgba(82,52,183,0.25)',
                    borderRadius: '10px',
                    color: '#6B6490',
                    fontSize: '13px',
                    fontFamily: 'Tajawal, sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  ← إعادة إرسال الرمز
                </button>
              </form>
            )}
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#4B4B6B', marginTop: '24px', marginBottom: 0 }}>
          لوحة تحكم إترا — للمدراء المعتمدين فقط
        </p>
      </div>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#F87171',
      fontSize: '13px',
      marginBottom: '16px',
    }}>
      ⚠️ {message}
    </div>
  )
}
