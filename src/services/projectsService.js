// ============================================================
// SERVICIO DE PROYECTOS (ahora con Supabase)
// ============================================================
// Antes este archivo leia `src/data/projects.js`.
// Ahora habla con la tabla `projects` de Supabase (PostgreSQL).
//
// Los componentes (ProjectCard, Projects, Admin, etc.) NO cambian:
// siguen esperando el mismo "shape" de objeto que ya usaban
// (id, slug, number, title, category, description, image,
// technologies, liveUrl, sourceUrl, featured).
//
// La tabla en Supabase usa snake_case (convencion de PostgreSQL):
// image_url, live_url, source_url, published...
// Por eso este archivo tiene dos funciones "traductoras":
// `mapRowToProject` (de la BD hacia React) y
// `mapProjectToRow` (de React hacia la BD).
// Asi el resto de la app nunca se entera de ese detalle.

import { supabase } from '../lib/supabaseClient'

const TABLE = 'projects'

// BD (snake_case) -> App (camelCase, mismo shape de siempre)
function mapRowToProject(row) {
  return {
    id: row.id,
    slug: row.slug,
    number: row.number,
    title: row.title,
    category: row.category,
    description: row.description,
    image: row.image_url,
    technologies: row.technologies ?? [],
    liveUrl: row.live_url,
    sourceUrl: row.source_url,
    featured: row.featured,
    published: row.published,
  }
}

// App (camelCase) -> BD (snake_case), para insert/update
function mapProjectToRow(project) {
  return {
    slug: project.slug,
    number: project.number,
    title: project.title,
    category: project.category,
    description: project.description,
    image_url: project.image,
    technologies: project.technologies,
    live_url: project.liveUrl,
    source_url: project.sourceUrl,
    featured: project.featured,
    published: project.published,
  }
}

// ------------------------------------------------------------
// LECTURA (usado por el portafolio publico)
// ------------------------------------------------------------

// Solo trae proyectos publicados. Esto es lo que ven los visitantes.
export async function getProjects() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(mapRowToProject)
}

export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) throw error
  return data ? mapRowToProject(data) : null
}

// ------------------------------------------------------------
// LECTURA (solo para el panel /admin, requiere estar logueada)
// ------------------------------------------------------------

// Trae TODOS los proyectos, publicados u ocultos.
// Las politicas de RLS son las que realmente impiden que alguien
// sin sesion pueda ejecutar esta consulta con exito.
export async function getAllProjectsAdmin() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(mapRowToProject)
}

// ------------------------------------------------------------
// ESCRITURA (solo /admin)
// ------------------------------------------------------------

export async function createProject(project) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(mapProjectToRow(project))
    .select()
    .single()

  if (error) throw error
  return mapRowToProject(data)
}

export async function updateProject(id, project) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(mapProjectToRow(project))
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return mapRowToProject(data)
}

export async function deleteProject(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

// Atajo para publicar/ocultar un proyecto sin mandar todo el objeto.
export async function setProjectPublished(id, published) {
  const { error } = await supabase.from(TABLE).update({ published }).eq('id', id)
  if (error) throw error
}
