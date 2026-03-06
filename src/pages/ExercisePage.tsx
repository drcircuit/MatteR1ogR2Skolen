import { useParams, Navigate, Link } from 'react-router-dom'
import type { CourseId } from '@/types'
import { r1Course } from '@/data/r1'
import { r2Course } from '@/data/r2'
import { ExerciseCard } from '@/features/exercises/ExerciseCard'
import { useProgress } from '@/hooks/useProgress'
import { useSettingsStore } from '@/store/settingsStore'

export default function ExercisePage() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const { recordExercise } = useProgress()
  const showHints = useSettingsStore((s) => s.showHints)

  const course = courseId === 'r1' ? r1Course : courseId === 'r2' ? r2Course : null
  if (!course) return <Navigate to="/dashboard" replace />

  const module = course.modules.find((m) => m.id === moduleId)
  if (!module) return <Navigate to={`/kurs/${courseId}`} replace />

  return (
    <div>
      {/* Brødsmulesti */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to={`/kurs/${courseId}`} className="hover:text-gray-700">{courseId?.toUpperCase()}</Link>
        <span>/</span>
        <Link to={`/kurs/${courseId}/modul/${moduleId}`} className="hover:text-gray-700">{module.title}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Oppgaver</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Oppgaver: {module.title}</h1>
      <p className="text-gray-500 mb-6">{module.exercises.length} oppgaver</p>

      {module.exercises.length === 0 ? (
        <p className="text-gray-500">Ingen oppgaver for denne modulen ennå.</p>
      ) : (
        module.exercises.map((exercise, idx) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={idx}
            courseId={courseId as CourseId}
            onAnswer={(correct) => recordExercise(exercise.id, module.id, courseId as CourseId, correct)}
            showHints={showHints}
          />
        ))
      )}
    </div>
  )
}
