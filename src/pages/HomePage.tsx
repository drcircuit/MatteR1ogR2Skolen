import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

export default function HomePage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <span>🎓</span>
          <span>Norsk matematikk – R1 og R2</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Mestre matematikken med{' '}
          <span className="text-blue-600">AI-støttet</span> undervisning
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Komplett nettskole for Matematikk R1 og R2. Strukturerte leksjoner, interaktive oppgaver,
          prøveeksamen og en personlig AI-faglærer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg">Gå til oversikt →</Button>
            </Link>
          ) : (
            <>
              <Link to="/registrer">
                <Button size="lg">Kom i gang gratis</Button>
              </Link>
              <Link to="/logg-inn">
                <Button size="lg" variant="secondary">Logg inn</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Funksjoner */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pensum */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Hva lærer du?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CourseOverview
            title="Matematikk R1"
            color="blue"
            topics={[
              'Algebra og funksjoner',
              'Geometri og vektorer',
              'Kombinatorikk og sannsynlighet',
              'Derivasjon og optimalisering',
              'Integrasjon',
            ]}
          />
          <CourseOverview
            title="Matematikk R2"
            color="green"
            topics={[
              'Sammensatte og inverse funksjoner',
              'Avansert derivasjon og integrasjon',
              'Vektorer i rommet (3D)',
              'Komplekse tall',
              'Sannsynlighet og statistikk',
              'Lineær algebra og matriser',
            ]}
          />
        </div>
      </div>
    </div>
  )
}

const features = [
  { icon: '📚', title: 'Strukturerte leksjoner', description: 'Komplett pensum for R1 og R2 med klare læringsmål og matematikkforklaringer.' },
  { icon: '✏️', title: 'Interaktive oppgaver', description: 'Flervalgsoppgaver og fritekstoppgaver med umiddelbar tilbakemelding og forklaringer.' },
  { icon: '🤖', title: 'AI-faglærer', description: 'Personlig AI-lærer som forklarer matematikk på norsk, steg for steg, tilpasset ditt nivå.' },
  { icon: '📝', title: 'Prøveeksamen', description: 'Tidsbegrenset prøveeksamen med spørsmål fra hele pensum. Se karakterestimatet ditt.' },
  { icon: '📊', title: 'Fremgangssporing', description: 'Hold oversikt over hvilke leksjoner du har fullført og se utviklingen din over tid.' },
  { icon: '🔒', title: 'Ingen påloggingsproblemer', description: 'Alt lagres lokalt i nettleseren. Ingen e-post. Ingen serverproblemer.' },
]

function CourseOverview({ title, color, topics }: { title: string; color: 'blue' | 'green'; topics: string[] }) {
  return (
    <div className={`rounded-2xl border-2 p-6 ${color === 'blue' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}`}>
      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-bold text-white mb-4 ${color === 'blue' ? 'bg-blue-600' : 'bg-green-600'}`}>
        {title}
      </div>
      <ul className="space-y-2">
        {topics.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
            <span className={color === 'blue' ? 'text-blue-500' : 'text-green-500'}>✓</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
