// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

// Definimos el tipo de usuario admin
interface AdminUser {
  id: string;
  name: string;
}

// Extendemos la sesión de NextAuth para que tenga nuestro AdminUser
declare module "next-auth" {
  interface Session {
    user: AdminUser;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials): Promise<AdminUser | null> {
        if (!credentials?.user || !credentials.password) return null;

        await connectDB();

        const admin = await Admin.findOne({ user: credentials.user });
        if (!admin) return null;

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) return null;

        return { id: admin._id.toString(), name: admin.user };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as AdminUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as AdminUser;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
