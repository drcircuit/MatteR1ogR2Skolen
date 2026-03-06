import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <RegisterForm />
        <p className="text-center text-sm text-gray-600 mt-4">
          Har du allerede konto?{' '}
          <Link to="/logg-inn" className="text-blue-600 hover:underline font-medium">
            Logg inn her
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
