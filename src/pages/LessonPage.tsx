import { useParams, Navigate } from 'react-router-dom'
import type { CourseId } from '@/types'
import { contentRepository } from '@/data/contentRepository'
import { LessonViewer } from '@/features/lessons/LessonViewer'

export default function LessonPage() {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string
    moduleId: string
    lessonId: string
  }>()

  const course = contentRepository.getCourse(courseId)
  if (!course) return <Navigate to="/dashboard" replace />

  const module = contentRepository.getModule(courseId, moduleId)
  if (!module) return <Navigate to={`/kurs/${courseId}`} replace />

  const lessonIdx = module.lessons.findIndex((l) => l.id === lessonId)
  if (lessonIdx === -1) return <Navigate to={`/kurs/${courseId}/modul/${moduleId}`} replace />

  const lesson = module.lessons[lessonIdx]
  const prevLesson = lessonIdx > 0 ? module.lessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < module.lessons.length - 1 ? module.lessons[lessonIdx + 1] : null

  return (
    <LessonViewer
      lesson={lesson}
      module={module}
      courseId={courseId as CourseId}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  )
}
