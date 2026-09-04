// ============================================================
// SERVICIO DE AUTENTICACIÓN
// ============================================================
// Aquí concentramos TODAS las llamadas a Supabase Auth.
// Los componentes (LoginForm, Admin, etc.) nunca hablan
// directamente con `supabase.auth`, hablan con este servicio.
//
// Esto es exactamente la misma idea que ya usas en
// projectsService.js: separar "cómo se hace" de "quién lo pide".

import { supabase } from '../lib/supabaseClient'

// Inicia sesión con email y contraseña.
// Supabase se encarga de guardar el token en el navegador.
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data.session
}

// Cierra la sesión actual.
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Devuelve la sesión actual (o null si no hay nadie logueado).
// Se usa al cargar la app para saber si ya había una sesión guardada.
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

// Se suscribe a los cambios de sesión (login, logout, refresh de token).
// Devuelve una función para cancelar la suscripción (cleanup de useEffect).
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })

  return () => data.subscription.unsubscribe()
}
