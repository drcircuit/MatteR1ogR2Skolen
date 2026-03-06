import { useState } from 'react'
import { useSettingsStore } from '@/store/settingsStore'
import { useAuthStore } from '@/store/authStore'
import { clearUserData } from '@/lib/storage/db'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader } from '@/components/ui/Card'
import { ConfirmModal } from '@/components/ui/Modal'

export default function SettingsPage() {
  const {
    openaiApiKey, aiModel, showHints,
    setOpenAIApiKey, setAIModel, setShowHints,
  } = useSettingsStore()

  const { user, updateDisplayName, logout } = useAuthStore()

  const [apiKey, setApiKey] = useState(openaiApiKey)
  const [displayName, setDisplayName] = useState(user?.displayName ?? '')
  const [savedApi, setSavedApi] = useState(false)
  const [savedProfile, setSavedProfile] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleSaveApi = () => {
    setOpenAIApiKey(apiKey)
    setSavedApi(true)
    setTimeout(() => setSavedApi(false), 2000)
  }

  const handleSaveProfile = () => {
    updateDisplayName(displayName)
    setSavedProfile(true)
    setTimeout(() => setSavedProfile(false), 2000)
  }

  const handleClearData = async () => {
    if (user) {
      await clearUserData(user.id)
      window.location.reload()
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Innstillinger</h1>

      {/* Profil */}
      <Card className="mb-5">
        <CardHeader title="Profil" subtitle="Endre visningsnavn" />
        <div className="mt-4 space-y-3">
          <Input
            label="Brukernavn"
            value={user?.username ?? ''}
            disabled
            hint="Brukernavnet kan ikke endres"
          />
          <Input
            label="Visningsnavn"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Ditt navn"
          />
          <Button onClick={handleSaveProfile} variant={savedProfile ? 'success' : 'primary'}>
            {savedProfile ? '✓ Lagret!' : 'Lagre profil'}
          </Button>
        </div>
      </Card>

      {/* OpenAI */}
      <Card className="mb-5">
        <CardHeader
          title="OpenAI API-nøkkel"
          subtitle="Brukes for AI-faglæreren. Lagres kun lokalt i nettleseren."
        />
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Input
              label="API-nøkkel"
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              hint="Hent nøkkelen din fra platform.openai.com"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 text-sm"
            >
              {showApiKey ? 'Skjul' : 'Vis'}
            </button>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">AI-modell</label>
            <select
              value={aiModel}
              onChange={(e) => setAIModel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gpt-4o-mini">GPT-4o Mini (Rask og rimelig)</option>
              <option value="gpt-4o">GPT-4o (Kraftig)</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </select>
          </div>
          <Button onClick={handleSaveApi} variant={savedApi ? 'success' : 'primary'}>
            {savedApi ? '✓ Lagret!' : 'Lagre API-nøkkel'}
          </Button>
        </div>
      </Card>

      {/* Læringsinnstillinger */}
      <Card className="mb-5">
        <CardHeader title="Læringsinnstillinger" />
        <div className="mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showHints}
              onChange={(e) => setShowHints(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Vis hint i oppgaver</span>
          </label>
        </div>
      </Card>

      {/* Farlig sone */}
      <Card className="mb-5 border-red-200">
        <CardHeader title="Faresone" subtitle="Irreversible handlinger" />
        <div className="mt-4 space-y-3">
          <Button
            variant="danger"
            onClick={() => setShowClearConfirm(true)}
          >
            🗑 Slett all fremgangsdata
          </Button>
          <Button variant="secondary" onClick={logout} fullWidth>
            Logg ut
          </Button>
        </div>
      </Card>

      <ConfirmModal
        open={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearData}
        title="Slett all fremgangsdata"
        message="Er du sikker? Dette vil slette alle fullførte leksjoner, quizresultater og eksamensresultater. Handlingen kan ikke angres."
        confirmLabel="Ja, slett alt"
        danger
      />
    </div>
  )
}
