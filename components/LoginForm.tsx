// app/components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import styles from './Form.module.css';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        const res = await signIn("credentials", {
            redirect: false,
            user,
            password,
        });
    
        if (res?.error) {
            // Mostrar un mensaje de error amigable en español
            setError("Usuario o contraseña incorrectos. Por favor, intente nuevamente.");
        } else {
            router.push("/admin");
        }
    
        setLoading(false);
    };

    return (
        <div className={styles.background}>
            <div className={styles.loginFormContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.h1}>Iniciar Sesion</h1>

                    <label className={styles.label}>Usuario:</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <label className={styles.label}>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <p className={styles.p}>
                        <Link href='/signup'>Clic aqui para crear una cuenta.</Link>
                    </p>

                    <button type="submit" disabled={loading} className={styles.button}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
        
    );
}
