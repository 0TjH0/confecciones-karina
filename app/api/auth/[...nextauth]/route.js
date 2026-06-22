// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Faltan credenciales");
        }

        const { email, password } = credentials;

        // 1. Buscar al usuario en tu base de datos PostgreSQL local
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) throw new Error("Usuario no encontrado");

        // 2. Verificar la contraseña encriptada matemáticamente
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");

        // 3. Devolver los datos del usuario a la sesión de NextAuth
        return { id: user.id, name: user.nombre_completo, email: user.email, rol: user.rol };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.rol = user.rol;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.rol = token.rol;
      return session;
    }
  },
  pages: {
    signIn: '/login', // Redirección nativa de NextAuth
  },
  session: {
    strategy: "jwt", // 🌟 Obliga al sistema a usar Tokens locales sin buscar servidores externos
  },
  // 🌟 Se le asigna un secreto de respaldo por si tu .env.local tarda milisegundos en cargar al arrancar
  secret: process.env.NEXTAUTH_SECRET || "super_secreto_local_para_desarrollo_confecciones_karina_12345",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
