import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Handjet } from 'next/font/google'
import './tailwind.css'

const pressStart = localFont({
  src: './fonts/PressStart2P-vaV7.ttf',
  display: 'swap',
  variable: '--font-pressstart',
})

const cooperBlack = localFont({
  src: './fonts/coopbl.ttf',
  display: 'swap',
  variable: '--font-cooperblack',
})

// Retro pixel/LED font with Cyrillic support, used for Ukrainian text.
const handjet = Handjet({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: 'Zarin Vansteelandt | Portfolio',
  description: 'Retro portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${cooperBlack.variable} ${handjet.variable}`}
    >
      <body className="bg-[#F3EFE0] text-[#1A1A1A] font-pressstart">
        {children}
      </body>
    </html>
  )
}
