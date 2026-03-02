import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-10 space-y-8 ">
        <div
          className="
            border-4 border-[#2b2b2b] bg-[#f5e6c8]
            p-6 rounded-sm
            shadow-[6px_6px_0px_0px_#2b2b2b]
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold leading-none">404</h1>
              <p className="mt-2 text-sm">
                Page not found. The file may have been moved, deleted, or
                abducted by retro gremlins.
              </p>
            </div>

            {/* “status badge” like your rating pill */}
            <div
              className="
                flex items-center justify-center
                bg-[#2b2b2b] text-[#f5e6c8]
                px-3 py-1
                text-sm font-bold
                border-2 border-[#2b2b2b]
                shadow-[2px_2px_0px_0px_#000]
                rounded-sm
                whitespace-nowrap
              "
            >
              STATUS: LOST
            </div>
          </div>

          {/* faux terminal */}
          <div className="mt-5 border-2 border-[#2b2b2b] bg-[#1f1f1f] text-[#7CFF6B] shadow-[3px_3px_0px_0px_#2b2b2b] rounded-sm p-4 text-xs leading-relaxed">
            <p>&gt; cd /requested-page</p>
            <p className="opacity-90">&gt; ls</p>
            <p className="text-[#ff6b6b]">
              &gt; ERROR: No such file or directory
            </p>
            <p className="opacity-90">
              &gt; suggestion: try /projects or go back home
            </p>
            <p className="mt-2 opacity-90">
              Press{' '}
              <span className="bg-[#2b2b2b] text-[#f5e6c8] px-1 border border-[#444]">
                F5
              </span>{' '}
              to continue…
              <span className="inline-block w-[10px] translate-y-[2px] ml-1 bg-[#7CFF6B] animate-pulse">
                &nbsp;
              </span>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/"
              className="
                inline-flex items-center justify-center
                border-2 border-[#2b2b2b] bg-white
                px-4 py-2 text-sm font-bold
                shadow-[3px_3px_0px_0px_#2b2b2b]
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
              "
            >
              RETURN HOME
            </Link>

            <Link
              href="/"
              className="
                inline-flex items-center justify-center
                border-2 border-[#2b2b2b] bg-[#f5e6c8]
                px-4 py-2 text-sm font-bold
                shadow-[3px_3px_0px_0px_#2b2b2b]
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
              "
            >
              GO HOME
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
