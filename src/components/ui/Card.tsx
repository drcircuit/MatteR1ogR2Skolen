import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  border?: boolean
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

export function Card({ padding = 'md', hover = false, border = true, className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm',
        border && 'border border-gray-200',
        paddingClasses[padding],
        hover && 'transition-shadow hover:shadow-md cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function CardHeader({ title, subtitle, action, className, ...rest }: CardHeaderProps) {
  return (
    <div className={clsx('flex items-start justify-between gap-2', className)} {...rest}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
