// Client-side API for the Ukrainian learning stats.
//
// Primary store is a JSON file on the server (lib/statsStore.ts), shared across
// browsers when the host filesystem is writable. On read-only hosts (serverless
// production) the server returns an error; we then fall back to this browser's
// localStorage so the app keeps working and never crashes.

import type { Card } from '@/data/decks'
import {
  applyAnswer,
  emptyBlob,
  normalizeBlob,
  type StatsBlob,
} from './learnTypes'

// Re-export shared types + pure helpers so existing imports keep working.
export { accuracy, worstWords, getStreakStatus } from './learnTypes'
export type { WordStat, StreakData, StreakStatus, StatsBlob } from './learnTypes'

// Fired whenever stats change, so open pages can refresh live.
export const STATS_EVENT = 'uk-stats-updated'

const ENDPOINT = '/api/learn-stats'
const LS_KEY = 'uk_stats_blob_v1'

function emit(blob: StatsBlob) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STATS_EVENT, { detail: blob }))
  }
}

function lsRead(): StatsBlob | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? normalizeBlob(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

function lsWrite(blob: StatsBlob) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(blob))
  } catch {
    /* storage full or blocked — ignore */
  }
}

export async function fetchStats(): Promise<StatsBlob> {
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' })
    if (res.ok) {
      const blob = normalizeBlob(await res.json())
      lsWrite(blob) // keep the local mirror fresh
      return blob
    }
  } catch {
    /* fall through to local */
  }
  return lsRead() ?? emptyBlob()
}

export async function recordAnswer(
  card: Card,
  deckLabel: string,
  correct: boolean
): Promise<StatsBlob> {
  const input = {
    uk: card.uk,
    en: card.en,
    translit: card.translit,
    deck: deckLabel,
    correct,
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (res.ok) {
      const blob = normalizeBlob(await res.json())
      lsWrite(blob)
      emit(blob)
      return blob
    }
  } catch {
    /* fall through to local */
  }

  // Server could not persist (read-only host, offline, etc.) — apply locally.
  const blob = applyAnswer(lsRead() ?? emptyBlob(), input)
  lsWrite(blob)
  emit(blob)
  return blob
}

export async function resetAllStats(): Promise<StatsBlob> {
  let blob = emptyBlob()
  try {
    const res = await fetch(ENDPOINT, { method: 'DELETE' })
    if (res.ok) blob = normalizeBlob(await res.json())
  } catch {
    /* ignore — still clear local */
  }
  lsWrite(blob)
  emit(blob)
  return blob
}
