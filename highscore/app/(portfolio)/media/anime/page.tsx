import MediaCard from '@/components/Media/MediaCard'
import { animeData } from '@/data/anime'

export default function AnimePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {animeData.map((anime) => (
        <MediaCard key={anime.id} item={anime} />
      ))}
    </div>
  )
}
