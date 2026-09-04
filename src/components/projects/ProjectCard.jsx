import { ArrowUpRight, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-image-link" aria-label={`Open ${project.title}`}>
        <div className="project-image">
          <img src={project.image} alt={`${project.title} preview`} />
          <span className="project-index">{project.number}</span>
          <span className="project-view">View case <ArrowUpRight size={15} /></span>
        </div>
      </Link>

      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
        </div>

        <div className="project-links">
          <Link to={`/projects/${project.slug}`} className="text-link">
            Ver proyecto <ArrowUpRight size={15} />
          </Link>
          <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="text-link muted-link">
            Source code <Github size={15} />
          </a>
        </div>
      </div>
    </article>
  )
}
