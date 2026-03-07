import { useState } from 'react'
import type { Exercise, CourseId, QuestionResult } from '@/types'
import { contentRepository } from '@/data/contentRepository'
import { ExamRunner } from '@/features/exams/ExamRunner'
import { ExamResultView } from '@/features/exams/ExamResult'
import { Button } from '@/components/ui/Button'
import { useProgress } from '@/hooks/useProgress'
import { useAuthStore } from '@/store/authStore'

type ExamCourse = 'r1' | 'r2' | 'begge'

export default function MockExamPage() {
  const [started, setStarted] = useState(false)
  const [courseFilter, setCourseFilter] = useState<ExamCourse>('begge')
  const [questionCount] = useState(20)
  const [questions, setQuestions] = useState<Exercise[]>([])
  const [examResult, setExamResult] = useState<{
    questionResults: QuestionResult[]
    durationSeconds: number
  } | null>(null)

  const { completedLessons, recordExamResult } = useProgress()
  const user = useAuthStore((s) => s.user)

  const handleStart = () => {
    const qs = contentRepository.getMockExamQuestions(courseFilter, questionCount, completedLessons)
    setQuestions(qs)
    setStarted(true)
    setExamResult(null)
  }

  const handleComplete = (results: QuestionResult[], duration: number) => {
    const correct = results.filter((r) => r.correct).length
    const total = results.length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0

    const result = {
      userId: user?.id ?? '',
      examTitle: `Prøveeksamen – ${courseLabel[courseFilter]}`,
      courseId: courseFilter === 'begge' ? undefined : courseFilter as CourseId,
      score,
      correctCount: correct,
      totalCount: total,
      durationSeconds: duration,
      completedAt: new Date().toISOString(),
      questionResults: results,
    }

    if (user) recordExamResult(result)
    setExamResult({ questionResults: results, durationSeconds: duration })
  }

  const courseLabel: Record<ExamCourse, string> = {
    r1: 'Matematikk R1',
    r2: 'Matematikk R2',
    begge: 'R1 og R2',
  }

  if (examResult) {
    const correct = examResult.questionResults.filter((r) => r.correct).length
    const result = {
      userId: user?.id ?? '',
      examTitle: `Prøveeksamen – ${courseLabel[courseFilter]}`,
      score: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0,
      correctCount: correct,
      totalCount: questions.length,
      durationSeconds: examResult.durationSeconds,
      completedAt: new Date().toISOString(),
      questionResults: examResult.questionResults,
    }
    return (
      <ExamResultView
        result={result}
        onRetry={() => { setStarted(false); setExamResult(null) }}
      />
    )
  }

  if (started && questions.length > 0) {
    return (
      <ExamRunner
        title={`Prøveeksamen – ${courseLabel[courseFilter]}`}
        questions={questions}
        durationMinutes={60}
        onComplete={handleComplete}
      />
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Prøveeksamen</h1>
      <p className="text-gray-500 mb-8">
        Simuler en ekte eksamenssituasjon med tilfeldig valgte oppgaver fra pensum.
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Konfigurer eksamen</h2>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Kurs</p>
          <div className="flex gap-3">
            {(['r1', 'r2', 'begge'] as ExamCourse[]).map((c) => (
              <button
                key={c}
                onClick={() => setCourseFilter(c)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                  courseFilter === c
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {courseLabel[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-semibold">Antall spørsmål</p>
            <p className="text-2xl font-bold text-blue-600">{questionCount}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-semibold">Tid</p>
            <p className="text-2xl font-bold text-blue-600">60 min</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <p className="font-medium mb-1">⚠️ Eksamensbetingelser</p>
          <ul className="space-y-1 text-xs">
            <li>• Lukk alle andre faner og hjelpemidler</li>
            <li>• Spørsmålene er tilfeldig valgt fra pensum</li>
            <li>• Oppgavene prioriterer moduler fra leksjoner du har fullført</li>
            <li>• Eksamenen stopper automatisk etter 60 min</li>
            <li>• Du kan ikke pause eksamen underveis</li>
          </ul>
        </div>

        <Button fullWidth size="lg" onClick={handleStart}>
          🚀 Start prøveeksamen
        </Button>
      </div>
    </div>
  )
}
