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
    <article className="group border-2 border-black bg-[#efe7d6] shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]">
      <div className="border-b-2 border-black bg-[#d8cfb8]">
        {hasImage ? (
          <img
            src={image}
            alt={`${title} preview`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-48 place-items-center px-4 text-center text-sm font-semibold text-black/80">
            Image coming soon
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <header className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm font-semibold text-black/70">{subtitle}</p>
        </header>

        <p className="text-sm leading-relaxed text-black/85">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="max-w-xl text-black/80">
          Here’s a selection of my recent work, experiments, and portfolio
          pieces.
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
