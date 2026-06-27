// lib/db.js
import { Pool } from 'pg';

// Usamos el patrón "Global" para evitar que Vercel agote las conexiones del servidor 
// cada vez que un cliente interactúa con la página web.
let pool;

if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // 🌟 ESTA ES LA LÍNEA MAESTRA: Obliga a Node-Postgres a aceptar el apretón de manos SSL de Neon.tech
    ssl: {
      rejectUnauthorized: false 
    }
  });
}

pool = global.pgPool;

export default pool;