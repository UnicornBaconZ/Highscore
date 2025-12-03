'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MediaTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Series', href: '/media/series' },
    { name: 'Movies', href: '/media/movies' },
    { name: 'Music', href: '/media/music' },
  ]

  return (
    <div
      className="
        flex flex-wrap justify-center gap-2
        mb-6
        border-b-4 border-[#2b2b2b]
        pb-3
      "
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`
              px-3 py-1.5 
              text-sm font-semibold
              border-2 rounded-sm 
              transition-all
              ${
                active
                  ? 'bg-[#2b2b2b] text-[#f5e6c8] border-[#2b2b2b]'
                  : 'bg-[#f5e6c8] text-[#2b2b2b] border-[#2b2b2b] hover:bg-[#e6d7b8]'
              }
              shadow-[3px_3px_0px_0px_#2b2b2b]
              hover:shadow-[1px_1px_0px_0px_#2b2b2b]
              active:shadow-[0px_0px_0px_0px_#2b2b2b]
            `}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
