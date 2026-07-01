// app/api/admin/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// 1. OBTENER DATOS (GET)
export async function GET() {
  try {
    const pedidosResult = await pool.query('SELECT * FROM pedidos ORDER BY fecha DESC');
    const serviciosResult = await pool.query('SELECT * FROM servicios ORDER BY id ASC');
    
    return NextResponse.json({
      pedidos: pedidosResult.rows,
      servicios: serviciosResult.rows
    }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/admin:", error);
    return NextResponse.json({ error: "Error al consultar Neon.tech" }, { status: 500 });
  }
}

// 2. CREAR SERVICIO (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, categoria, precio, descripcion } = body;
    
    const result = await pool.query(
      'INSERT INTO servicios (nombre, categoria, precio, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, categoria, precio, descripcion]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/admin:", error);
    return NextResponse.json({ error: "Error al insertar el servicio en Neon" }, { status: 500 });
  }
}

// 3. ACTUALIZAR ESTADO (PUT)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, estado } = body;
    
    await pool.query('UPDATE pedidos SET estado = $1 WHERE id = $2', [estado, id]);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error en PUT /api/admin:", error);
    return NextResponse.json({ error: "Error al actualizar el estado del pedido" }, { status: 500 });
  }
}

// 🌟 4. ELIMINAR SERVICIO (DELETE)
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID de servicio no proporcionado" }, { status: 400 });
    }

    // Ejecuta la query física de eliminación directa
    await pool.query('DELETE FROM servicios WHERE id = $1', [id]);
    
    return NextResponse.json({ success: true, message: "Servicio purgado exitosamente de Neon" }, { status: 200 });
  } catch (error) {
    console.error("Error en DELETE /api/admin:", error);
    return NextResponse.json({ error: "Error interno al ejecutar la eliminación física" }, { status: 500 });
  }
}