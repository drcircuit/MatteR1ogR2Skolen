import { r1Course } from '@/data/r1'
import { r2Course } from '@/data/r2'
import type { Course, CourseId, Exercise, Lesson, Module, Quiz } from '@/types'

export type ExamCourseFilter = CourseId | 'begge'

interface LessonContext {
  course: Course
  module: Module
  lesson: Lesson
  lessonIndex: number
}

const courses: Course[] = [r1Course, r2Course]

const courseById = new Map<CourseId, Course>(
  courses.map((course) => [course.id, course]),
)

const moduleByKey = new Map<string, Module>()
const lessonContextByKey = new Map<string, LessonContext>()

for (const course of courses) {
  for (const module of course.modules) {
    moduleByKey.set(`${course.id}:${module.id}`, module)
    module.lessons.forEach((lesson, lessonIndex) => {
      lessonContextByKey.set(
        `${course.id}:${module.id}:${lesson.id}`,
        {
          course,
          module,
          lesson,
          lessonIndex,
        },
      )
    })
  }
}

function getCourse(courseId?: string | null): Course | null {
  if (!courseId) return null
  return courseById.get(courseId as CourseId) ?? null
}

function getModule(courseId?: string | null, moduleId?: string | null): Module | null {
  if (!courseId || !moduleId) return null
  return moduleByKey.get(`${courseId}:${moduleId}`) ?? null
}

function getLessonContext(
  courseId?: string | null,
  moduleId?: string | null,
  lessonId?: string | null,
): LessonContext | null {
  if (!courseId || !moduleId || !lessonId) return null
  return lessonContextByKey.get(`${courseId}:${moduleId}:${lessonId}`) ?? null
}

function getExercisesForLesson(moduleExercises: Exercise[], moduleLessons: Lesson[], lessonContext: LessonContext): Exercise[] {
  return moduleExercises.filter((exercise, idx) => (
    exercise.lessonId === lessonContext.lesson.id
    || (
      exercise.lessonId === undefined
      && moduleLessons.length > 0
      && idx % moduleLessons.length === lessonContext.lessonIndex
    )
  ))
}

function getExercisesForModule(
  courseId?: string | null,
  moduleId?: string | null,
  lessonId?: string | null,
): Exercise[] {
  const module = getModule(courseId, moduleId)
  if (!module) return []
  if (!lessonId) return module.exercises
  const lessonContext = getLessonContext(courseId, moduleId, lessonId)
  if (!lessonContext) return []
  return getExercisesForLesson(module.exercises, module.lessons, lessonContext)
}

function getQuiz(courseId?: string | null, moduleId?: string | null): Quiz | null {
  const module = getModule(courseId, moduleId)
  return module?.quiz ?? null
}

function getAllExercises(filter: ExamCourseFilter = 'begge'): Exercise[] {
  const selectedCourses = filter === 'begge'
    ? courses
    : courses.filter((course) => course.id === filter)

  return selectedCourses.flatMap((course) =>
    course.modules.flatMap((module) => [
      ...module.exercises,
      ...module.quiz.questions,
    ] as Exercise[]),
  )
}

function getAllLessonIds(courseId: CourseId): string[] {
  const course = courseById.get(courseId)
  if (!course) return []
  return course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id))
}

export const contentRepository = {
  courses,
  getCourse,
  getModule,
  getLessonContext,
  getExercisesForModule,
  getQuiz,
  getAllExercises,
  getAllLessonIds,
}
