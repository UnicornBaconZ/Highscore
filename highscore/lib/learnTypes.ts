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

export type AnswerInput = {
  uk: string
  en: string
  translit: string
  deck: string
  correct: boolean
}

// Coerce any unknown value into a valid StatsBlob. Guards against partial or
// error responses (e.g. an API 400 body) ever reaching component state.
export function normalizeBlob(x: unknown): StatsBlob {
  const blob = emptyBlob()
  if (x && typeof x === 'object') {
    const o = x as Partial<StatsBlob>
    if (o.words && typeof o.words === 'object') blob.words = o.words
    if (o.streak && typeof o.streak === 'object') {
      blob.streak = {
        current: Number(o.streak.current) || 0,
        best: Number(o.streak.best) || 0,
        lastPracticed: o.streak.lastPracticed ?? null,
      }
    }
  }
  return blob
}

// Advance the daily streak. Shared by server and client fallback.
export function bumpStreak(blob: StatsBlob): void {
  const today = todayStr()
  const s = blob.streak
  if (s.lastPracticed === today) {
    // already counted today
  } else if (s.lastPracticed && daysBetween(s.lastPracticed, today) === 1) {
    s.current += 1
  } else {
    s.current = 1
  }
  s.best = Math.max(s.best, s.current)
  s.lastPracticed = today
}

// Apply one graded answer to a blob in place and return it. Single source of
// truth for the mutation — used server-side and as the client fallback.
export function applyAnswer(blob: StatsBlob, input: AnswerInput): StatsBlob {
  const existing = blob.words[input.uk] ?? {
    uk: input.uk,
    en: input.en,
    translit: input.translit,
    deck: input.deck,
    correct: 0,
    wrong: 0,
  }
  if (input.correct) existing.correct += 1
  else existing.wrong += 1
  existing.en = input.en
  existing.translit = input.translit
  existing.deck = input.deck
  blob.words[input.uk] = existing
  bumpStreak(blob)
  return blob
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
