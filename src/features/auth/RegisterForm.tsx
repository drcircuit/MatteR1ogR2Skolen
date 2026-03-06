import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const register = useAuthStore((s) => s.register)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passordene stemmer ikke overens.')
      return
    }

    setLoading(true)
    const result = await register(username.trim(), password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'Registrering mislyktes.')
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="mb-6 text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-bold text-2xl">M</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Opprett konto</h1>
        <p className="text-sm text-gray-500 mt-1">Gratis tilgang til alt innhold</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Brukernavn"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Minst 3 tegn"
          required
          autoComplete="username"
          autoFocus
        />
        <Input
          label="Passord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minst 6 tegn"
          required
          autoComplete="new-password"
        />
        <Input
          label="Bekreft passord"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Gjenta passord"
          required
          autoComplete="new-password"
          error={confirmPassword && password !== confirmPassword ? 'Passordene stemmer ikke' : undefined}
        />
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
        )}
        <Button type="submit" fullWidth loading={loading}>
          Opprett konto
        </Button>
      </form>
    </Card>
  )
}
