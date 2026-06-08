'use client'

import { useEffect, useState } from 'react'
import type { Deck } from '@/data/decks'
import { tabButtonClass } from '@/lib/tabButton'

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

  // Shuffle after mount and whenever the deck changes (avoids SSR mismatch).
  useEffect(() => {
    setOrder(shuffledIndices(deck.cards.length))
    setPos(0)
    setFlipped(false)
  }, [deck])

  const card = deck.cards[order[pos] ?? 0]

  function next() {
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
          </>
        )}
      </button>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          className={tabButtonClass(false)}
        >
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
        <button
          type="button"
          onClick={next}
          className={tabButtonClass(false)}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
