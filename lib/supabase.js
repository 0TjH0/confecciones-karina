import { createClient } from '@supabase/supabase-js';

// Estas variables las configuraremos en el Día 11 para la conexión real.
// Por ahora, preparamos la arquitectura profesional.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
