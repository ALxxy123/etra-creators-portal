import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const specialtyLabels: Record<string, string> = {
  mobile: 'تطبيقات الجوال',
  uiux: 'تصميم UI/UX',
  frontend: 'تطوير الواجهات الأمامية',
  backend: 'تطوير الخوادم والـ Backend',
  fullstack: 'تطوير Full Stack',
}

export const levelLabels: Record<string, string> = {
  mid: 'متوسط',
  senior: 'خبير',
}

export const experienceLabels: Record<string, string> = {
  '3-4': '3-4 سنوات',
  '5-7': '5-7 سنوات',
  '8-10': '8-10 سنوات',
  '10+': 'أكثر من 10 سنوات',
}

export const statusLabels: Record<string, string> = {
  new: 'جديد',
  under_review: 'قيد المراجعة',
  accepted: 'مقبول',
  rejected: 'مرفوض',
}

export const cities = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'تبوك',
  'أبها',
  'الطائف',
  'بريدة',
  'خميس مشيط',
  'الجبيل',
  'حائل',
  'عرعر',
  'سكاكا',
  'نجران',
  'القصيم',
  'الحدود الشمالية',
  'الجوف',
  'الباحة',
  'الشرقية',
  'جازان',
  'الاحساء',
  'الخفجي',
  'اخرى'
]
