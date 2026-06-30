// SERVER-ONLY. Persists learning stats to a JSON file on disk so the data
// is shared across every browser that talks to this running app, instead of
// living in a single browser's localStorage.
//
// Do NOT import this from a client component — it uses Node's fs.

import { promises as fs } from 'fs'
import path from 'path'
import {
  emptyBlob,
  todayStr,
  daysBetween,
  type StatsBlob,
} from './learnTypes'

// Stored at the project root. Override with LEARN_STATS_FILE if you want it
// elsewhere (e.g. a persistent volume).
const FILE =
  process.env.LEARN_STATS_FILE ||
  path.join(process.cwd(), 'data', 'learn-stats.json')

// Serialize writes so concurrent requests don't clobber each other.
let writeChain: Promise<unknown> = Promise.resolve()

export async function readBlob(): Promise<StatsBlob> {
  try {
    const raw = await fs.readFile(FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<StatsBlob>
    return {
      words: parsed.words ?? {},
      streak: parsed.streak ?? emptyBlob().streak,
    }
  } catch {
    // Missing or unreadable file → start fresh.
    return emptyBlob()
  }
}

async function writeBlob(blob: StatsBlob): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true })
  await fs.writeFile(FILE, JSON.stringify(blob, null, 2), 'utf8')
}

function bumpStreak(blob: StatsBlob): void {
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

type AnswerInput = {
  uk: string
  en: string
  translit: string
  deck: string
  correct: boolean
}

export async function recordAnswer(input: AnswerInput): Promise<StatsBlob> {
  const run = writeChain.then(async () => {
    const blob = await readBlob()
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
    await writeBlob(blob)
    return blob
  })
  // Keep the chain alive even if this run rejects.
  writeChain = run.catch(() => undefined)
  return run
}

export async function resetBlob(): Promise<StatsBlob> {
  const run = writeChain.then(async () => {
    const blob = emptyBlob()
    await writeBlob(blob)
    return blob
  })
  writeChain = run.catch(() => undefined)
  return run
}
