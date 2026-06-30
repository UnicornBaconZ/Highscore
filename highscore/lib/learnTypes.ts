// Shared types + pure helpers for the Ukrainian learning stats.
// No side effects, no fs, no window — safe to import from both
// server (API route) and client (components).

export type WordStat = {
  uk: string
  en: string
  translit: string
  deck: string
  correct: number
  wrong: number
}

export type StreakData = {
  current: number
  best: number
  lastPracticed: string | null // 'YYYY-MM-DD'
}

// The full blob persisted to disk and returned by the API.
export type StatsBlob = {
  words: Record<string, WordStat>
  streak: StreakData
}

export type StreakStatus = StreakData & {
  // today   = practiced today, safe
  // pending = practiced yesterday, alive but must practice today
  // broken  = missed a day, streak resets on next practice → shame
  // none    = never practiced
  status: 'today' | 'pending' | 'broken' | 'none'
  effectiveCurrent: number // 0 if broken, otherwise current
}

export const emptyBlob = (): StatsBlob => ({
  words: {},
  streak: { current: 0, best: 0, lastPracticed: null },
})

export function todayStr(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`).getTime()
  const db = new Date(`${b}T00:00:00`).getTime()
  return Math.round((db - da) / 86_400_000)
}

// Accuracy as a 0–100 number. Words never seen return 0.
export function accuracy(stat: WordStat): number {
  const total = stat.correct + stat.wrong
  return total === 0 ? 0 : Math.round((stat.correct / total) * 100)
}

// Worst first: lowest accuracy, then most wrong as a tiebreak.
export function worstWords(blob: StatsBlob): WordStat[] {
  return Object.values(blob.words).sort((a, b) => {
    const accA = accuracy(a)
    const accB = accuracy(b)
    if (accA !== accB) return accA - accB
    return b.wrong - a.wrong
  })
}

export function getStreakStatus(streak: StreakData): StreakStatus {
  if (!streak.lastPracticed) {
    return { ...streak, status: 'none', effectiveCurrent: 0 }
  }
  const gap = daysBetween(streak.lastPracticed, todayStr())
  if (gap <= 0) return { ...streak, status: 'today', effectiveCurrent: streak.current }
  if (gap === 1) return { ...streak, status: 'pending', effectiveCurrent: streak.current }
  return { ...streak, status: 'broken', effectiveCurrent: 0 }
}
