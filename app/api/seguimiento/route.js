// app/api/seguimiento/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Extraemos el ID que el cliente escribió en la URL de búsqueda
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    // Buscamos el pedido en PostgreSQL en mayúsculas por seguridad
    const result = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id.toUpperCase()]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error buscando pedido:", error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
