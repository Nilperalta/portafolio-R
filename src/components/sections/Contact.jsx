import { ArrowUpRight, Download, Mail, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, siteConfig } from '../../data/siteConfig'
import { useCv } from '../../hooks/useCv'
import SectionHeading from '../layout/SectionHeading'

export default function Contact() {
  // El CV vive en Supabase Storage, no en el código.
  // Si todavía no se subió ninguno, `cv` es null y ocultamos el botón.
  const { cv } = useCv()

  return (
    <section className="section contact-section" id="contact">
      <div className="section-shell contact-inner">
        <div>
          <SectionHeading
            eyebrow="Trabajemos juntos"
            title="¿Tienes un proyecto en"
            accent="mente?"
          />
          <p className="contact-copy">
            La forma más rápida de contactarme es por WhatsApp. También puedes enviarme un correo electrónico para cual quier consulta.
          </p>
        </div>

        <div className="contact-actions">
          <a className="contact-action primary-contact" href={getWhatsAppUrl('Hi! I found your portfolio and would like to talk.')} target="_blank" rel="noreferrer">
            <MessageCircle />
            <span><small>WhatsApp</small><strong>Iniciar conversación</strong></span>
            <ArrowUpRight />
          </a>
          <a className="contact-action" href={`mailto:${siteConfig.email}`}>
            <Mail />
            <span><small>Email</small><strong>{siteConfig.email}</strong></span>
            <ArrowUpRight />
          </a>
          {cv && (
            <a className="contact-action" href={cv.url} target="_blank" rel="noreferrer" download>
              <Download />
              <span><small>Resume</small><strong>Download CV</strong></span>
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
