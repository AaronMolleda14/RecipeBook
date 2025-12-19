'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Form.module.css';

type RecipeFormProps = {
  initialData?: {
    slug?: string;
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    instructions: string[];
  };
  isEdit?: boolean;
};

export default function RecipeForm({ initialData, isEdit = false }: RecipeFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients?.join('\n') || '');
  const [instructions, setInstructions] = useState(initialData?.instructions?.join('\n') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      ...(isEdit && { slug: initialData?.slug }),
      title,
      description,
      image,
      ingredients: ingredients.split('\n').map((item) => item.trim()).filter(Boolean),
      instructions: instructions.split('\n').map((item) => item.trim()).filter(Boolean),
    };

    try {
      const url = isEdit
        ? `/api/recipes/${initialData?.slug}`
        : '/api/recipes';

      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al guardar la receta');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background}>
        <div className={styles.recipeFormContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.h1}>{isEdit ? 'Editar receta' : 'Nueva receta'}</h1>
                
                <label className={styles.label}>Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={styles.input}
                />

                <label className={styles.label}>Descripción:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                />

                <label className={styles.label}>URL de imagen:</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={styles.input}
                />

                <label className={styles.label}>Ingredientes (uno por línea):</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className={styles.textarea}
                />

                <label className={styles.label}>Instrucciones (una por línea):</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className={styles.textarea}
                />

                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Guardando...' : isEdit ? '💾Guardar cambios' : '💾Crear receta'}
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    </div>
    
  );
}
