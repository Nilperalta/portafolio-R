// ============================================================
// PÁGINA: Admin
// ============================================================
// Esta página decide qué mostrar según el estado de sesión:
//
//   loading (useAuth)      -> pantalla de carga
//   sin sesión             -> <LoginForm />
//   con sesión             -> panel con pestañas: Proyectos / CV
//
// Este es exactamente el patrón "ruta protegida" en React:
// no existe una ruta separada para el login, la MISMA ruta /admin
// decide qué renderizar dependiendo de si hay sesión o no.

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useProjects } from '../hooks/useProjects'
import { useCv } from '../hooks/useCv'
import {
  createProject,
  deleteProject,
  setProjectPublished,
  updateProject,
} from '../services/projectsService'
import LoginForm from '../components/admin/LoginForm'
import ProjectsAdminList from '../components/admin/ProjectsAdminList'
import ProjectForm from '../components/admin/ProjectForm'
import CvManager from '../components/admin/CvManager'

export default function Admin() {
  const { isAuthenticated, loading: authLoading, login, logout } = useAuth()

  if (authLoading) {
    return (
      <main className="admin-placeholder">
        <div className="state-box">Cargando sesión...</div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />
  }

  return <AdminDashboard onLogout={logout} />
}

function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('projects') // 'projects' | 'cv'
  const [editingProject, setEditingProject] = useState(null) // null = no hay formulario abierto
  const [isCreating, setIsCreating] = useState(false)

  // admin: true -> trae proyectos publicados Y ocultos
  const { projects, loading, error, refetch } = useProjects({ admin: true })
  const { cv, loading: cvLoading, refetch: refetchCv } = useCv()

  async function handleCreate(projectData) {
    await createProject(projectData)
    setIsCreating(false)
    refetch()
  }

  async function handleUpdate(projectData) {
    await updateProject(editingProject.id, projectData)
    setEditingProject(null)
    refetch()
  }

  async function handleTogglePublished(project) {
    await setProjectPublished(project.id, !project.published)
    refetch()
  }

  async function handleDelete(project) {
    const confirmed = window.confirm(`¿Eliminar "${project.title}"? Esta acción no se puede deshacer.`)
    if (!confirmed) return

    await deleteProject(project.id)
    refetch()
  }

  const showingForm = isCreating || editingProject !== null

  return (
    <main className="admin-dashboard">
      <div className="section-shell">
        <div className="admin-topbar">
          <div>
            <p className="eyebrow">Panel privado</p>
            <h1>Administrar portafolio</h1>
          </div>
          <button className="button button-secondary" onClick={onLogout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>

        <div className="admin-tabs">
          <button className={tab === 'projects' ? 'is-active' : ''} onClick={() => setTab('projects')}>
            Proyectos
          </button>
          <button className={tab === 'cv' ? 'is-active' : ''} onClick={() => setTab('cv')}>
            CV
          </button>
        </div>

        {tab === 'projects' && (
          <>
            {error && <p className="form-error">No se pudieron cargar los proyectos.</p>}

            {showingForm ? (
              <div className="admin-list">
                <div className="admin-list-header">
                  <h2>{editingProject ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
                </div>
                <ProjectForm
                  initialProject={editingProject}
                  onSubmit={editingProject ? handleUpdate : handleCreate}
                  onCancel={() => {
                    setEditingProject(null)
                    setIsCreating(false)
                  }}
                />
              </div>
            ) : loading ? (
              <div className="state-box">Cargando proyectos...</div>
            ) : (
              <ProjectsAdminList
                projects={projects}
                onCreate={() => setIsCreating(true)}
                onEdit={setEditingProject}
                onTogglePublished={handleTogglePublished}
                onDelete={handleDelete}
              />
            )}
          </>
        )}

        {tab === 'cv' &&
          (cvLoading ? (
            <div className="state-box">Cargando CV...</div>
          ) : (
            <CvManager cv={cv} onUploaded={refetchCv} />
          ))}
      </div>
    </main>
  )
}
