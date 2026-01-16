type MediaItem = {
  id: number
  title: string
  image?: string
  rating: number
  description: string
  genres?: string[]
}

export type MediaCardProps = {
  item: MediaItem
}
