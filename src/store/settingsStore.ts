import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppSettings } from '@/types'

interface SettingsStore extends AppSettings {
  setOpenAIApiKey: (key: string) => void
  setAIModel: (model: string) => void
  setTheme: (theme: AppSettings['theme']) => void
  setFontSize: (size: AppSettings['fontSize']) => void
  setShowHints: (show: boolean) => void
  reset: () => void
}

const defaultSettings: AppSettings = {
  openaiApiKey: '',
  aiModel: 'gpt-4o-mini',
  theme: 'lys',
  fontSize: 'normal',
  showHints: true,
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setOpenAIApiKey: (key) => set({ openaiApiKey: key }),
      setAIModel: (model) => set({ aiModel: model }),
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setShowHints: (showHints) => set({ showHints }),
      reset: () => set(defaultSettings),
    }),
    {
      name: 'matteSkole_settings',
    },
  ),
)
