'use client'

import { useState } from 'react'
import { RecipeSidebar } from '@/components/Cookbook/RecipeSidebar'
import { Recipe } from '@/components/Cookbook/Recipe'
import { recipes } from '@/data/recipes'

export default function CookbookPage() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0].id)

  const selectedRecipe =
    recipes.find((recipe) => recipe.id === selectedRecipeId) ?? recipes[0]

  return (
    <section className="mx-auto max-w-7xl space-y-4">
      <h1 className="text-3xl font-bold">The Culinary Codebase</h1>

      <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 gap-6 lg:grid-cols-[1fr_4fr]">
        <RecipeSidebar
          recipes={recipes}
          selectedRecipeId={selectedRecipeId}
          onSelectRecipe={setSelectedRecipeId}
        />

        <Recipe recipe={selectedRecipe} />
      </div>
    </section>
  )
}
