// ============================================================
// COMPONENTE: ProjectsAdminList
// ============================================================
// Muestra todos los proyectos (publicados y ocultos) en una lista
// simple, con botones para editar, publicar/ocultar y eliminar.
//
// Este componente NO habla con Supabase directamente: recibe
// funciones por props (`onEdit`, `onTogglePublished`, `onDelete`)
// que vienen de Admin.jsx, que sí conoce projectsService.

import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react'

export default function ProjectsAdminList({ projects, onEdit, onTogglePublished, onDelete, onCreate }) {
  return (
    <div className="admin-list">
      <div className="admin-list-header">
        <h2>Proyectos ({projects.length})</h2>
        <button className="button button-primary" onClick={onCreate}>
          <Plus size={16} /> Nuevo proyecto
        </button>
      </div>

      {projects.length === 0 && <p className="state-box">Todavía no hay proyectos. Crea el primero.</p>}

      <div className="admin-project-rows">
        {projects.map((project) => (
          <article key={project.id} className={`admin-project-row ${project.published ? '' : 'is-hidden'}`}>
            <img src={project.image} alt={project.title} className="admin-project-thumb" />

            <div className="admin-project-info">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <div className="project-tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="admin-project-actions">
              <span className={`status-pill ${project.published ? 'is-published' : ''}`}>
                {project.published ? 'Publicado' : 'Oculto'}
              </span>

              <button
                className="icon-button"
                title={project.published ? 'Ocultar' : 'Publicar'}
                onClick={() => onTogglePublished(project)}
              >
                {project.published ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

              <button className="icon-button" title="Editar" onClick={() => onEdit(project)}>
                <Pencil size={16} />
              </button>

              <button className="icon-button icon-button-danger" title="Eliminar" onClick={() => onDelete(project)}>
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
