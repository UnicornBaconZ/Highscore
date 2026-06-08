'use client'

import { useEffect, useState } from 'react'
import type { Deck } from '@/data/decks'

function shuffle<T>(input: T[]): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Build 4 answer options (the correct English + up to 3 unique distractors).
function buildOptions(deck: Deck, correctIdx: number): string[] {
  const correct = deck.cards[correctIdx].en
  const distractors = shuffle(
    Array.from(
      new Set(
        deck.cards
          .filter((_, i) => i !== correctIdx)
          .map((c) => c.en)
          .filter((en) => en !== correct)
      )
    )
  ).slice(0, 3)
  return shuffle([correct, ...distractors])
}

export function Quiz({ deck }: { deck: Deck }) {
  const [order, setOrder] = useState<number[]>([])
  const [qPos, setQPos] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  // Set up a fresh shuffled run after mount / on deck change.
  useEffect(() => {
    setOrder(shuffle(deck.cards.map((_, i) => i)))
    setQPos(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }, [deck])

  // Regenerate options whenever we move to a new question.
  useEffect(() => {
    if (order.length === 0) return
    setOptions(buildOptions(deck, order[qPos]))
  }, [deck, order, qPos])

  if (order.length === 0 || options.length === 0) {
    return <p className="text-sm text-black">Loading quiz…</p>
  }

  const total = order.length
  const card = deck.cards[order[qPos]]
  const answered = selected !== null

  function choose(option: string) {
    if (answered) return
    setSelected(option)
    if (option === card.en) setScore((s) => s + 1)
  }

  function next() {
    if (qPos < total - 1) {
      setQPos((p) => p + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setOrder(shuffle(deck.cards.map((_, i) => i)))
    setQPos(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <div className="space-y-4 rounded-lg border-2 border-black bg-white p-6 text-center">
        <h3 className="text-xl font-bold">Done! 🎉</h3>
        <p className="text-lg">
          You scored{' '}
          <span className="font-bold text-[#D47A37]">
            {score} / {total}
          </span>{' '}
          ({pct}%)
        </p>
        <button
          type="button"
          onClick={restart}
          className="rounded-md border-2 border-black bg-[#D47A37] px-4 py-2 text-sm font-medium text-black transition-colors hover:brightness-105"
        >
          Play again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress + score */}
      <div className="flex items-center justify-between text-sm font-medium text-black">
        <span>
          Question {qPos + 1} / {total}
        </span>
        <span>Score: {score}</span>
      </div>

      {/* Prompt */}
      <div className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-6 py-8 text-center">
        <span className="text-xs uppercase tracking-wide text-black/60">
          What does this mean?
        </span>
        <span className="font-vt text-4xl font-bold text-black sm:text-5xl">
          {card.uk}
        </span>
        {answered && (
          <span className="font-vt text-base text-black/70">
            {card.translit}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isCorrect = option === card.en
          const isPicked = option === selected

          let stateClasses = 'bg-white hover:bg-[#F3EFE0]'
          if (answered) {
            if (isCorrect) stateClasses = 'bg-green-300'
            else if (isPicked) stateClasses = 'bg-red-300'
            else stateClasses = 'bg-white opacity-60'
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={answered}
              className={`rounded-md border-2 border-black px-4 py-3 text-left text-sm font-medium text-black transition-colors ${stateClasses}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Next */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={next}
          disabled={!answered}
          className="rounded-md border-2 border-black bg-[#D47A37] px-5 py-2 text-sm font-medium text-black transition-colors hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {qPos < total - 1 ? 'Next →' : 'Finish'}
        </button>
      </div>
    </div>
  )
}
