// app/api/servicios/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Traemos todos los servicios ordenados por ID
    const servicios = await pool.query("SELECT * FROM servicios ORDER BY id ASC");
    return NextResponse.json(servicios.rows);
  } catch (error) {
    console.error("Error al cargar el catálogo:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// NUEVO: Método para eliminar un servicio
export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Obtenemos el ID que nos envía el frontend

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del servicio' }, { status: 400 });
    }

    // Usamos $1 para evitar inyección SQL (Seguridad)
    await pool.query("DELETE FROM servicios WHERE id = $1", [id]);

    return NextResponse.json({ message: 'Servicio eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    return NextResponse.json({ error: 'Error interno al eliminar' }, { status: 500 });
  }
}