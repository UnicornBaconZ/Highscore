export type FavoriteSong = {
  id: number
  title: string
  artist: string
  album?: string
  image?: string
  spotifyUrl?: string
  genres?: string[]
}

export const favoriteSongs: FavoriteSong[] = [
  {
    id: 1,
    title: 'Drowning',
    artist: 'Just Pete',
    image: '/assets/songs/drowning.jpg',
    spotifyUrl: 'https://open.spotify.com/track/1MYY8XEVMlp7S1sfRQucnK',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 2,
    title: 'Salt',
    artist: 'Ava Max',
    image: '/assets/songs/salt.jpg',
    spotifyUrl: 'https://open.spotify.com/track/5iyZwawawLjHYpX4MxUKVF',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 3,
    title: 'Led to Lead',
    artist: 'Fizzle',
    image: '/assets/songs/ledtolead.jpg',
    spotifyUrl: 'https://open.spotify.com/track/3OH32c0nSZ0h1Ctyinmu6N',
    genres: ['Favorite'],
  },
  {
    id: 4,
    title: 'Flowers Need Rain',
    artist: 'Preston Pablo',
    image: '/assets/songs/flowersneedrain.jpg',
    spotifyUrl: 'https://open.spotify.com/track/079mntueS2KWjxVqOHjG70',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 5,
    title: 'It Is What It Is',
    artist: 'Jamie Miller',
    image: '/assets/songs/itiswhatitis.jpg',
    spotifyUrl: 'https://open.spotify.com/track/2kHcMUgIqU3t87wjoGhrd6',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 6,
    title: '@ My Worst',
    artist: 'blackbear',
    image: '/assets/songs/@myworst.jpg',
    spotifyUrl: 'https://open.spotify.com/track/0mHGftgYtmpH4y17T3VZ2E',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 7,
    title: 'Easier',
    artist: 'Parkwild',
    image: '/assets/songs/easier.jpg',
    spotifyUrl: 'https://open.spotify.com/album/38Z8BNniYSvvriXzyaJkLK',
    genres: ['Favorite'],
  },
  {
    id: 8,
    title: 'Hypothetically',
    artist: 'John Michael Howell',
    image: '/assets/songs/hypothetically.jpg',
    spotifyUrl: 'https://open.spotify.com/track/6rDmmnePftfSBjfSb56N4Y',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 9,
    title: 'Worst Day',
    artist: 'Halden Rule',
    image: '/assets/songs/worstday.jpg',
    spotifyUrl: 'https://open.spotify.com/track/5cmjXV3itE3oicNdbvfjGD',
    genres: ['Favorite'],
  },
  {
    id: 10,
    title: 'Кіно',
    artist: 'MBreeze',
    image: '/assets/songs/kino.jpg',
    spotifyUrl: 'https://open.spotify.com/track/5zY2BOFeVnhkSCqjRU212E',
    genres: ['Favorite'],
  },
  {
    id: 11,
    title: 'Meant To Be',
    artist: 'bbno$',
    image: '/assets/songs/meanttobe.jpg',
    spotifyUrl: 'https://open.spotify.com/track/7LJ5d17QjK4BpsosYu7VvL',
    genres: ['Favorite'],
  },
  {
    id: 12,
    title: 'her',
    artist: 'JVKE',
    image: '/assets/songs/her.jpg',
    spotifyUrl: 'https://open.spotify.com/track/6G9YlbU3ByPJQvOFDRdwyM',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 13,
    title: 'Midnight Ride',
    artist: 'Orville Peck',
    image: '/assets/songs/midnightride.jpg',
    spotifyUrl: 'https://open.spotify.com/track/2BFnfCnAW6O1a1vZ8NZvkO',
    genres: ['Favorite'],
  },
  {
    id: 14,
    title: 'Потону',
    artist: 'MBreeze',
    image: '/assets/songs/potonu.jpg',
    spotifyUrl: 'https://open.spotify.com/track/3GGy8mS6WMD295LqEj4HvH',
    genres: ['Favorite', 'Pop'],
  },
  {
    id: 15,
    title: 'Sabotager',
    artist: 'Vince Palmeri',
    image: '/assets/songs/sabotager.jpg',
    spotifyUrl: 'https://open.spotify.com/track/6X8Y8DxQoIp3fzBrxvNTCr',
    genres: ['Favorite'],
  },
]
