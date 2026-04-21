# بوابة مبدعي إترا للتمكين التقني

منصة تسجيل واختيار المبدعين التقنيين لشركة إترا للتمكين التقني.

## المميزات

- تسجيل متعدد الخطوات (معايير ← بنود ← نموذج ← تأكيد)
- نظام كود التتبع لمتابعة حالة الطلب
- رفع السيرة الذاتية PDF إلى Supabase Storage
- لوحة تحكم إدارية كاملة مع فلترة وبحث وتحديث الحالات
- تصميم داكن بنظام ألوان إترا (RTL عربي كامل)

## متغيرات البيئة

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## هيكل قاعدة البيانات

### الجداول

- `creator_applications` - طلبات التسجيل مع كود التتبع
- `application_status_history` - تاريخ تغييرات الحالة
- `application_notes` - ملاحظات المدير
- `admin_users` - مستخدمو لوحة التحكم

### الدوال (RPC)

- `check_application_status(tracking_code)` - للتحقق من حالة الطلب
- `generate_tracking_code()` - trigger لتوليد كود التتبع تلقائياً

### Views

- `application_stats` - إحصائيات الطلبات

### Storage

- `creator-cvs` - bucket لتخزين ملفات PDF

## النشر على Vercel

1. اربط المستودع بـ Vercel
2. أضف متغيرات البيئة في إعدادات المشروع
3. انشر المشروع

## Getting Started (Development)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
