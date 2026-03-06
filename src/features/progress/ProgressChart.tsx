import type { QuizResult } from '@/types'

interface ProgressChartProps {
  quizResults: QuizResult[]
  examResults: Array<{ score: number; completedAt: string; examTitle: string }>
}

export function ProgressChart({ quizResults, examResults }: ProgressChartProps) {
  const allResults = [
    ...quizResults.map((r) => ({ score: r.score, date: r.completedAt, label: 'Quiz' })),
    ...examResults.map((r) => ({ score: r.score, date: r.completedAt, label: 'Eksamen' })),
  ].sort((a, b) => a.date.localeCompare(b.date)).slice(-10)

  if (allResults.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-4xl mb-2">📊</p>
        <p>Ingen resultater ennå. Ta en quiz eller eksamen for å se grafen.</p>
      </div>
    )
  }

  const maxScore = 100
  const chartHeight = 160

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Siste 10 resultater</h3>
      <div className="flex items-end gap-2 h-40 border-b border-l border-gray-200 relative">
        {/* Y-aksemerker */}
        {[0, 25, 50, 75, 100].map((v) => (
          <div
            key={v}
            className="absolute left-0 text-xs text-gray-400"
            style={{ bottom: `${(v / maxScore) * chartHeight}px`, transform: 'translateY(50%)' }}
          >
            <span className="-ml-8">{v}%</span>
          </div>
        ))}

        {allResults.map((r, i) => {
          const height = Math.max(4, (r.score / maxScore) * chartHeight)
          const color = r.score >= 60 ? 'bg-green-500' : r.score >= 40 ? 'bg-amber-500' : 'bg-red-500'

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end group relative"
            >
              <div className="hidden group-hover:block absolute bottom-full mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                {r.label}: {Math.round(r.score)}%<br />
                {new Date(r.date).toLocaleDateString('nb-NO')}
              </div>
              <div
                className={`w-full rounded-t-sm ${color} transition-all`}
                style={{ height: `${height}px` }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-sm inline-block" /> ≥60%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded-sm inline-block" /> 40-59%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-sm inline-block" /> &lt;40%</span>
      </div>
    </div>
  )
}
