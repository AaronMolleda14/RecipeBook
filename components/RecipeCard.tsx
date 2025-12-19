// app/components/RecipeCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './RecipeCard.module.css';
import Image from 'next/image';
import type { RecipeCardProps } from '@/types/recipe';

type Props = {
    recipe: RecipeCardProps;
};

const RecipeCard: React.FC<Props> = ({ recipe }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardTextContainer}>
                <h3 className={styles.cardTitle}>
                    <Link href={`/recipes/${recipe.slug}`}>
                        {recipe.title}
                    </Link>
                </h3>
                <hr className={styles.hr} />
                <p className={styles.cardDescription}>{recipe.description}</p>
            </div>
            <div className={styles.cardImgContainer}>
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    className={styles.cardImage}
                    fill
                    sizes="400px, 200px"
                />
            </div>
        </div>
    );
};

export default RecipeCard;