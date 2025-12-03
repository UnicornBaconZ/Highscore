import MediaCard from '@/components/Media/MediaCard'
import { seriesData } from '@/data/series'

export default function SeriesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {seriesData.map((series) => (
        <MediaCard key={series.id} item={series} />
      ))}
    </div>
  )
}
