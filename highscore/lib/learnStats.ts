// Client-side API for the Ukrainian learning stats.
// Data is stored in a JSON file on the server (see lib/statsStore.ts), so it
// is shared across every browser — not tied to one browser's localStorage.

import type { Card } from '@/data/decks'
import { emptyBlob, type StatsBlob } from './learnTypes'

// Re-export shared types + pure helpers so existing imports keep working.
export {
  accuracy,
  worstWords,
  getStreakStatus,
} from './learnTypes'
export type {
  WordStat,
  StreakData,
  StreakStatus,
  StatsBlob,
} from './learnTypes'

// Fired whenever stats change, so open pages can refresh live.
export const STATS_EVENT = 'uk-stats-updated'

const ENDPOINT = '/api/learn-stats'

function emit(blob: StatsBlob) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STATS_EVENT, { detail: blob }))
  }
}

export async function fetchStats(): Promise<StatsBlob> {
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' })
    if (!res.ok) return emptyBlob()
    return (await res.json()) as StatsBlob
  } catch {
    return emptyBlob()
  }
}

export async function recordAnswer(
  card: Card,
  deckLabel: string,
  correct: boolean
): Promise<StatsBlob> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uk: card.uk,
        en: card.en,
        translit: card.translit,
        deck: deckLabel,
        correct,
      }),
    })
    const blob = (await res.json()) as StatsBlob
    emit(blob)
    return blob
  } catch {
    return emptyBlob()
  }
}

export async function resetAllStats(): Promise<StatsBlob> {
  try {
    const res = await fetch(ENDPOINT, { method: 'DELETE' })
    const blob = (await res.json()) as StatsBlob
    emit(blob)
    return blob
  } catch {
    return emptyBlob()
  }
}
