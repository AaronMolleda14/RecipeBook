'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Form.module.css';

export default function SignUp() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      
        try {
          const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, password, key }),
          });
      
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Error al registrar");

          // Feedback opcional
          alert("Administrador registrado con éxito");

          // Redirigir a login
          router.push('/login');
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.loginFormContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.h1}>Registrarse</h1>

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

                    <label className={styles.label}>Clave del Administrador:</label>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <button type="submit" disabled={loading} className={styles.button}>
                        Registrar
                    </button>

                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
