import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from '@/features/auth/LoginForm'
import { RegisterForm } from '@/features/auth/RegisterForm'
import { useAuthStore } from '@/store/authStore'

// Tøm localStorage mellom tester
beforeEach(() => {
  localStorage.clear()
  useAuthStore.setState({ user: null, isAuthenticated: false })
})

describe('RegisterForm', () => {
  it('rendrer skjema med riktige felt', () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    )
    expect(screen.getByLabelText('Brukernavn')).toBeInTheDocument()
    expect(screen.queryByLabelText(/Visningsnavn/)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/Passord/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Opprett konto/ })).toBeInTheDocument()
  })

  it('viser feil ved for kort brukernavn', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    )

    await user.type(screen.getByLabelText('Brukernavn'), 'ab')
    await user.type(screen.getAllByLabelText(/Passord/)[0], 'password123')
    await user.type(screen.getAllByLabelText(/Bekreft passord/)[0], 'password123')
    await user.click(screen.getByRole('button', { name: /Opprett konto/ }))

    await waitFor(() => {
      expect(screen.getByText(/Brukernavn må ha minst 3 tegn/)).toBeInTheDocument()
    })
  })

  it('viser feil ved mismatching passord', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    )

    await user.type(screen.getByLabelText('Brukernavn'), 'testbruker')
    await user.type(screen.getAllByLabelText(/Passord/)[0], 'password123')
    await user.type(screen.getAllByLabelText(/Bekreft passord/)[0], 'annetPassord')
    await user.click(screen.getByRole('button', { name: /Opprett konto/ }))

    await waitFor(() => {
      const messages = screen.getAllByText(/Passordene stemmer ikke/)
      expect(messages.length).toBeGreaterThan(0)
    })
  })
})

describe('LoginForm', () => {
  it('rendrer innloggingsskjema', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    )
    expect(screen.getByLabelText('Brukernavn')).toBeInTheDocument()
    expect(screen.getByLabelText('Passord')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Logg inn/ })).toBeInTheDocument()
  })

  it('viser feilmelding ved feil brukernavn/passord', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    )

    await user.type(screen.getByLabelText('Brukernavn'), 'ikkeeksisterende')
    await user.type(screen.getByLabelText('Passord'), 'feilPassord')
    await user.click(screen.getByRole('button', { name: /Logg inn/ }))

    await waitFor(() => {
      expect(screen.getByText(/Feil brukernavn eller passord/)).toBeInTheDocument()
    })
  })
})

describe('Auth Store', () => {
  it('kan registrere en ny bruker', async () => {
    const { register } = useAuthStore.getState()
    const result = await register('testbruker', 'sikkertPassord123')
    expect(result.success).toBe(true)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('avviser duplikat brukernavn', async () => {
    const { register } = useAuthStore.getState()
    await register('duplikat', 'passord123')

    useAuthStore.setState({ user: null, isAuthenticated: false })

    const result = await register('duplikat', 'annetPassord')
    expect(result.success).toBe(false)
    expect(result.error).toContain('allerede i bruk')
  })

  it('kan logge inn etter registrering', async () => {
    const { register, login, logout } = useAuthStore.getState()
    await register('bruker1', 'mittPassord123')
    logout()

    const ok = await login('bruker1', 'mittPassord123')
    expect(ok).toBe(true)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('avviser feil passord', async () => {
    const { register, login, logout } = useAuthStore.getState()
    await register('bruker2', 'riktigPassord')
    logout()

    const ok = await login('bruker2', 'feilPassord')
    expect(ok).toBe(false)
  })
})
