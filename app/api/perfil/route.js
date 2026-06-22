// app/api/perfil/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    // 1. Verificamos quién está conectado
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Buscamos los datos reales del cliente en pgAdmin
    const userQuery = await pool.query('SELECT nombre_completo, rut, email FROM usuarios WHERE email = $1', [session.user.email]);
    const usuario = userQuery.rows[0];

    // 3. Buscamos TODOS los pedidos que coincidan con el RUT de este cliente
    const pedidosQuery = await pool.query('SELECT id, fecha, servicio, estado, total FROM pedidos WHERE rut_cliente = $1 ORDER BY fecha DESC', [usuario.rut]);

    return NextResponse.json({
      usuario: {
        nombre: usuario.nombre_completo,
        rut: usuario.rut,
        email: usuario.email
      },
      pedidos: pedidosQuery.rows
    });

  } catch (error) {
    console.error("Error al cargar el perfil:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
