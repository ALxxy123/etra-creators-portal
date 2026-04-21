import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Verify connection on startup (dev only)
if (process.env.NODE_ENV === 'development') {
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Gmail SMTP connection failed:', error)
    } else {
      console.log('✅ Gmail SMTP connected — etrahub@gmail.com ready')
    }
  })
}
