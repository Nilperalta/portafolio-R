import { Github, Linkedin, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-inner">
        <div>
          <Link to="/" className="brand">
            <span className="brand-mark">&lt;/&gt;</span>
            <span>{siteConfig.name}</span>
          </Link>
          <p>Frontend development · UI/UX · React</p>
        </div>

        <div className="footer-socials">
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          {/* <a href={siteConfig.social.behance} target="_blank" rel="noreferrer" aria-label="Behance">
            <Palette size={18} />
          </a> */}
        </div>

        <small>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</small>
      </div>
    </footer>
  )
}
