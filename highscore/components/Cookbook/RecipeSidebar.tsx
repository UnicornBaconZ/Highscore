import { useState } from 'react'

type RecipeItem = {
  id: string
  parent: string
  parentLabel: string
  category: string
  title: string
  icon: string
}

type RecipeSidebarProps = {
  recipes: RecipeItem[]
  selectedRecipeId: string
  onSelectRecipe: (recipeId: string) => void
}

const parentIcons: Record<string, string> = {
  BugFreeBroth: '🍲',
  FreshLoad: '🥗',
  SpaghettiCode: '🍝',
  MainFrame: '🍔',
  SugarScript: '🍪',
  CondimentHelper: '🧂',
  LiquidAssets: '🥤',
  BakingThread: '🍞',
  GreenStack: '🥕',
}

export function RecipeSidebar({
  recipes,
  selectedRecipeId,
  onSelectRecipe,
}: RecipeSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(normalizedSearchQuery)
  )

  const parents = filteredRecipes.reduce<Record<string, RecipeItem[]>>(
    (acc, recipe) => {
      if (!acc[recipe.parent]) {
        acc[recipe.parent] = []
      }

      acc[recipe.parent].push(recipe)
      return acc
    },
    {}
  )

  const isSearching = normalizedSearchQuery.length > 0

  return (
    <aside className="w-80 shrink-0 rounded-2xl border border-[#eadfce] bg-[#fffaf3] p-4 shadow-sm">
      <label className="flex items-center gap-3 rounded-xl border border-[#eadfce] bg-white px-4 py-3 text-sm text-[#9a9085]">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search recipes..."
          className="w-full bg-transparent outline-none placeholder:text-[#aaa196]"
        />
      </label>

      <div className="mt-6">
        <h2 className="px-2 text-xs font-bold uppercase tracking-wider text-[#9a7460]">
          Categories
        </h2>

        <div className="mt-3 space-y-2">
          {Object.entries(parents).map(([parent, parentRecipes]) => {
            const selectedRecipeIsInParent = parentRecipes.some(
              (recipe) => recipe.id === selectedRecipeId
            )

            return (
              <details
                key={parent}
                open={isSearching || selectedRecipeIsInParent}
                className="group rounded-xl"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f4eadf] ${
                    selectedRecipeIsInParent
                      ? 'bg-[#f0dfd0] font-semibold text-[#b85a3b]'
                      : 'text-[#625b54]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base grayscale">
                      {parentIcons[parent] ?? '📁'}
                    </span>
                    {parentRecipes[0].parentLabel}
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="text-xs text-[#b58b73]">
                      {parentRecipes.length}
                    </span>
                    <span className="text-xs transition group-open:rotate-180">
                      ▾
                    </span>
                  </span>
                </summary>

                <div className="mt-1 space-y-1 pl-5">
                  {parentRecipes.map((recipe) => {
                    const isActive = recipe.id === selectedRecipeId

                    return (
                      <button
                        key={recipe.id}
                        onClick={() => onSelectRecipe(recipe.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-[#f7ede2] ${
                          isActive
                            ? 'bg-white font-semibold text-[#b85a3b] shadow-sm'
                            : 'text-[#625b54]'
                        }`}
                      >
                        <span>{recipe.icon}</span>
                        <span>{recipe.title}</span>
                      </button>
                    )
                  })}
                </div>
              </details>
            )
          })}

          {filteredRecipes.length === 0 && (
            <p className="px-3 py-4 text-sm text-[#9a9085]">
              No recipes found.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
