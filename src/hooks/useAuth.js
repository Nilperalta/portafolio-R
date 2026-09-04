// ============================================================
// HOOK: useAuth
// ============================================================
// Mismo patrón que useProjects/useProject: el componente no sabe
// nada de Supabase, solo pide `session`, `loading`, `login`, `logout`.
//
// Flujo:
//  1. Al montar, preguntamos si ya existe una sesión guardada
//     (por ejemplo, si recargaste la página estando logueada).
//  2. Nos suscribimos a los cambios de sesión (login/logout).
//  3. Al desmontar, cancelamos la suscripción (cleanup).

import { useEffect, useState } from 'react'
import {
  getCurrentSession,
  onAuthStateChange,
  signIn,
  signOut,
} from '../services/authService'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getCurrentSession().then((currentSession) => {
      if (active) {
        setSession(currentSession)
        setLoading(false)
      }
    })

    const unsubscribe = onAuthStateChange((newSession) => {
      if (active) setSession(newSession)
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  async function login(email, password) {
    const newSession = await signIn(email, password)
    setSession(newSession)
  }

  async function logout() {
    await signOut()
    setSession(null)
  }

  return {
    session,
    isAuthenticated: Boolean(session),
    loading,
    login,
    logout,
  }
}
