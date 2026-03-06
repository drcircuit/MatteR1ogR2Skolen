import { describe, expect, it } from 'vitest'
import { contentRepository } from '@/data/contentRepository'

describe('contentRepository', () => {
  it('henter kurs og modul fra sentralt oppslag', () => {
    const course = contentRepository.getCourse('r1')
    expect(course?.id).toBe('r1')

    const module = contentRepository.getModule('r1', 'r1-m1')
    expect(module?.id).toBe('r1-m1')
    expect(contentRepository.getModule('r1', 'ukjent-modul')).toBeNull()
  })

  it('knytter leksjon, oppgaver og quiz sammen i samme modulkontekst', () => {
    const lessonContext = contentRepository.getLessonContext('r1', 'r1-m1', 'r1-m1-l1')
    expect(lessonContext).not.toBeNull()
    expect(lessonContext?.module.id).toBe('r1-m1')

    const exercises = contentRepository.getExercisesForModule('r1', 'r1-m1', 'r1-m1-l1')
    const module = contentRepository.getModule('r1', 'r1-m1')
    expect(module).not.toBeNull()
    expect(exercises.length).toBeGreaterThan(0)

    const quiz = contentRepository.getQuiz('r1', 'r1-m1')
    expect(quiz).not.toBeNull()
    expect(quiz?.moduleId).toBe(module?.id)
  })

  it('fordeler leksjonsoppgaver enten via lessonId eller modulrekkefølge', () => {
    const lessonContext = contentRepository.getLessonContext('r1', 'r1-m1', 'r1-m1-l1')
    const module = contentRepository.getModule('r1', 'r1-m1')
    expect(lessonContext).not.toBeNull()
    expect(module).not.toBeNull()

    const lessonExercises = contentRepository.getExercisesForModule('r1', 'r1-m1', 'r1-m1-l1')
    expect(lessonExercises.length).toBeGreaterThan(0)

    for (const exercise of lessonExercises) {
      const idx = module!.exercises.findIndex((candidate) => candidate.id === exercise.id)
      const isDirectlyLinked = exercise.lessonId === lessonContext!.lesson.id
      const isDistributed = exercise.lessonId === undefined
        && module!.lessons.length > 0
        && idx % module!.lessons.length === lessonContext!.lessonIndex

      expect(isDirectlyLinked || isDistributed).toBe(true)
    }
  })

  it('samler oppgaver per kursfilter for prøveeksamen', () => {
    const r1Exercises = contentRepository.getAllExercises('r1')
    const r2Exercises = contentRepository.getAllExercises('r2')
    const both = contentRepository.getAllExercises('begge')

    expect(r1Exercises.length).toBeGreaterThan(0)
    expect(r2Exercises.length).toBeGreaterThan(0)
    expect(both.length).toBe(r1Exercises.length + r2Exercises.length)
  })
})
