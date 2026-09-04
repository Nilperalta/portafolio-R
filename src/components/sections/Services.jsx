import { ArrowUpRight, Code2, Layout, PenTool, Smartphone } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import SectionHeading from '../layout/SectionHeading'

const icons = [Layout, Code2, Smartphone, PenTool]

export default function Services() {
  return (
    <section className="section section-muted" id="services">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Lo que hago"
          title="Servicios que"
          accent="ofrezco."
          //description="A focused set of services for turning ideas and designs into useful, polished digital experiences."
        />

        <div className="services-grid">
          {siteConfig.services.map((service, index) => {
            const Icon = icons[index]
            return (
              <article className="service-card" key={service.number}>
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <Icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contact" className="text-link">
                  contactar <ArrowUpRight size={15} />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
