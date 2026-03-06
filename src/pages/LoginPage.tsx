import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
        <p className="text-center text-sm text-gray-600 mt-4">
          Har du ikke konto?{' '}
          <Link to="/registrer" className="text-blue-600 hover:underline font-medium">
            Registrer deg her
          </Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Tilbake til forsiden
          </Link>
        </p>
      </div>
    </div>
  )
}
