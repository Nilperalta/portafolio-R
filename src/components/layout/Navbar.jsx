import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig, getWhatsAppUrl } from '../../data/siteConfig'

// Estos son anclas dentro de la MISMA página (secciones del Home),
// por eso usamos <a> normal en vez de <Link>: así el navegador
// hace scroll automático hasta el elemento con ese id.
const links = [
  ['Sobre mí', '#about'],
  ['Servicios', '#services'],
  ['Habilidades', '#skills'],
  ['Proyectos', '#projects'],
  ['Contacto', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark">&lt;/&gt;</span>
        <span>{siteConfig.shortName}</span>
      </Link>

      <nav className={`nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={`/${href}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        
        <a  className="nav-cta"
          href={getWhatsAppUrl('¡Hola! Vi tu portafolio y me gustaría conversar.')}
          target="_blank"
          rel="noreferrer"
        >
          Hablemos <ArrowUpRight size={15} />
        </a>
      </nav>

      <button
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}