import { useNavigate } from 'react-router-dom'
import type { ExamResult } from '@/types'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface ExamResultProps {
  result: ExamResult
  onRetry?: () => void
}

export function ExamResultView({ result, onRetry }: ExamResultProps) {
  const navigate = useNavigate()
  const passed = result.score >= 50

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m} min ${s} sek`
  }

  const getGrade = (score: number): string => {
    if (score >= 90) return '6'
    if (score >= 75) return '5'
    if (score >= 60) return '4'
    if (score >= 40) return '3'
    if (score >= 20) return '2'
    return '1'
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Resultat-header */}
      <div className={`rounded-2xl p-8 text-center mb-6 ${
        passed
          ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200'
          : 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200'
      }`}>
        <div className="text-5xl mb-3">{passed ? '🎉' : '💪'}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{result.examTitle}</h2>
        <p className="text-gray-600 mb-4">
          {new Date(result.completedAt).toLocaleDateString('nb-NO', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
        <div className="text-6xl font-bold mb-2" style={{
          color: passed ? '#16a34a' : '#dc2626'
        }}>
          {Math.round(result.score)}%
        </div>
        <p className="text-gray-700">
          {result.correctCount} av {result.totalCount} riktige
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium shadow-sm">
          <span>Karakterestimat:</span>
          <span className="text-lg font-bold text-blue-600">{getGrade(result.score)}</span>
        </div>
      </div>

      {/* Detaljer */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
        <h3 className="font-semibold text-gray-900 mb-4">Resultatdetaljer</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Riktige svar</span>
            <span className="font-medium text-green-600">{result.correctCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Feil svar</span>
            <span className="font-medium text-red-600">{result.totalCount - result.correctCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tid brukt</span>
            <span className="font-medium">{formatDuration(result.durationSeconds)}</span>
          </div>
          <div className="pt-2">
            <ProgressBar
              value={result.score}
              label="Poengsum"
              showPercent
              color={passed ? 'green' : 'red'}
            />
          </div>
        </div>
      </div>

      {/* Spørsmålsoversikt */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
        <h3 className="font-semibold text-gray-900 mb-3">Svar per spørsmål</h3>
        <div className="flex flex-wrap gap-2">
          {result.questionResults.map((r, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                r.correct
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
              title={`Spørsmål ${i + 1}: ${r.correct ? 'Riktig' : 'Feil'}`}
            >
              {r.correct ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>

      {/* Handlinger */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button variant="primary" fullWidth onClick={onRetry}>
            🔄 Ta eksamen på nytt
          </Button>
        )}
        <Button variant="secondary" fullWidth onClick={() => navigate('/fremgang')}>
          📊 Se fremgang
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/dashboard')}>
          🏠 Hjem
        </Button>
      </div>
    </div>
  )
}
