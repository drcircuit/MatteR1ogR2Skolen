import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(username.trim(), password)
    setLoading(false)
    if (ok) {
      navigate('/dashboard')
    } else {
      setError('Feil brukernavn eller passord.')
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="mb-6 text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-bold text-2xl">M</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Logg inn</h1>
        <p className="text-sm text-gray-500 mt-1">Velkommen tilbake til MatteR1ogR2Skolen</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Brukernavn"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Skriv inn brukernavn"
          required
          autoComplete="username"
          autoFocus
        />
        <Input
          label="Passord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Skriv inn passord"
          required
          autoComplete="current-password"
        />
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
        )}
        <Button type="submit" fullWidth loading={loading}>
          Logg inn
        </Button>
      </form>
    </Card>
  )
}
