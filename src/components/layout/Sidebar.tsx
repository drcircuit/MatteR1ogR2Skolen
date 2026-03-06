import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import type { CourseId } from '@/types'

interface SidebarProps {
  courseId?: CourseId
  moduleId?: string
}

const navItems = [
  { label: 'Oversikt', path: '/dashboard', icon: '🏠' },
  { label: 'Matematikk R1', path: '/kurs/r1', icon: '📘' },
  { label: 'Matematikk R2', path: '/kurs/r2', icon: '📗' },
  { label: 'Prøveeksamen', path: '/prove-eksamen', icon: '📝' },
  { label: 'Fremgang', path: '/fremgang', icon: '📊' },
  { label: 'AI-lærer', path: '/ai-laerer', icon: '🤖' },
  { label: 'Innstillinger', path: '/innstillinger', icon: '⚙️' },
]

export function Sidebar({ courseId: _courseId, moduleId: _moduleId }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-0">
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
