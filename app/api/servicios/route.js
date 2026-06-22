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
