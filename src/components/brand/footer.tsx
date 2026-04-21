import { EtraLogo } from './etra-logo'

export function Footer() {
  return (
    <footer className="mt-16 pb-8 px-6">
      <div className="flex flex-col items-center gap-3">
        <EtraLogo size="sm" className="items-center" />
        <div className="flex gap-6 text-xs" style={{ color: '#6B6490' }}>
          <span className="cursor-pointer hover:text-white transition-colors">سياسة الخصوصية</span>
          <span className="cursor-pointer hover:text-white transition-colors">الشروط والأحكام</span>
          <span className="cursor-pointer hover:text-white transition-colors">اتصل بنا</span>
        </div>
        <p className="text-xs" style={{ color: '#6B6490' }}>
          © 2026 إترا للتمكين التقني. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  )
}
