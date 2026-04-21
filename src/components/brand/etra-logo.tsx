interface EtraLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const heights: Record<string, number> = { sm: 28, md: 36, lg: 48 }

export function EtraLogo({ size = 'md', className = '' }: EtraLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/etra-logo.png"
        alt="إترا للتمكين التقني"
        height={heights[size]}
        style={{ height: heights[size], objectFit: 'contain', width: 'auto' }}
      />
    </div>
  )
}
