import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const location = useLocation()

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-gray-900 text-lg hidden sm:block">
              MatteR1ogR2
            </span>
          </Link>

          {/* Navigasjon – kun når innlogget */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/dashboard" active={isActive('/dashboard')}>Oversikt</NavLink>
              <NavLink to="/kurs/r1" active={isActive('/kurs/r1')}>R1</NavLink>
              <NavLink to="/kurs/r2" active={isActive('/kurs/r2')}>R2</NavLink>
              <NavLink to="/fremgang" active={isActive('/fremgang')}>Fremgang</NavLink>
              <NavLink to="/ai-laerer" active={isActive('/ai-laerer')}>AI-lærer</NavLink>
            </div>
          )}

          {/* Høyre side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/innstillinger"
                  className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block"
                >
                  {user?.displayName ?? user?.username}
                </Link>
                <Button variant="secondary" size="sm" onClick={logout}>
                  Logg ut
                </Button>
              </>
            ) : (
              <>
                <Link to="/logg-inn">
                  <Button variant="ghost" size="sm">Logg inn</Button>
                </Link>
                <Link to="/registrer">
                  <Button size="sm">Registrer</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  )
}
