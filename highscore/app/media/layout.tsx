import MediaTabs from '@/components/Media/MediaTabs'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Media</h1>
      <MediaTabs />

      <div>{children}</div>
    </section>
  )
}
