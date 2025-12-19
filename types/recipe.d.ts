export type Recipe = {
    slug: string;
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    instructions: string[];
};
  
export type RecipeCardProps = {
    slug: string;
    title: string;
    description: string;
    image: string;
};
  