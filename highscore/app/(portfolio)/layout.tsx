import { Navbar } from '@/components/Navbar'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="px-4 py-10">{children}</main>
    </>
  )
}
