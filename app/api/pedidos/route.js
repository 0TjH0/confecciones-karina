// app/api/pedidos/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // 1. Verificamos si el usuario inició sesión de manera segura
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado. Inicia sesión primero." }, { status: 401 });
    }

    // 2. Extraemos los datos extendidos del cotizador automático
    const { servicio, cantidad, comuna, costo_despacho, total } = await req.json();

    // 3. Buscamos el RUT y nombre del cliente en Neon usando su email de sesión
    const userResult = await pool.query('SELECT rut, nombre_completo FROM usuarios WHERE email = $1', [session.user.email]);
    const usuario = userResult.rows[0];

    // 4. Generamos un código de pedido único
    const idPedido = 'PED-' + Math.floor(1000 + Math.random() * 9000);

    // 🌟 TRUCO LOGÍSTICO ACADÉMICO: Concatenamos la comuna y la cantidad en la descripción del servicio.
    // Esto mitiga el problema de cálculos mentales y guarda el detalle de despacho sin alterar las columnas de pgAdmin.
    const detalleServicioLogistico = `${servicio} (x${cantidad}) | Despacho a: ${comuna} (Costo Envío: $${costo_despacho})`;

    // 5. Guardamos de forma blindada en la nube de Neon
    await pool.query(
      'INSERT INTO pedidos (id, cliente_nombre, rut_cliente, servicio, total, estado) VALUES ($1, $2, $3, $4, $5, $6)',
      [idPedido, usuario.nombre_completo, usuario.rut, detalleServicioLogistico, total, 'Esperando Pago']
    );

    return NextResponse.json({ success: true, idPedido }, { status: 201 });

  } catch (error) {
    console.error("Error procesando la compra logística:", error);
    return NextResponse.json({ error: 'Error interno al guardar el pedido en Neon.' }, { status: 500 });
  }
}