import { cn } from '@/lib/utils'
import { brand } from '@/lib/brand'
import type { ApplicationStatus } from '@/types/database'

interface BadgeProps {
  status: ApplicationStatus
  className?: string
}

const labels: Record<ApplicationStatus, string> = {
  new: 'جديد',
  under_review: 'قيد المراجعة',
  accepted: 'مقبول',
  rejected: 'مرفوض',
}

export function StatusBadge({ status, className }: BadgeProps) {
  const s = brand.status[status]
  return (
    <span
      className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium', className)}
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}
    >
      {labels[status]}
    </span>
  )
}
