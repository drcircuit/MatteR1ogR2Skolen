import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import type { CourseId } from '@/types'

export function useProgress() {
  const user = useAuthStore((s) => s.user)
  const {
    completedLessons,
    quizResults,
    examResults,
    isLoaded,
    loadProgress,
    completeLesson,
    recordExercise,
    recordQuizResult,
    recordExamResult,
    isLessonCompleted,
  } = useProgressStore()

  useEffect(() => {
    if (user && !isLoaded) {
      loadProgress(user.id)
    }
  }, [user, isLoaded, loadProgress])

  function getModuleLessonProgress(lessonIds: string[]): number {
    if (lessonIds.length === 0) return 0
    const done = lessonIds.filter((id) => completedLessons.has(id)).length
    return Math.round((done / lessonIds.length) * 100)
  }

  function getBestQuizScore(quizId: string): number | null {
    const results = quizResults.filter((r) => r.quizId === quizId)
    if (results.length === 0) return null
    return Math.max(...results.map((r) => r.score))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getCourseProgress(_courseId: CourseId, allLessonIds: string[]): number {
    if (allLessonIds.length === 0) return 0
    const done = allLessonIds.filter((id) => completedLessons.has(id)).length
    return Math.round((done / allLessonIds.length) * 100)
  }

  return {
    completedLessons,
    quizResults,
    examResults,
    isLoaded,
    isLessonCompleted,
    getModuleLessonProgress,
    getBestQuizScore,
    getCourseProgress,
    completeLesson: (lessonId: string, moduleId: string, courseId: CourseId) => {
      if (user) completeLesson(user.id, lessonId, moduleId, courseId)
    },
    recordExercise: (exerciseId: string, moduleId: string, courseId: CourseId, correct: boolean) => {
      if (user) recordExercise(user.id, exerciseId, moduleId, courseId, correct)
    },
    recordQuizResult: (quizId: string, moduleId: string, courseId: CourseId, score: number, correct: number, total: number) => {
      if (user) {
        recordQuizResult({
          userId: user.id,
          quizId,
          moduleId,
          courseId,
          score,
          correctCount: correct,
          totalCount: total,
          completedAt: new Date().toISOString(),
        })
      }
    },
    recordExamResult: (result: Parameters<typeof recordExamResult>[0]) => {
      if (user) recordExamResult(result)
    },
  }
}
