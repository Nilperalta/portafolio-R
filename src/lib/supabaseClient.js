// ============================================================
// CLIENTE DE SUPABASE
// ============================================================
// Este archivo crea UNA sola instancia del cliente de Supabase
// y la exporta para que toda la app la reutilice.
//
// ¿Por qué solo una instancia? Porque el cliente de Supabase
// maneja internamente la sesión de autenticación (token, refresh, etc).
// Si creáramos varios clientes, podríamos tener sesiones desincronizadas.
//
// Las credenciales NUNCA se escriben aquí directamente.
// Se leen desde variables de entorno (archivo .env), que Vite
// expone a través de `import.meta.env`.
//
// IMPORTANTE: la "anon key" (clave pública) NO es secreta en el
// sentido tradicional: está pensada para ir en el frontend.
// La seguridad real la dan las políticas de RLS (Row Level Security)
// que configuramos en la base de datos (ver SUPABASE_SETUP.md).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Esto no rompe la app, pero avisa claramente en consola
  // si alguien olvidó configurar el archivo .env
  console.warn(
    '[Supabase] Faltan las variables de entorno VITE_SUPABASE_URL y/o ' +
      'VITE_SUPABASE_PUBLISHABLE_KEY. Revisa tu archivo .env (guíate con .env.example) ' +
      'y con SUPABASE_SETUP.md.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
