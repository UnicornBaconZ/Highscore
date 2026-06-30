import { NextResponse } from 'next/server'
import { readBlob, recordAnswer, resetBlob } from '@/lib/statsStore'

// Always run on the server, never cached — we read/write a file.
export const dynamic = 'force-dynamic'

export async function GET() {
  const blob = await readBlob()
  return NextResponse.json(blob)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { uk, en, translit, deck, correct } = body ?? {}
    if (typeof uk !== 'string' || typeof correct !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    const blob = await recordAnswer({
      uk,
      en: String(en ?? ''),
      translit: String(translit ?? ''),
      deck: String(deck ?? ''),
      correct,
    })
    return NextResponse.json(blob)
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export async function DELETE() {
  const blob = await resetBlob()
  return NextResponse.json(blob)
}
