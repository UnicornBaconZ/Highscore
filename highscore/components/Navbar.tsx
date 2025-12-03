'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type NavLink = {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/media/series', label: 'Media' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-slate-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D47A37] text-sm font-bold">
            Z
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-[#F3EFE0] sm:inline">
            Zarin Vansteelandt
          </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium text-[#E8E3D5] md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(link.href)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    'transition-colors hover:text-[#D47A37]',
                    isActive ? 'text-[#D47A37]' : 'text-[#E8E3D5]',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-700 px-2 py-1 text-[#E8E3D5] hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1">
            <span
              className={`block h-1 w-5 bg-[#D47A37] transition-transform rounded-t-lg ${
                isOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-1 w-5 bg-[#A95A24] transition-opacity rounded-lg ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-1 w-5 bg-[#D47A37] transition-transform rounded-b-sm ${
                isOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-2 text-sm font-medium text-[#E8E3D5]">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      'block rounded-md px-2 py-2 transition-colors',
                      isActive
                        ? 'bg-slate-800 text-[#D47A37]'
                        : 'hover:bg-slate-900',
                    ].join(' ')}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
