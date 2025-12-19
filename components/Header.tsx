// /app/components/Header.tsx

import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Recetario</h1>
            </div>
            <div className={styles.buttonContainer}>
                <Link href={'/login'} className={styles.button}>Administrar Recetas</Link>
            </div>           
        </header>
    );
};

export default Header;