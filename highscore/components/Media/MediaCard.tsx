export default function MediaCard({ item }) {
  return (
    <div className="border-2 border-[#2b2b2b] bg-[#f5e6c8] p-4 rounded-sm shadow-[3px_3px_0px_0px_#2b2b2b] space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold leading-tight">{item.title}</h2>

        <div
          className="
            flex items-center justify-center
            bg-[#2b2b2b] text-[#f5e6c8]
            px-3 py-1
            text-sm font-bold
            border-2 border-[#2b2b2b]
            shadow-[2px_2px_0px_0px_#000]
            rounded-sm
          "
        >
          {item.rating}
        </div>
      </div>

      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full mt-2 border-2 border-[#2b2b2b] shadow-[2px_2px_0px_0px_#2b2b2b]"
        />
      )}

      <p className="mt-1 text-xs">{item.description}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {item.genres?.map((genre) => (
          <span
            key={genre}
            className="
              text-xs px-2 py-1
              bg-[#e6d7b8] text-[#2b2b2b]
              border border-[#2b2b2b]
              rounded-sm
            "
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  )
}
