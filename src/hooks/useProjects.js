// ============================================================
// HOOK: useProjects
// ============================================================
// Mismo hook de siempre, con dos agregados ahora que hay red de por medio:
//
//  - `error`: por si Supabase falla (sin internet, RLS, etc).
//  - `refetch`: para volver a pedir la lista después de crear,
//     editar, eliminar o publicar/ocultar un proyecto desde /admin.
//
// `admin = true` hace que se usen TODOS los proyectos (publicados
// y ocultos). Solo debe usarse dentro del panel /admin, ya que
// las políticas de RLS exigen sesión iniciada para verlos.

import { useCallback, useEffect, useState } from 'react'
import { getAllProjectsAdmin, getProjects } from '../services/projectsService'

export function useProjects({ admin = false } = {}) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = admin ? await getAllProjectsAdmin() : await getProjects()
      setProjects(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [admin])

  useEffect(() => {
    let active = true

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const data = admin ? await getAllProjectsAdmin() : await getProjects()
        if (active) setProjects(data)
      } catch (err) {
        if (active) setError(err)
      } finally {
        if (active) setLoading(false)
      }
    }

    run()

    return () => {
      active = false
    }
  }, [admin])

  return { projects, loading, error, refetch: loadProjects }
}
