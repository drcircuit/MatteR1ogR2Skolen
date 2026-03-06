import { Link } from 'react-router-dom'
import type { Lesson, CourseId } from '@/types'
import { Badge } from '@/components/ui/Badge'

interface LessonCardProps {
  lesson: Lesson
  courseId: CourseId
  moduleId: string
  completed: boolean
  isLocked?: boolean
}

export function LessonCard({ lesson, courseId, moduleId, completed, isLocked = false }: LessonCardProps) {
  const content = (
    <div className={`bg-white rounded-xl border p-4 transition-all ${
      isLocked
        ? 'border-gray-200 opacity-60 cursor-not-allowed'
        : 'border-gray-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
          completed
            ? 'bg-green-100 text-green-700'
            : isLocked
            ? 'bg-gray-100 text-gray-400'
            : 'bg-blue-50 text-blue-600'
        }`}>
          {completed ? '✓' : isLocked ? '🔒' : lesson.order}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className="font-medium text-gray-900 text-sm">{lesson.title}</h4>
            {completed && <Badge variant="success" className="shrink-0">Fullført</Badge>}
          </div>
          <p className="text-xs text-gray-500">
            ⏱ ca. {lesson.estimatedMinutes} min · {lesson.learningGoals.length} læringsmål
          </p>
        </div>
      </div>
    </div>
  )

  if (isLocked) return content

  return (
    <Link to={`/kurs/${courseId}/modul/${moduleId}/leksjon/${lesson.id}`}>
      {content}
    </Link>
  )
}
