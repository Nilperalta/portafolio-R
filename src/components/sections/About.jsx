import { ArrowUpRight, Code2, Palette, Smartphone } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import SectionHeading from '../layout/SectionHeading'
import { UserRound, Mail, MapPin } from 'lucide-react'
import perfil from '../../assets/images/about.png'


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
        title="Soy Web Designer"
        accent="& Developer."
        //description="A frontend profile that combines development with a strong eye for interface design."
      />

      <div className="about-grid">
        <div className="about-copy">
            <p>
              Egresada de Administración de sistemas, enfocada en el desarrollo Frontend, con insterés
              en ciberseguridad y las tecnologías Backend como servicio (Baas)
            </p>

            <ul className="about-info">
              <li>
                <UserRound size={19} />
                <div>
                  <span>Nombre</span>
                  <strong>Nilda Peralta</strong>
                </div>
              </li>

              <li>
                <Mail size={19} />
                <div>
                  <span>Email</span>
                  <strong>nildalisset.ll@gmail.com</strong>
                </div>
              </li>

              <li>
                <MapPin size={19} />
                <div>
                  <span>Ubicación</span>
                  <strong>Lima, Perú</strong>
                </div>
              </li>
            </ul>
         
          <a className="text-link" href="#contact">
            Trabajemos juntos <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="about-image">
          <img src={perfil} alt="Fotografía" />
        </div>
        {/*<div className="about-cards">
          {highlights.map(({ icon: Icon, label, value }) => (
            <article className="stat-card" key={label}>
              <Icon size={21} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>*/}
      </div>
    </section>
  )
}
