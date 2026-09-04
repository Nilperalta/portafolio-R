// ============================================================
// SERVICIO DE STORAGE (imágenes de proyectos y CV)
// ============================================================
// Supabase Storage guarda archivos (no filas de una tabla).
// Cada archivo vive dentro de un "bucket" (como una carpeta raíz).
//
// Usamos dos buckets, ambos públicos (ver SUPABASE_SETUP.md):
//   - "project-images" → una imagen por proyecto
//   - "cv"              → un único archivo: cv.pdf (se reemplaza siempre)

import { supabase } from '../lib/supabaseClient'

const PROJECT_IMAGES_BUCKET = 'project-images'
const CV_BUCKET = 'cv'
const CV_FILE_NAME = 'cv.pdf'

// ------------------------------------------------------------
// IMÁGENES DE PROYECTOS
// ------------------------------------------------------------

// Sube la imagen de un proyecto y devuelve su URL pública.
// `slug` se usa como parte del nombre de archivo para que sea
// fácil identificar a qué proyecto pertenece cada imagen.
export async function uploadProjectImage(file, slug) {
  const extension = file.name.split('.').pop()
  // Añadimos un timestamp para evitar que el navegador use una
  // versión "cacheada" de la imagen anterior si se reemplaza.
  const fileName = `${slug}-${Date.now()}.${extension}`

  const { error } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}

// ------------------------------------------------------------
// CV
// ------------------------------------------------------------

// Sube (o reemplaza) el CV. Siempre se guarda con el mismo nombre,
// así el enlace de "Descargar CV" del sitio nunca cambia.
export async function uploadCv(file) {
  const { error } = await supabase.storage
    .from(CV_BUCKET)
    .upload(CV_FILE_NAME, file, { cacheControl: '0', upsert: true })

  if (error) throw error

  return getCvPublicUrl()
}

// Construye la URL pública del CV agregando un parámetro de
// "cache-busting" basado en la fecha de última modificación,
// para que el navegador siempre descargue la versión más reciente.
export async function getCvInfo() {
  const { data, error } = await supabase.storage.from(CV_BUCKET).list('', {
    search: CV_FILE_NAME,
  })

  if (error) throw error

  const cvFile = data?.find((item) => item.name === CV_FILE_NAME)
  if (!cvFile) return null

  const updatedAt = cvFile.updated_at ?? cvFile.created_at
  return {
    url: `${getCvPublicUrl()}?v=${new Date(updatedAt).getTime()}`,
    updatedAt,
  }
}

function getCvPublicUrl() {
  const { data } = supabase.storage.from(CV_BUCKET).getPublicUrl(CV_FILE_NAME)
  return data.publicUrl
}
