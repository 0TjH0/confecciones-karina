// app/api/pedidos/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // 1. Verificamos si el usuario inició sesión
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado. Inicia sesión primero." }, { status: 401 });
    }

    // 2. Extraemos los datos del pedido que envía el Frontend
    const { servicio, total } = await req.json();

    // 3. Buscamos el RUT del cliente en la base de datos usando su email
    const userResult = await pool.query('SELECT rut, nombre_completo FROM usuarios WHERE email = $1', [session.user.email]);
    const usuario = userResult.rows[0];

    // 4. Generamos un código de pedido profesional y único (Ej: PED-8492)
    const idPedido = 'PED-' + Math.floor(1000 + Math.random() * 9000);

    // 5. Guardamos todo en pgAdmin
    await pool.query(
      'INSERT INTO pedidos (id, cliente_nombre, rut_cliente, servicio, total, estado) VALUES ($1, $2, $3, $4, $5, $6)',
      [idPedido, usuario.nombre_completo, usuario.rut, servicio, total, 'Esperando Pago']
    );

    return NextResponse.json({ success: true, idPedido }, { status: 201 });

  } catch (error) {
    console.error("Error procesando la compra:", error);
    return NextResponse.json({ error: 'Error interno al guardar el pedido.' }, { status: 500 });
  }
}
