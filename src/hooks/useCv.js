// ============================================================
// HOOK: useCv
// ============================================================
// Pregunta a Supabase Storage si existe un CV subido y, de ser así,
// entrega su URL pública lista para usar en un botón de descarga.
//
// Si todavía no se subió ningún CV, `cv` queda en null y el botón
// de "Descargar CV" puede ocultarse o deshabilitarse.

import { useCallback, useEffect, useState } from 'react'
import { getCvInfo } from '../services/storageService'

export function useCv() {
  const [cv, setCv] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const info = await getCvInfo()
      setCv(info)
    } catch {
      // Si el bucket todavía no existe o falla la red,
      // simplemente no mostramos el botón de descarga.
      setCv(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { cv, loading, refetch: load }
}
