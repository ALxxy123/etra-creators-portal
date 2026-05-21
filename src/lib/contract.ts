// Single source of truth for the binding contract content shown on the
// terms page, snapshotted into the database at acceptance, and emailed to
// the applicant when the application is approved.
//
// Bump CONTRACT_VERSION whenever the legally relevant text below changes.
// Old applications keep their snapshot so admins can always see the exact
// version each applicant accepted.

export const CONTRACT_VERSION = '2026-05-v1'

export interface ContractArticle {
  number: string
  title: string
  body: string
}

export const CONTRACT_ARTICLES: ContractArticle[] = [
  {
    number: '1',
    title: 'طبيعة العقد والموافقة الإلكترونية',
    body:
      'بضغطك على زر "أوافق على البنود" تُقرّ بأنك قد اطّلعت على جميع البنود الواردة في هذه الصفحة وفهمتها ووافقت عليها بكامل إرادتك الحرة. وتُعدّ هذه الموافقة الإلكترونية بمثابة عقد ملزم نافذ المفعول بينك وبين شركة إترا للتمكين التقني، تترتب عليه كافة الآثار القانونية المعتبرة وفقاً للأنظمة المعمول بها في المملكة العربية السعودية.',
  },
  {
    number: '2',
    title: 'تسوية النزاعات',
    body:
      'في حال نشوء أي خلاف أو نزاع متعلق بتفسير هذا العقد أو تنفيذه، يلتزم الطرفان بمحاولة تسويته وُدّياً عبر التفاوض المباشر خلال مدة لا تتجاوز خمسة عشر (15) يوماً من تاريخ إخطار الطرف الآخر بالنزاع كتابياً. وفي حال تعذّر التوصل إلى حلٍّ وُدّي خلال هذه المدة، يُحال النزاع إلى الجهة القضائية المختصة في المملكة العربية السعودية ويُعتمد حكمها نهائياً.',
  },
  {
    number: '3',
    title: 'شروط الدفع والاستحقاق المالي',
    body:
      'لا تستحق أي مبالغ مالية ولا تُصرف للمبدع إلا بعد تسليم العمل المُوكَل إليه بشكل كامل، واعتماده من قِبَل إترا وفقاً لمعايير الجودة والمواصفات المتفق عليها مسبقاً. يُعدّ التسليم الجزئي أو غير المُكتمل غير موجبٍ لاستحقاق أي مبالغ، ما لم يُتفق على غير ذلك كتابياً وبشكل صريح بين الطرفين.',
  },
]

export function buildContractText(applicantName: string, trackingCode: string, acceptedAt: string): string {
  const lines = [
    `عقد تعاون — إترا للتمكين التقني`,
    `الإصدار: ${CONTRACT_VERSION}`,
    `الطرف الأول: شركة إترا للتمكين التقني`,
    `الطرف الثاني: ${applicantName}`,
    `رمز التتبع: ${trackingCode}`,
    `تاريخ الموافقة: ${acceptedAt}`,
    ``,
    `بنود العقد:`,
    ``,
  ]
  for (const a of CONTRACT_ARTICLES) {
    lines.push(`البند (${a.number}) — ${a.title}`)
    lines.push(a.body)
    lines.push('')
  }
  return lines.join('\n')
}
