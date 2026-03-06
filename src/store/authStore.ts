import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import bcrypt from 'bcryptjs'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateDisplayName: (name: string) => void
}

const USERS_KEY = 'matteSkole_users'

function getStoredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string): Promise<boolean> => {
        const users = getStoredUsers()
        const user = users.find(
          (u) => u.username.toLowerCase() === username.toLowerCase(),
        )
        if (!user) return false

        const match = await bcrypt.compare(password, user.passwordHash)
        if (!match) return false

        set({ user, isAuthenticated: true })
        return true
      },

      register: async (
        username: string,
        password: string,
        displayName?: string,
      ): Promise<{ success: boolean; error?: string }> => {
        const users = getStoredUsers()
        const exists = users.some(
          (u) => u.username.toLowerCase() === username.toLowerCase(),
        )
        if (exists) {
          return { success: false, error: 'Brukernavnet er allerede i bruk.' }
        }
        if (username.length < 3) {
          return { success: false, error: 'Brukernavn må ha minst 3 tegn.' }
        }
        if (password.length < 6) {
          return { success: false, error: 'Passord må ha minst 6 tegn.' }
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser: User = {
          id: crypto.randomUUID(),
          username,
          passwordHash,
          displayName: displayName || username,
          createdAt: new Date().toISOString(),
        }
        users.push(newUser)
        saveUsers(users)
        set({ user: newUser, isAuthenticated: true })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateDisplayName: (name: string) => {
        set((state) => {
          if (!state.user) return state
          const updatedUser = { ...state.user, displayName: name }
          const users = getStoredUsers()
          const idx = users.findIndex((u) => u.id === updatedUser.id)
          if (idx !== -1) {
            users[idx] = updatedUser
            saveUsers(users)
          }
          return { user: updatedUser }
        })
      },
    }),
    {
      name: 'matteSkole_auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
