import { useEffect, useState } from 'react'
import { getProjectBySlug } from '../services/projectsService'

export function useProject(slug) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadProject() {
      const data = await getProjectBySlug(slug)
      if (active) {
        setProject(data)
        setLoading(false)
      }
    }

    loadProject()

    return () => {
      active = false
    }
  }, [slug])

  return { project, loading }
}
