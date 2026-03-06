import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock KaTeX siden det ikke fungerer i jsdom
vi.mock('katex', () => ({
  default: {
    renderToString: (tex: string) => `<span class="katex-mock">${tex}</span>`,
  },
  renderToString: (tex: string) => `<span class="katex-mock">${tex}</span>`,
}))

vi.mock('react-katex', () => ({
  InlineMath: ({ math }: { math: string }) => `[INLINE: ${math}]`,
  BlockMath: ({ math }: { math: string }) => `[BLOCK: ${math}]`,
}))

// Mock dexie
vi.mock('dexie', () => {
  class MockDexie {
    version() { return { stores: () => {} } }
  }
  return { default: MockDexie }
})

// Mock IndexedDB-funksjoner
vi.mock('@/lib/storage/db', () => ({
  db: {},
  markLessonComplete: vi.fn(),
  saveExerciseResult: vi.fn(),
  saveQuizResult: vi.fn(),
  saveExamResult: vi.fn(),
  getCompletedLessons: vi.fn().mockResolvedValue([]),
  getQuizResults: vi.fn().mockResolvedValue([]),
  getExamResults: vi.fn().mockResolvedValue([]),
  clearUserData: vi.fn(),
}))

// Suppress console noise i tester
global.console.error = vi.fn()
global.console.warn = vi.fn()
