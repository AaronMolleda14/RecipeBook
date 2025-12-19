// app/recipes/[slug]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Recipe } from '@/types/recipe';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Obtencion de la receta desde la API
async function getRecipe(slug: string): Promise<Recipe | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la receta: ', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  return {
    title: recipe ? recipe.title : 'Receta no encontrada',
    description: recipe?.description || '',
  };
}

export default async function RecetaPage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <p>Receta no encontrada.</p>
        <br />
        <Link href="/">
          <p>Haga clic aqui para volver a la página principal.</p>
        </Link>
      </div>
    );
  }

  return (
    <div>
        <Header />
        <main className={styles.main}>
            <h1 className={styles.title}>{recipe.title}</h1>
            <p className={styles.description}>{recipe.description}</p>
            <img src={recipe.image} alt={recipe.title} className={styles.image} />

            <hr className={styles.divider} />

            <section>
                <h2 className={styles.sectionTitle}>Ingredientes:</h2>
                <ul className={styles.ingredients}>
                  {recipe.ingredients.map((item, idx) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ul>
            </section>

            <hr className={styles.divider} />

            <section>
                <h2 className={styles.sectionTitle}>Instrucciones:</h2>
                <ol className={styles.instructions}>
                  {recipe.instructions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ol>
            </section>
        </main>
        <Footer />
    </div>
    
  );
}
