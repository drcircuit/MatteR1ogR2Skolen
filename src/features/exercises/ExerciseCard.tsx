import type { Exercise, CourseId } from '@/types'
import { MultipleChoice } from './MultipleChoice'
import { FreeResponse } from './FreeResponse'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  courseId: CourseId
  onAnswer: (correct: boolean) => void
  disabled?: boolean
  showHints?: boolean
}

const difficultyLabel = {
  lett: { label: 'Lett', variant: 'success' as const },
  middels: { label: 'Middels', variant: 'warning' as const },
  vanskelig: { label: 'Vanskelig', variant: 'danger' as const },
}

export function ExerciseCard({ exercise, index, courseId: _courseId, onAnswer, disabled, showHints }: ExerciseCardProps) {
  const diff = difficultyLabel[exercise.difficulty]

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500">Oppgave {index + 1}</span>
        <Badge variant={diff.variant}>{diff.label}</Badge>
      </div>
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
