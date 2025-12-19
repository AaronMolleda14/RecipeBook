// app/admin/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";
import styles from './page.module.css';
import Link from 'next/link';


export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className={styles.background}>
        <p className={styles.p}>No autorizado. <Link href="/login">Inicia sesión aquí.</Link></p>
      </div>
    );
  }

  return (
    <AdminDashboard />
  );
}
