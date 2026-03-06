import Dexie, { type Table } from 'dexie'
import type {
  LessonProgress,
  ExerciseResult,
  QuizResult,
  ExamResult,
  ExerciseAssessment,
} from '@/types'

class MatteSkoleDatabase extends Dexie {
  lessonProgress!: Table<LessonProgress>
  exerciseResults!: Table<ExerciseResult>
  quizResults!: Table<QuizResult>
  examResults!: Table<ExamResult>

  constructor() {
    super('MatteR1ogR2Skolen')

    this.version(1).stores({
      lessonProgress: '++id, userId, lessonId, moduleId, courseId, completedAt',
      exerciseResults: '++id, userId, exerciseId, moduleId, courseId, correct, answeredAt',
      quizResults: '++id, userId, quizId, moduleId, courseId, score, completedAt',
      examResults: '++id, userId, examTitle, courseId, score, completedAt',
    })
  }
}

export const db = new MatteSkoleDatabase()

// ─── Hjelpefunksjoner ──────────────────────────────────────────────────────

export async function markLessonComplete(
  userId: string,
  lessonId: string,
  moduleId: string,
  courseId: string,
): Promise<void> {
  const existing = await db.lessonProgress
    .where({ userId, lessonId })
    .first()
  if (!existing) {
    await db.lessonProgress.add({
      userId,
      lessonId,
      moduleId,
      courseId: courseId as import('@/types').CourseId,
      completedAt: new Date().toISOString(),
    })
  }
}

export async function saveExerciseResult(
  userId: string,
  exerciseId: string,
  moduleId: string,
  courseId: string,
  assessment: ExerciseAssessment,
): Promise<void> {
  const existing = await db.exerciseResults
    .where({ userId, exerciseId })
    .first()
  if (existing?.id !== undefined) {
    await db.exerciseResults.update(existing.id, {
      correct: assessment.correct,
      submittedAnswer: assessment.submittedAnswer,
      assessmentFeedback: assessment.assessmentFeedback,
      assessmentScore: assessment.assessmentScore,
      answeredAt: new Date().toISOString(),
      attemptCount: (existing.attemptCount || 0) + 1,
    })
  } else {
    await db.exerciseResults.add({
      userId,
      exerciseId,
      moduleId,
      courseId: courseId as import('@/types').CourseId,
      correct: assessment.correct,
      submittedAnswer: assessment.submittedAnswer,
      assessmentFeedback: assessment.assessmentFeedback,
      assessmentScore: assessment.assessmentScore,
      answeredAt: new Date().toISOString(),
      attemptCount: 1,
    })
  }
}

export async function saveQuizResult(result: Omit<QuizResult, 'id'>): Promise<void> {
  const existing = await db.quizResults
    .where({ userId: result.userId, quizId: result.quizId })
    .first()
  if (existing?.id !== undefined) {
    await db.quizResults.update(existing.id, result)
  } else {
    await db.quizResults.add(result)
  }
}

export async function saveExamResult(result: Omit<ExamResult, 'id'>): Promise<void> {
  await db.examResults.add(result)
}

export async function getCompletedLessons(userId: string): Promise<string[]> {
  const records = await db.lessonProgress.where({ userId }).toArray()
  return records.map((r) => r.lessonId)
}

export async function getQuizResults(userId: string): Promise<QuizResult[]> {
  return db.quizResults.where({ userId }).toArray()
}

export async function getExerciseResults(userId: string): Promise<ExerciseResult[]> {
  return db.exerciseResults.where({ userId }).toArray()
}

export async function getExamResults(userId: string): Promise<ExamResult[]> {
  return db.examResults.where({ userId }).reverse().sortBy('completedAt')
}

export async function clearUserData(userId: string): Promise<void> {
  await db.lessonProgress.where({ userId }).delete()
  await db.exerciseResults.where({ userId }).delete()
  await db.quizResults.where({ userId }).delete()
  await db.examResults.where({ userId }).delete()
}
