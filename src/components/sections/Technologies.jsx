import { siteConfig } from '../../data/siteConfig'

export default function Technologies() {
  return (
    <section className="tech-strip" id="skills">
      <div className="section-shell">
        <div className="section-label">
          <span>Skills & stack</span>
          <small>Tecnologías con las que trabajo</small>
        </div>
        <div className="tech-row">
          {siteConfig.technologies.map((tech) => (
            <div className="tech-item" key={tech.name}>
              <span className="tech-icon">{tech.short}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
