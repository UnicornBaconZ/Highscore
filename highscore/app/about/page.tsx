import Image from 'next/image'

export default function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">About Me</h1>
      <div className="flex">
        <Image
          src="/images/profile.jpg"
          alt="Photo of Zarin"
          width={300}
          height={300}
          className="rounded-lg mr-5"
        />
        <div>
          <p className="max-w-xl mb-5">
            I’m Zarin — a full-stack developer who leans heavily toward the
            backend. I write TypeScript, Python, and sometimes C#, depending on
            my mood (or the project’s mood).
          </p>
          <p className="max-w-xl">
            This portfolio is mostly a playground where I get to experiment with
            retro aesthetics and build things for fun. If you like what you see,
            stick around — there’s always something new breaking, I mean… being
            built.
          </p>
        </div>
      </div>
    </section>
  )
}
