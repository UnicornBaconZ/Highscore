'use client'

import { ReactNode, useState } from 'react'

type Win98WindowProps = {
  title: string
  children: ReactNode
  className?: string
  defaultMinimized?: boolean
}

export default function Win98Window({
  title,
  children,
  className = '',
  defaultMinimized = false,
}: Win98WindowProps) {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized)
  const [isClosed, setIsClosed] = useState(false)

  if (isClosed) return null

  return (
    <div
      className={`
        w-fit border-2 border-black bg-[#c0c0c0]
        shadow-[2px_2px_0px_0px_#ffffff_inset,-2px_-2px_0px_0px_#7b7b7b_inset]
        ${className}
      `}
    >
      <div
        className="
          flex items-center justify-between gap-2
          bg-[#000080] px-1 py-1 text-white
        "
      >
        <span className="truncate font-mono text-xs font-bold">{title}</span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            className="
    relative flex h-5 w-5 items-center justify-center
    border border-black bg-[#c0c0c0] text-black
    shadow-[1px_1px_0px_0px_#ffffff_inset,-1px_-1px_0px_0px_#7b7b7b_inset]
    active:shadow-[1px_1px_0px_0px_#7b7b7b_inset,-1px_-1px_0px_0px_#ffffff_inset]
  "
            aria-label={isMinimized ? 'Maximize window' : 'Minimize window'}
          >
            {isMinimized ? (
              <span className="block h-[8px] w-[8px] border-2 border-black" />
            ) : (
              <span className="mb-[2px] block text-[12px] leading-none">_</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsClosed(true)}
            className="
              flex h-5 w-5 items-center justify-center
              border border-black bg-[#c0c0c0] text-black
              shadow-[1px_1px_0px_0px_#ffffff_inset,-1px_-1px_0px_0px_#7b7b7b_inset]
              active:shadow-[1px_1px_0px_0px_#7b7b7b_inset,-1px_-1px_0px_0px_#ffffff_inset]
              font-mono text-[10px] leading-none
            "
            aria-label="Close window"
          >
            X
          </button>
        </div>
      </div>

      {!isMinimized && <div className="bg-[#c0c0c0] p-2">{children}</div>}
    </div>
  )
}
