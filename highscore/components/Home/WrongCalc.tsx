'use client'
import { useState } from 'react'

export default function WrongCalc() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<string | null>(null)

  function calculate() {
    if (!a || !b) return
    const wrong = Math.floor(Math.random() * 9999) + 1
    setResult(wrong.toString())
  }

  return (
    <div
      className="
      border-4 border-[#2b2b2b] bg-[#FF9F1C]
      p-4 rounded-sm
      shadow-[6px_6px_0px_0px_#2b2b2b]
      w-56 font-mono text-sm
      space-y-3 text-[#2b2b2b]
    "
    >
      <div className="font-bold border-b-2 border-[#2b2b2b] pb-1">
        RETRO CALC v0.1
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Number A"
          className="border border-[#2b2b2b] bg-[#f5e6c8] px-2 py-1"
        />

        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Number B"
          className="border border-[#2b2b2b] bg-[#f5e6c8] px-2 py-1"
        />

        <button
          onClick={calculate}
          className="
            bg-[#2b2b2b] text-white px-3 py-1
            shadow-[3px_3px_0_#000]
            active:shadow-[0px_0px_0_#000]
          "
        >
          CALCULATE
        </button>

        <div className="border-t border-[#2b2b2b] pt-2">
          Result: {result ?? '???'}
        </div>
      </div>
    </div>
  )
}
