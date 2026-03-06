import { create } from 'zustand'
import {
  db,
  markLessonComplete,
  saveExerciseResult,
  saveQuizResult,
  getCompletedLessons,
  getExerciseResults,
  getQuizResults,
  getExamResults,
} from '@/lib/storage/db'
import type { QuizResult, ExamResult, CourseId, ExerciseAssessment, ExerciseResult } from '@/types'

interface ProgressStore {
  completedLessons: Set<string>
  exerciseResults: ExerciseResult[]
  quizResults: QuizResult[]
  examResults: ExamResult[]
  isLoaded: boolean

  loadProgress: (userId: string) => Promise<void>
  completeLesson: (userId: string, lessonId: string, moduleId: string, courseId: CourseId) => Promise<void>
  recordExercise: (userId: string, exerciseId: string, moduleId: string, courseId: CourseId, assessment: ExerciseAssessment) => Promise<void>
  recordQuizResult: (result: Omit<QuizResult, 'id'>) => Promise<void>
  recordExamResult: (result: Omit<ExamResult, 'id'>) => Promise<void>
  isLessonCompleted: (lessonId: string) => boolean
  getModuleProgress: (moduleId: string, totalLessons: number) => number
  reset: () => void
}

export const useProgressStore = create<ProgressStore>()((set, get) => ({
  completedLessons: new Set(),
  exerciseResults: [],
  quizResults: [],
  examResults: [],
  isLoaded: false,

  loadProgress: async (userId: string) => {
    const [lessons, exercises, quizzes, exams] = await Promise.all([
      getCompletedLessons(userId),
      getExerciseResults(userId),
      getQuizResults(userId),
      getExamResults(userId),
    ])
    set({
      completedLessons: new Set(lessons),
      exerciseResults: exercises,
      quizResults: quizzes,
      examResults: exams,
      isLoaded: true,
    })
  },

  completeLesson: async (userId, lessonId, moduleId, courseId) => {
    await markLessonComplete(userId, lessonId, moduleId, courseId)
    set((state) => ({
      completedLessons: new Set([...state.completedLessons, lessonId]),
    }))
  },

  recordExercise: async (userId, exerciseId, moduleId, courseId, assessment) => {
    await saveExerciseResult(userId, exerciseId, moduleId, courseId, assessment)
    const exercises = await getExerciseResults(userId)
    set({ exerciseResults: exercises })
  },

  recordQuizResult: async (result) => {
    await saveQuizResult(result)
    const quizzes = await getQuizResults(result.userId)
    set({ quizResults: quizzes })
  },

  recordExamResult: async (result) => {
    await db.examResults.add(result)
    const exams = await getExamResults(result.userId)
    set({ examResults: exams })
  },

  isLessonCompleted: (lessonId) => {
    return get().completedLessons.has(lessonId)
  },

  getModuleProgress: (_moduleId, _totalLessons) => {
    return 0
  },

  reset: () => {
    set({
      completedLessons: new Set(),
      exerciseResults: [],
      quizResults: [],
      examResults: [],
      isLoaded: false,
    })
  },
}))
