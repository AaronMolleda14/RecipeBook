// app/lib/recipes.ts
import Recipe from '@/models/Recipe';

export async function getAllRecipes() {
  return await Recipe.find().lean();
}

export async function getRecipeBySlug(slug: string) {
  return await Recipe.findOne({ slug }).lean();
}
