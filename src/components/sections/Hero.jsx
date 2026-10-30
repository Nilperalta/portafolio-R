import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { siteConfig, getWhatsAppUrl } from '../../data/siteConfig'

export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{siteConfig.eyebrow}</p>
        <h1>
          Hola, soy <span>{siteConfig.name}</span>.
          <br />
          {siteConfig.headline}
        </h1>
        <p className="hero-highlight">{siteConfig.highlightedHeadline}</p>
        <p className="hero-description">{siteConfig.description}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Ver mis proyectos <ArrowUpRight size={17} />
          </a>
          <a className="button button-secondary" href={getWhatsAppUrl('¡Hola! Vi tu portafolio y me gustaría conversar.')} target="_blank" rel="noreferrer">
            Contáctame <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="hero-socials">
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>

      </div>

    </section>
  )
}