import RecipeForm from '@/components/RecipeForm';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditRecipePage({ params }: Props) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:3000/api/recipes/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <p>Receta no encontrada</p>;
  }

  const receta = await res.json();

  return <RecipeForm initialData={receta} isEdit />;
}
