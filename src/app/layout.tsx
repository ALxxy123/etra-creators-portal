import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'مبدعين إترا | شبكة التنفيذ التقنية',
  description:
    'مبدعين إترا: شبكة تنفيذ تقنية احترافية تحت إدارة إترا، تجمع المطورين والمصممين وصنّاع المنتجات للعمل على مشاريع حقيقية بمنهجية واضحة، عقود رسمية، وتوزيع أرباح عادل.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen" style={{ background: '#0D0D1A', color: '#fff' }}>
        {children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#1A1A35',
              border: '1px solid rgba(82,52,183,0.3)',
              color: '#fff',
              fontFamily: 'Tajawal, sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
