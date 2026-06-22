import { Pool } from 'pg';

// Creamos un "Pool" de conexiones a tu base de datos local
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
