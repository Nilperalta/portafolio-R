import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from './ProjectCard'
import SectionHeading from '../layout/SectionHeading'

export default function Projects() {
  const { projects, loading } = useProjects()
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section className="section section-shell" id="projects">
      <SectionHeading
        eyebrow="Mis trabajos"
        title="Proyectos"
        accent="destacados."
        description="A selection of work that shows how I combine frontend development, responsive UI and visual thinking."
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
    </section>
  )
}
