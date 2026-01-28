'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

export default function ValentinePage() {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)
  const [noCount, setNoCount] = useState(0)

  type Photo = {
    src: string
    rotate: string
    top: string | null
    bottom: string | null
    left: string | null
    right: string | null
    centerX?: boolean
    portrait?: boolean
  }

  function openWhatsApp() {
    const phone = '0474888632' // <-- your number in international format (no +, no spaces)
    const text = encodeURIComponent('I clicked YES 💖')
    window.open(
      `https://wa.me/${phone}?text=${text}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function FramedBackground() {
    const photos: Photo[] = [
      {
        src: '/valentine/1.png',
        rotate: 'rotate-2',
        top: 'top-8',
        bottom: null,
        left: 'left-1/2',
        right: null,
        centerX: true,
      },
      {
        src: '/valentine/2.png',
        rotate: 'rotate-3',
        top: 'top-24',
        bottom: null,
        left: null,
        right: 'right-8',
      },
      {
        src: '/valentine/3.png',
        rotate: 'rotate-6',
        top: null,
        bottom: 'bottom-16',
        left: 'left-16',
        right: null,
      },
      {
        src: '/valentine/4.png',
        rotate: '-rotate-3',
        top: null,
        bottom: 'bottom-10',
        left: 'left-1/2',
        right: null,
        centerX: true,
      },
      {
        src: '/valentine/5.png',
        rotate: '-rotate-6',
        top: 'top-10',
        bottom: null,
        left: 'left-6',
        right: null,
        portrait: true,
      },
      {
        src: '/valentine/6.png',
        rotate: '-rotate-9',
        top: null,
        bottom: 'bottom-10',
        left: null,
        right: 'right-14',
        portrait: true,
      },
    ]

    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-pink-50" />

        <div className="absolute inset-0 z-0">
          {photos.map((p, i) => (
            <div
              key={i}
              className={[
                'rounded-3xl bg-white shadow-xl ring-1 ring-black/10',
                'p-2',
                p.rotate,
                p.top ?? '',
                p.bottom ?? '',
                p.left ?? '',
                p.right ?? '',
                p.centerX ? '-translate-x-1/2' : '',
                p.portrait
                  ? 'absolute w-44 h-56 md:w-56 md:h-72'
                  : 'absolute w-56 h-40 md:w-72 md:h-48',
              ].join(' ')}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overlay ABOVE frames but BELOW content (NO blur so photos stay sharp) */}
        <div className="absolute inset-0 z-10 bg-white/35" />
      </div>
    )
  }

  const noLabels = useMemo(
    () => [
      'No',
      'Are you sure?',
      'Really sure?',
      'Think again 😅',
      'Last chance…',
      'Okay okay…',
      'Don’t do this to me 🥲',
    ],
    []
  )

  const currentNoLabel = noLabels[Math.min(noCount, noLabels.length - 1)]

  function handleNoClick() {
    if (noCount < noLabels.length - 1) {
      setNoCount((c) => c + 1)
      return
    }

    setAnswer('no')
  }

  return (
    <div className="relative min-h-screen">
      <FramedBackground />
      <div className="relative z-20 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="rounded-3xl bg-white/70 shadow-lg p-10 border border-black/10">
            {answer === null && (
              <>
                <h1 className="text-3xl md:text-4xl leading-tight">
                  Will you be my Valentine, Tetiana?
                </h1>

                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setAnswer('yes')
                      openWhatsApp()
                    }}
                    className="px-6 py-3 rounded-2xl border border-black/20 shadow-sm bg-black text-white hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    Yes 💘
                  </button>

                  <button
                    onClick={handleNoClick}
                    className="px-6 py-3 rounded-2xl border border-black/20 shadow-sm bg-white hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    {currentNoLabel}
                  </button>
                </div>
              </>
            )}

            {answer === 'yes' && (
              <>
                <h2 className="text-3xl md:text-4xl">YAYYY!! 🥰💞</h2>
                <p className="mt-4 text-lg opacity-80">
                  You just made me the happiest person ever.
                </p>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      setAnswer(null)
                      setNoCount(0)
                    }}
                    className="px-6 py-3 rounded-2xl border border-black/20 bg-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    Restart
                  </button>
                </div>
              </>
            )}

            {answer === 'no' && (
              <>
                <h2 className="text-2xl md:text-3xl">I respect that… 😌</h2>
                <p className="mt-4 text-base opacity-80">
                  But I’m still going to ask nicely again.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setAnswer(null)}
                    className="px-6 py-3 rounded-2xl border border-black/20 bg-black text-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    Ask again 💖
                  </button>

                  <button
                    onClick={() => setAnswer('yes')}
                    className="px-6 py-3 rounded-2xl border border-black/20 bg-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    Okay fine… Yes 😄
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
