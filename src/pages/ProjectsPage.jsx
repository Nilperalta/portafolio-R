import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProjectCard from '../components/projects/ProjectCard'
import SectionHeading from '../components/layout/SectionHeading'
import { useProjects } from '../hooks/useProjects'

export default function ProjectsPage() {
  const { projects, loading } = useProjects()

  return (
    <>
      <Navbar />
      <main className="section projects-page">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Mis trabajos"
            title="Todos los"
            accent="proyectos."
            //description="A complete collection of projects. This page is ready to keep growing as more work is added."
          />
          {loading ? (
            <div className="state-box">Loading projects...</div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          )}
          <div className="projects-footer">
            <Link to="/" className="text-link">Volver al inicio</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
