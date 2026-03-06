import clsx from 'clsx'

interface ProgressBarProps {
  value: number // 0-100
  max?: number
  label?: string
  showPercent?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'amber' | 'red'
  animated?: boolean
  className?: string
}

const colorClasses = {
  blue: 'bg-blue-600',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
}

const heightClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = false,
  size = 'md',
  color = 'blue',
  animated = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showPercent && <span className="text-sm font-medium text-gray-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', heightClasses[size])}>
        <div
          className={clsx(
            'rounded-full transition-all duration-500',
            colorClasses[color],
            heightClasses[size],
            animated && 'animate-pulse',
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
