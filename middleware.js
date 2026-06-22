import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirige aquí si alguien no autorizado intenta entrar
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Solo protege el panel de la modista
};
