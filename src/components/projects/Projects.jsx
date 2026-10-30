import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from './ProjectCard'
import SectionHeading from '../layout/SectionHeading'

export default function Projects() {
  const { projects, loading } = useProjects()
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section className="section section-background"  id="projects">

      <div className="section-shell">
        <SectionHeading
          eyebrow="Mis trabajos"
          title="Proyectos"
          accent="destacados."
          description="Una selección de trabajos que muestra cómo combino el desarrollo frontend y la interfaz de usuario adaptable (responsive UI)."
        />

        {loading ? (
          <div className="state-box">Loading projects...</div>
        ) : (
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="projects-footer">
          <Link to="/projects" className="text-link">
            Ver todos los proyectos <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
