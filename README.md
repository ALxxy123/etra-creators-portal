# ETRA Creators Portal

Arabic RTL portal for creator applications. It includes a public registration flow, CV upload, tracking code lookup, admin review dashboard, platform settings, and email notifications.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, and Storage
- Nodemailer via Gmail App Password
- Optional Cloudflare Turnstile

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill the Supabase and email values.

3. Apply the SQL in `supabase/migrations/001_initial_schema.sql` to your Supabase project.

4. Create the first admin user in Supabase Auth, then insert that user id into `public.admin_users`.

5. Run locally:

   ```bash
   npm run dev
   ```

## Environment

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_APP_URL`

Optional anti-bot protection:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

If Turnstile keys are omitted, the app still runs and keeps server-side rate limits plus a honeypot field.

## Security Notes

- Public application, CV upload, and tracking routes are rate limited per client IP.
- CV uploads are capped at 5 MB and validated using PDF magic bytes.
- Admin routes validate the Supabase session and check `public.admin_users` server-side.
- Email notifications obey the `email_notifications` platform setting.
- For high traffic production, replace the in-memory rate limiter with Redis, Upstash, or a database-backed limiter.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npx tsc --noEmit
```
