// middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  // Protegemos las rutas administrativas y de usuario
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/perfil')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/perfil/:path*'],
};
