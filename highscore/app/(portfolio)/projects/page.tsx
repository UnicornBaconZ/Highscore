import { projects } from '@/data/projects'

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border-2 border-black bg-white px-2 py-0.5 text-xs font-semibold">
      {children}
    </span>
  )
}

function ProjectCard({
  title,
  subtitle,
  description,
  image,
  tags,
}: (typeof projects)[number]) {
  const hasImage = Boolean(image)

  return (
    <article
      className="
        group
        border-2 border-[#2b2b2b]
        bg-[#f5e6c8]
        rounded-sm
        shadow-[3px_3px_0px_0px_#2b2b2b]
        transition-transform
        hover:-translate-x-[2px] hover:-translate-y-[2px]
        space-y-3
        p-4
      "
    >
      <header className="space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-bold leading-tight truncate">
              {title}
            </h2>
            <p className="text-xs font-semibold text-[#2b2b2b]/70">
              {subtitle}
            </p>
          </div>
        </div>
      </header>

      <div>
        {hasImage ? (
          <img
            src={image}
            alt={`${title} preview`}
            className="
              w-full
              border-2 border-[#2b2b2b]
              shadow-[2px_2px_0px_0px_#2b2b2b]
              mt-2
              object-cover
            "
          />
        ) : (
          <div
            className="
              grid h-48 place-items-center
              mt-2
              border-2 border-[#2b2b2b]
              bg-[#e6d7b8]
              shadow-[2px_2px_0px_0px_#2b2b2b]
              px-4 text-center
              text-xs font-semibold text-[#2b2b2b]/80
            "
          >
            Image coming soon
          </div>
        )}
      </div>

      <p className="text-xs leading-relaxed text-[#2b2b2b]">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#2b2b2b]">
          Projects
        </h1>
        <p className="max-w-xl text-[#2b2b2b]/80">
          Here’s a selection of my recent work and experiments.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  )
}
