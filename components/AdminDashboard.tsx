// app/components/AdminDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import RecipeCard from '@/components/RecipeCard';
import styles from './AdminDashboard.module.css';
import Link from 'next/link';

type Recipe = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
};

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        setError('No se pudieron cargar las recetas.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta receta?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/recipes/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Error al eliminar la receta');
        return;
      }

      // Eliminar del estado
      setRecipes((prev) => prev.filter((r) => r.slug !== slug));
      setSelected(null);
    } catch (err) {
      alert('Error de red al intentar eliminar.');
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Panel de Administración de Recetas</h1>
        <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutButton}>
            🔒 Cerrar sesión
        </button>
      </div>

      {loading && <p className={styles.message}>Cargando recetas...</p>}
      {error && <p className={styles.message}>{error}</p>}

      {!loading && !error && (
        <div className={styles.content}>
          <div className={styles.recipesContainer}>
            <h2 className={styles.subtitle}>Lista de Recetas</h2>
            
            <div className={styles.recipeListWrapper}>
              <ul className={styles.recipeList}>
                  {recipes.map((recipe) => (
                    <li
                      key={recipe.slug}
                      onClick={() => setSelected(recipe)}
                      className={`${styles.recipeItem} ${
                        selected?.slug === recipe.slug ? styles.selected : ''
                      }`}
                    >
                      {recipe.title}
                    </li>
                  ))}
                </ul>
            </div>
              

            <div className={styles.addButtonContainer}>
              <Link href="/admin/new-recipe" className={styles.addButton}>
                📄 Agregar Nueva Receta
              </Link>
            </div>
          </div>

          <div className={styles.recipeViewContainer}>
            <h2 className={styles.subtitle}>Vista Previa de la Receta</h2>
            {selected ? (
              <div className={styles.recipeFlexWrapper}>
                <div className={styles.recipeCardContainer}>
                  <RecipeCard recipe={selected} />
                </div>
                <div className={styles.buttonRow}>
                  <Link href={`/admin/edit-recipe/${selected.slug}`} className={styles.editButton}>
                    ✏️ Editar
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(selected.slug)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.helpMessage}>Selecciona una receta para ver sus detalles</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
