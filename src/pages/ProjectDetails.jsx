import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useProject } from '../hooks/useProject'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function ProjectDetails() {
  const { slug } = useParams()
  const { project, loading } = useProject(slug)

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="simple-page"><div className="section-shell"><div className="state-box">Loading project...</div></div></main>
        <Footer />
      </>
    )
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="simple-page">
          <div className="section-shell">
            <p className="eyebrow">404</p>
            <h1>Project not found.</h1>
            <Link to="/" className="button button-primary">Back to portfolio</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="project-detail">
        <div className="section-shell">
          <Link to="/#projects" className="back-link"><ArrowLeft size={16} /> Back to projects</Link>

          <div className="project-detail-heading">
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>

          <div className="project-detail-image">
            <img src={project.image} alt={`${project.title} preview`} />
          </div>

          <div className="project-detail-grid">
            <div>
              <span className="detail-label">Tecnologías</span>
              <div className="project-tags large-tags">
                {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </div>
            <div className="detail-actions">
              <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                Ver proyecto en vivo <ExternalLink size={16} />
              </a>
              <a className="button button-secondary" href={project.sourceUrl} target="_blank" rel="noreferrer">
                Source code <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
