import { ArrowUpRight, Code2, Palette, Smartphone } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import SectionHeading from '../layout/SectionHeading'

const highlights = [
  { icon: Code2, label: 'Frontend', value: 'React + JavaScript' },
  { icon: Palette, label: 'UI focus', value: 'Clean & intuitive' },
  { icon: Smartphone, label: 'Enfoque', value: 'Responsive por defecto' },
]

export default function About() {
  return (
    <section className="section section-shell" id="about">
      <SectionHeading
        eyebrow="Sobre mí"
        title="Ideas que se vuelven"
        accent="interfaces."
        //description="A frontend profile that combines development with a strong eye for interface design."
      />

      <div className="about-grid">
        <div className="about-copy">
          <p>
            Tomo los diseños realizados en figma y los convierto en una interfaz web real y adaptable.
          </p>
          <p>
            Me importan los componentes reutilizables, seguir una estructura clara que permita que el proyecto ser escalable
          </p>
          <a className="text-link" href="#contact">
            Trabajemos juntos <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="about-cards">
          {highlights.map(({ icon: Icon, label, value }) => (
            <article className="stat-card" key={label}>
              <Icon size={21} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
