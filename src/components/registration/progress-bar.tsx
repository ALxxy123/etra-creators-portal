'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  currentStep: number
}

const steps = [
  { num: 1, label: 'معايير القبول' },
  { num: 2, label: 'بنود العمل' },
  { num: 3, label: 'نموذج التسجيل' },
  { num: 4, label: 'تأكيد النجاح' },
]

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progressPct = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="w-full px-4 py-6 mb-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Background track */}
          <div
            className="absolute h-0.5"
            style={{
              background: 'rgba(82,52,183,0.2)',
              top: '20px',
              left: '5%',
              right: '5%',
            }}
          />
          {/* Animated progress fill */}
          <motion.div
            className="absolute h-0.5"
            style={{
              background: 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)',
              top: '20px',
              left: '5%',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${(progressPct / 100) * 90}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {steps.map((step) => {
            const isDone = step.num < currentStep
            const isActive = step.num === currentStep
            return (
              <div key={step.num} className="flex flex-col items-center gap-2 relative z-10">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  initial={false}
                  animate={{
                    background: isDone || isActive
                      ? 'linear-gradient(135deg, #5234B7 0%, #9E59CD 100%)'
                      : 'rgba(18,18,42,0.8)',
                    boxShadow: isActive ? '0 0 20px rgba(82,52,183,0.6)' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    border: isDone || isActive ? 'none' : '1px solid rgba(82,52,183,0.3)',
                    color: isDone || isActive ? '#fff' : '#6B6490',
                  }}
                >
                  {isDone ? (
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : step.num}
                </motion.div>
                <span
                  className="text-xs font-medium text-center hidden sm:block"
                  style={{ color: isActive ? '#B0A8D4' : '#6B6490' }}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
