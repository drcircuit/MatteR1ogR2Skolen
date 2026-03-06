import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useProgress } from '@/hooks/useProgress'
import { CourseCard } from '@/features/curriculum/CourseCard'
import { contentRepository } from '@/data/contentRepository'

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const { completedLessons, examResults } = useProgress()

  const r1Course = contentRepository.getCourse('r1')
  const r2Course = contentRepository.getCourse('r2')
  if (!r1Course || !r2Course) return null

  const r1LessonIds = contentRepository.getAllLessonIds('r1')
  const r2LessonIds = contentRepository.getAllLessonIds('r2')

  const r1Progress = r1LessonIds.length > 0
    ? Math.round((r1LessonIds.filter((id) => completedLessons.has(id)).length / r1LessonIds.length) * 100)
    : 0
  const r2Progress = r2LessonIds.length > 0
    ? Math.round((r2LessonIds.filter((id) => completedLessons.has(id)).length / r2LessonIds.length) * 100)
    : 0

  const greeting = getGreeting()

  return (
    <div>
      {/* Hilsen */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, {user?.displayName ?? user?.username}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Klar for litt matematikk i dag?</p>
      </div>

      {/* Kurs */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dine kurs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CourseCard course={r1Course} progress={r1Progress} />
          <CourseCard course={r2Course} progress={r2Progress} />
        </div>
      </section>

      {/* Hurtiglenker */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Snarveier</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-2xl mb-1">{link.icon}</div>
              <p className="text-sm font-medium text-gray-700">{link.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Siste eksamenresultater */}
      {examResults.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Siste eksamenresultater</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {examResults.slice(0, 3).map((result, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{result.examTitle}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(result.completedAt).toLocaleDateString('nb-NO')}
                  </p>
                </div>
                <div className={`font-bold text-lg ${result.score >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.round(result.score)}%
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'God morgen'
  if (hour < 17) return 'God ettermiddag'
  return 'God kveld'
}

const quickLinks = [
  { to: '/prove-eksamen', icon: '📝', label: 'Prøveeksamen' },
  { to: '/fremgang', icon: '📊', label: 'Fremgang' },
  { to: '/ai-laerer', icon: '🤖', label: 'AI-lærer' },
  { to: '/innstillinger', icon: '⚙️', label: 'Innstillinger' },
]
