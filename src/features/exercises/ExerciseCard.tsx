import type { Exercise, CourseId, ExerciseResult } from '@/types'
import { MultipleChoice } from './MultipleChoice'
import { FreeResponse } from './FreeResponse'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  courseId: CourseId
  onAnswer: (assessment: {
    correct: boolean
    submittedAnswer?: string
    assessmentFeedback?: string
    assessmentScore?: number
  }) => void
  disabled?: boolean
  showHints?: boolean
  latestResult?: ExerciseResult
}

const difficultyLabel = {
  lett: { label: 'Lett', variant: 'success' as const },
  middels: { label: 'Middels', variant: 'warning' as const },
  vanskelig: { label: 'Vanskelig', variant: 'danger' as const },
}

export function ExerciseCard({ exercise, index, courseId: _courseId, onAnswer, disabled, showHints, latestResult }: ExerciseCardProps) {
  const diff = difficultyLabel[exercise.difficulty]

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500">Oppgave {index + 1}</span>
        <Badge variant={diff.variant}>{diff.label}</Badge>
      </div>
      {latestResult && (
        <div className={`mb-4 rounded-lg border px-3 py-2 text-xs ${
          latestResult.correct ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          Sist levert: {new Date(latestResult.answeredAt).toLocaleString('nb-NO')} ·
          resultat {latestResult.assessmentScore ?? (latestResult.correct ? 100 : 0)}% ·
          forsøk {latestResult.attemptCount}
        </div>
      )}
      {exercise.type === 'multiple-choice' ? (
        <MultipleChoice
          exercise={exercise}
          onAnswer={onAnswer}
          showHint={showHints}
          disabled={disabled}
        />
      ) : (
        <FreeResponse
          exercise={exercise}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      )}
    </Card>
  )
}
