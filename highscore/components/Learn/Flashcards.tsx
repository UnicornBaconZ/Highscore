'use client'

import { useEffect, useState } from 'react'
import type { Deck } from '@/data/decks'
import { tabButtonClass } from '@/lib/tabButton'
import {
  fetchStats,
  recordAnswer,
  type StatsBlob,
} from '@/lib/learnStats'
import { emptyBlob } from '@/lib/learnTypes'

// Fisher-Yates shuffle, returns a new shuffled array of indices [0..n-1].
function shuffledIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function Flashcards({ deck }: { deck: Deck }) {
  const [order, setOrder] = useState<number[]>([])
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [blob, setBlob] = useState<StatsBlob>(emptyBlob())
  const [session, setSession] = useState({ correct: 0, wrong: 0 })

  // Shuffle after mount and whenever the deck changes (avoids SSR mismatch).
  useEffect(() => {
    setOrder(shuffledIndices(deck.cards.length))
    setPos(0)
    setFlipped(false)
    setSession({ correct: 0, wrong: 0 })
  }, [deck])

  // Load lifetime stats from the server once on mount.
  useEffect(() => {
    fetchStats().then(setBlob)
  }, [])

  const card = deck.cards[order[pos] ?? 0]
  const stat = card ? blob.words[card.uk] : undefined

  function advance() {
    setFlipped(false)
    setPos((p) => {
      if (p < order.length - 1) return p + 1
      setOrder(shuffledIndices(deck.cards.length)) // reshuffle on loop
      return 0
    })
  }

  function prev() {
    setFlipped(false)
    setPos((p) => (p - 1 + order.length) % order.length)
  }

  function reshuffle() {
    setOrder(shuffledIndices(deck.cards.length))
    setPos(0)
    setFlipped(false)
  }

  async function grade(correct: boolean) {
    setSession((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }))
    advance()
    const updated = await recordAnswer(card, deck.label, correct)
    setBlob(updated)
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-black bg-white px-6 py-10 text-center text-black transition-colors hover:border-[#D47A37]"
        aria-label="Flip card"
      >
        {!flipped ? (
          <>
            <span className="font-vt text-5xl font-bold text-black sm:text-6xl">
              {card.uk}
            </span>
            <span className="text-sm text-black">tap to reveal</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-semibold text-black sm:text-3xl">
              {card.en}
            </span>
            <span className="text-base italic text-black">
              {card.translit}
            </span>
            <span className="font-vt text-2xl text-black">{card.uk}</span>
            {stat && (
              <span className="mt-1 text-xs text-black/70">
                lifetime: ✓ {stat.correct} · ✗ {stat.wrong}
              </span>
            )}
          </>
        )}
      </button>

      {/* Grade buttons — only after the answer is revealed */}
      {flipped ? (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => grade(false)}
            className="flex-1 rounded-sm border-2 border-[#2b2b2b] bg-[#e9573f] px-3 py-2 text-sm font-semibold text-[#f5e6c8] shadow-[3px_3px_0px_0px_#2b2b2b] transition-all hover:shadow-[1px_1px_0px_0px_#2b2b2b] active:shadow-[0px_0px_0px_0px_#2b2b2b]"
          >
            ✗ Got it wrong
          </button>
          <button
            type="button"
            onClick={() => grade(true)}
            className="flex-1 rounded-sm border-2 border-[#2b2b2b] bg-[#3f9142] px-3 py-2 text-sm font-semibold text-[#f5e6c8] shadow-[3px_3px_0px_0px_#2b2b2b] transition-all hover:shadow-[1px_1px_0px_0px_#2b2b2b] active:shadow-[0px_0px_0px_0px_#2b2b2b]"
          >
            ✓ Got it right
          </button>
        </div>
      ) : (
        <p className="text-center text-xs text-black/60">
          Reveal the answer, then mark whether you got it right.
        </p>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={prev} className={tabButtonClass(false)}>
          ← Prev
        </button>
        <button
          type="button"
          onClick={reshuffle}
          className="text-sm font-medium text-black underline-offset-2 hover:underline"
          aria-label="Shuffle deck"
        >
          {pos + 1} / {deck.cards.length}
        </button>
        <button type="button" onClick={advance} className={tabButtonClass(false)}>
          Skip →
        </button>
      </div>

      {/* Session tally */}
      <p className="text-center text-xs text-black/60">
        This session: <span className="text-[#3f9142]">✓ {session.correct}</span>{' '}
        · <span className="text-[#e9573f]">✗ {session.wrong}</span>
      </p>
    </div>
  )
}
