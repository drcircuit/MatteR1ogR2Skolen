import { useProgress } from '@/hooks/useProgress'
import { r1Course } from '@/data/r1'
import { r2Course } from '@/data/r2'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router-dom'

export function ProgressDashboard() {
  const { completedLessons, quizResults, examResults } = useProgress()

  const r1LessonIds = r1Course.modules.flatMap((m) => m.lessons.map((l) => l.id))
  const r2LessonIds = r2Course.modules.flatMap((m) => m.lessons.map((l) => l.id))

  const r1Progress = r1LessonIds.length > 0
    ? Math.round((r1LessonIds.filter((id) => completedLessons.has(id)).length / r1LessonIds.length) * 100)
    : 0
  const r2Progress = r2LessonIds.length > 0
    ? Math.round((r2LessonIds.filter((id) => completedLessons.has(id)).length / r2LessonIds.length) * 100)
    : 0

  const totalLessons = r1LessonIds.length + r2LessonIds.length
  const totalCompleted = [...r1LessonIds, ...r2LessonIds].filter((id) => completedLessons.has(id)).length
  const totalProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  const bestExam = examResults.length > 0
    ? examResults.reduce((best, r) => r.score > best.score ? r : best)
    : null

  return (
    <div className="space-y-6">
      {/* Totalt */}
      <Card>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Samlet fremgang</h2>
        <ProgressBar
          value={totalProgress}
          label={`${totalCompleted} av ${totalLessons} leksjoner fullført`}
          showPercent
          size="lg"
          color="blue"
        />
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{totalCompleted}</p>
            <p className="text-xs text-gray-500">Leksjoner</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{quizResults.length}</p>
            <p className="text-xs text-gray-500">Quizer</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{examResults.length}</p>
            <p className="text-xs text-gray-500">Eksamener</p>
          </div>
        </div>
      </Card>

      {/* Per kurs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">R1</div>
            <div>
              <h3 className="font-semibold text-gray-900">Matematikk R1</h3>
              <p className="text-xs text-gray-500">{r1LessonIds.filter((id) => completedLessons.has(id)).length} / {r1LessonIds.length} leksjoner</p>
            </div>
          </div>
          <ProgressBar value={r1Progress} showPercent color="blue" />
          <Link to="/kurs/r1" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            Gå til R1 →
          </Link>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold">R2</div>
            <div>
              <h3 className="font-semibold text-gray-900">Matematikk R2</h3>
              <p className="text-xs text-gray-500">{r2LessonIds.filter((id) => completedLessons.has(id)).length} / {r2LessonIds.length} leksjoner</p>
            </div>
          </div>
          <ProgressBar value={r2Progress} showPercent color="green" />
          <Link to="/kurs/r2" className="mt-3 inline-block text-sm text-green-600 hover:underline">
            Gå til R2 →
          </Link>
        </Card>
      </div>

      {/* Moduloversikt R1 */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4">R1 – Moduler</h3>
        <div className="space-y-3">
          {r1Course.modules.map((module) => {
            const lessonIds = module.lessons.map((l) => l.id)
            const done = lessonIds.filter((id) => completedLessons.has(id)).length
            const pct = lessonIds.length > 0 ? Math.round((done / lessonIds.length) * 100) : 0
            return (
              <div key={module.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{module.title}</span>
                  <span className="text-gray-500">{done}/{lessonIds.length}</span>
                </div>
                <ProgressBar value={pct} size="sm" color="blue" />
              </div>
            )
          })}
        </div>
      </Card>

      {/* Eksamensresultater */}
      {examResults.length > 0 && (
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Eksamensresultater</h3>
          {bestExam && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-green-700 font-medium">🏆 Beste resultat</p>
              <p className="text-2xl font-bold text-green-800 mt-1">{Math.round(bestExam.score)}%</p>
              <p className="text-sm text-green-600">{bestExam.examTitle}</p>
            </div>
          )}
          <div className="space-y-2">
            {examResults.slice(0, 5).map((result, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{result.examTitle}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(result.completedAt).toLocaleDateString('nb-NO')}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${result.score >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.round(result.score)}%
                  </p>
                  <p className="text-xs text-gray-500">{result.correctCount}/{result.totalCount}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
