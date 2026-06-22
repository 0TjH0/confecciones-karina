// app/api/auth/register/route.js
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { nombre, rut, email, password } = await req.json();

    // 1. Validar si el usuario ya existe por email o RUT
    const usuarioExistente = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1 OR rut = $2',
      [email, rut]
    );

    if (usuarioExistente.rows.length > 0) {
      return NextResponse.json(
        { error: 'El correo electrónico o el RUT ya se encuentran registrados.' },
        { status: 400 }
      );
    }

    // 2. Encriptar la contraseña de forma segura
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 3. Insertar el registro en tu pgAdmin local usando SQL Puro
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuarios (nombre_completo, rut, email, password, rol) VALUES ($1, $2, $3, $4, $5) RETURNING id, email',
      [nombre, rut, email, hashPassword, 'cliente']
    );

    return NextResponse.json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario.rows[0] }, { status: 201 });

  } catch (error) {
    console.error("Error en el servidor de registro:", error);
    return NextResponse.json({ error: 'Error interno en el servidor.' }, { status: 500 });
  }
}
