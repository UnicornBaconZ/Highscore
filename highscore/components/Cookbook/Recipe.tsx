type Recipe = {
  title: string
  icon: string
  image?: string
  featured?: boolean
  description: string
  comment: string
  ingredients: string[]
  steps: string[]
  meta: {
    time: string
    difficulty: string
    servings: string
  }
}

type RecipeProps = {
  recipe: Recipe
}

export function Recipe({ recipe }: RecipeProps) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-[#e1d6c7] bg-[#fffaf3]/90 shadow-[0_16px_50px_rgba(60,45,30,0.08)] lg:grid-cols-[0.9fr_1.35fr]">
      <div className="relative min-h-[320px] border-b border-[#e1d6c7] p-3 lg:border-b-0 lg:border-r">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full min-h-[320px] w-full rounded-xl object-cover"
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-[#2a2723] sm:text-4xl">
              {recipe.title}
            </h2>

            <p className="mt-2 text-sm text-[#78906d]">// {recipe.comment}</p>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5f5851]">
          {recipe.description}
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-[#bd5d3c]">Ingredients</h3>

          <ul className="mt-2 grid gap-x-8 gap-y-1.5 text-sm text-[#554e48] sm:grid-cols-2">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className="font-serif flex gap-2">
                <span className="text-[#bd5d3c]">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-[#eadfce] pt-5">
          <h3 className="text-lg font-bold text-[#bd5d3c]">Steps</h3>

          <ol className=" font-serif mt-3 space-y-3 text-sm text-[#554e48]">
            {recipe.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eee1d3] text-xs font-bold text-[#9f7a62]">
                  {index + 1}
                </span>

                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#f3e7da] px-3 py-1.5 text-xs font-semibold text-[#bd5d3c]">
            {recipe.meta.time}
          </span>

          <span className="rounded-full bg-[#f3e7da] px-3 py-1.5 text-xs font-semibold text-[#bd5d3c]">
            {recipe.meta.difficulty}
          </span>

          <span className="rounded-full bg-[#f3e7da] px-3 py-1.5 text-xs font-semibold text-[#bd5d3c]">
            {recipe.meta.servings}
          </span>
        </div>
      </div>
    </article>
  )
}
