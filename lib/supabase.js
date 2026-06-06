import { createClient } from '@supabase/supabase-js';

// Estas variables las configuraremos en el Día 11 para la conexión real.
// Por ahora, preparamos la arquitectura profesional.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bsczqgthrwpmfxcnuwmt.supabase.co/rest/v1/';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY3pxZ3RocndwbWZ4Y251d210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NzIxOTIsImV4cCI6MjA5NjM0ODE5Mn0.xatP_l5cJDqM3aLFrOvg6qiWKVNI60kEU8NZjbpveSE';

export const supabase = createClient(supabaseUrl, supabaseKey);
