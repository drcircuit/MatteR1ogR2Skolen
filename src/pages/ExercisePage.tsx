import { useParams, Navigate, Link } from 'react-router-dom'
import type { CourseId } from '@/types'
import { contentRepository } from '@/data/contentRepository'
import { ExerciseCard } from '@/features/exercises/ExerciseCard'
import { useProgress } from '@/hooks/useProgress'
import { useSettingsStore } from '@/store/settingsStore'

export default function ExercisePage() {
  const { courseId, moduleId, lessonId } = useParams<{ courseId: string; moduleId: string; lessonId?: string }>()
  const { recordExerciseAssessment, getExerciseResult } = useProgress()
  const showHints = useSettingsStore((s) => s.showHints)

  const course = contentRepository.getCourse(courseId)
  if (!course) return <Navigate to="/dashboard" replace />

  const module = contentRepository.getModule(courseId, moduleId)
  if (!module) return <Navigate to={`/kurs/${courseId}`} replace />
  const lessonContext = contentRepository.getLessonContext(courseId, moduleId, lessonId)
  const lesson = lessonContext?.lesson ?? null
  const exercises = contentRepository.getExercisesForModule(courseId, moduleId, lessonId)

  const competenceRefs = lesson?.competenceGoalRefs
    ?? module.competenceGoals?.map((goal) => goal.id)
    ?? []

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

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {lesson ? `Oppgaver for leksjon: ${lesson.title}` : `Oppgaver: ${module.title}`}
      </h1>
      <p className="text-gray-500 mb-2">{exercises.length} oppgaver</p>
      {competenceRefs.length > 0 && (
        <p className="text-xs text-blue-700 mb-6">
          Dekker kompetansemål: {competenceRefs.join(', ')}
        </p>
      )}

      {exercises.length === 0 ? (
        <p className="text-gray-500">Ingen oppgaver for denne modulen ennå.</p>
      ) : (
        exercises.map((exercise, idx) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={idx}
            courseId={courseId as CourseId}
            latestResult={getExerciseResult(exercise.id)}
            onAnswer={(assessment) => recordExerciseAssessment(exercise.id, module.id, courseId as CourseId, assessment)}
            showHints={showHints}
          />
        ))
      )}
    </div>
  )
}
