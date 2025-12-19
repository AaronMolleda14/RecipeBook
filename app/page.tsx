// app/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import styles from './page.module.css';
import { RecipeCardProps } from '@/types/recipe';

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`, {
    cache: 'no-store', // para evitar cacheo en desarrollo
  });

  const recipes: RecipeCardProps[] = await res.json();
  
  return (
    <div>
      <Header />
      <main className={styles.main}>
      {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.slug} className={styles.cardContainer}>
              <RecipeCard  recipe={recipe} />
            </div>
          ))
        ) : (
          <p className={styles.message}>
            Por el momento no hay recetas para mostrar.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}