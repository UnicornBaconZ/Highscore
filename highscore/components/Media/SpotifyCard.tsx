type SpotifyTrack = {
  title: string
  artist: string
  album?: string
  image?: string
  spotifyUrl?: string
  isPlaying?: boolean
}

type SpotifyCardProps = {
  track: SpotifyTrack
}

export default function SpotifyCard({ track }: SpotifyCardProps) {
  return (
    <div className="border-2 border-[#2b2b2b] bg-[#f5e6c8] p-4 rounded-sm shadow-[3px_3px_0px_0px_#2b2b2b] space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold leading-tight">
          {track.isPlaying ? 'Currently listening' : ''}
        </h2>
      </div>

      <div className="flex gap-4">
        {track.image && (
          <img
            src={track.image}
            alt={`${track.title} album cover`}
            className="h-24 w-24 shrink-0 object-cover border-2 border-[#2b2b2b] shadow-[2px_2px_0px_0px_#2b2b2b]"
          />
        )}

        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="text-sm font-bold leading-tight">{track.title}</p>
            <p className="mt-1 text-xs font-semibold">{track.artist}</p>

            {track.album && (
              <p className="mt-1 text-xs opacity-80">{track.album}</p>
            )}
          </div>

          {track.spotifyUrl && (
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="
                mt-3 inline-flex w-fit items-center
                border-2 border-black bg-white
                px-2 py-0.5
                text-xs font-semibold
                shadow-[2px_2px_0px_0px_#2b2b2b]
                hover:translate-x-[1px] hover:translate-y-[1px]
                hover:shadow-none
                transition
              "
            >
              Open in Spotify
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {track.isPlaying && (
          <span className="inline-flex items-center border-2 border-black bg-white px-2 py-0.5 text-xs font-semibold">
            Live
          </span>
        )}
      </div>
    </div>
  )
}
