import MediaCard from '@/components/Media/MediaCard'
import { moviesData } from '@/data/movies'

export default function MoviesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {moviesData.map((movie) => (
        <MediaCard key={movie.id} item={movie} />
      ))}
    </div>
  )
}
