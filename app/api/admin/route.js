// app/api/admin/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// 1. LEER DATOS (GET): Trae los pedidos y el catálogo
export async function GET() {
    try {
        const pedidos = await pool.query("SELECT * FROM pedidos ORDER BY fecha DESC");
        const servicios = await pool.query("SELECT * FROM servicios ORDER BY id ASC");
        
        return NextResponse.json({ 
            pedidos: pedidos.rows, 
            servicios: servicios.rows 
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 2. AGREGAR AL CATÁLOGO (POST): Inserta un nuevo servicio
export async function POST(req) {
    try {
        const { nombre, categoria, precio, descripcion } = await req.json();
        const result = await pool.query(
            "INSERT INTO servicios (nombre, categoria, precio, descripcion) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, categoria, precio, descripcion]
        );
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 3. ACTUALIZAR PEDIDOS (PUT): Cambia el estado del pedido
export async function PUT(req) {
    try {
        const { id, estado } = await req.json();
        await pool.query(
            "UPDATE pedidos SET estado = $1 WHERE id = $2", 
            [estado, id]
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
