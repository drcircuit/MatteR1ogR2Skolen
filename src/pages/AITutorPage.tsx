import { AITutorChat } from '@/features/ai-tutor/AITutorChat'
import { useSettingsStore } from '@/store/settingsStore'
import { Link } from 'react-router-dom'

export default function AITutorPage() {
  const openaiApiKey = useSettingsStore((s) => s.openaiApiKey)

  return (
    <div className="h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI-Faglærer</h1>
        <p className="text-gray-500 text-sm mt-1">
          Snakk med din personlige AI-matematikklærer. Still spørsmål om R1 og R2.
        </p>
      </div>

      {!openaiApiKey && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-800">
          <p className="font-medium mb-1">⚠️ OpenAI API-nøkkel mangler</p>
          <p>
            For å bruke AI-læreren trenger du en OpenAI API-nøkkel.{' '}
            <Link to="/innstillinger" className="underline font-medium">
              Gå til innstillinger →
            </Link>
          </p>
        </div>
      )}

      <AITutorChat />
    </div>
  )
}
