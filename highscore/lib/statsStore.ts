// SERVER-ONLY. Persists learning stats to a JSON file on disk so the data
// is shared across browsers when the host has a writable filesystem.
//
// NOTE: serverless/static hosts (e.g. Vercel) have a read-only filesystem, so
// writes here will fail in production. The client falls back to localStorage
// in that case. For true cross-device sync in production, swap this module's
// read/write for a database or KV store.
//
// Do NOT import this from a client component — it uses Node's fs.

import { promises as fs } from 'fs'
import path from 'path'
import {
  applyAnswer,
  emptyBlob,
  normalizeBlob,
  type AnswerInput,
  type StatsBlob,
} from './learnTypes'

const FILE =
  process.env.LEARN_STATS_FILE ||
  path.join(process.cwd(), 'data', 'learn-stats.json')

// Serialize writes so concurrent requests don't clobber each other.
let writeChain: Promise<unknown> = Promise.resolve()

export async function readBlob(): Promise<StatsBlob> {
  try {
    const raw = await fs.readFile(FILE, 'utf8')
    return normalizeBlob(JSON.parse(raw))
  } catch {
    return emptyBlob()
  }
}

async function writeBlob(blob: StatsBlob): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true })
  await fs.writeFile(FILE, JSON.stringify(blob, null, 2), 'utf8')
}

export async function recordAnswer(input: AnswerInput): Promise<StatsBlob> {
  const run = writeChain.then(async () => {
    const blob = applyAnswer(await readBlob(), input)
    await writeBlob(blob)
    return blob
  })
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
