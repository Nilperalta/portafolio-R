// ============================================================
// STATIC SITE CONTENT
// ============================================================
// Everything in this file is content that does not need a database.
// Later, only the project and CV data will become dynamic with Supabase.

export const siteConfig = {
  name: 'Nilda Peralta',
  shortName: '',
  role: 'Frontend Developer',
  eyebrow: 'Frontend Developer · UX/UI',
  headline: 'Front-End Developer',
  highlightedHeadline: 'código & diseño cuidado.',
  description:
    'Creo interfaces modernas y responsives, con enfoque en la usabilidad y detalle visual.',
  location: 'Peru',
  email: 'nildalisset.ll@gmail.com',
  whatsapp: '51999897038',
  cvUrl: '', // Supabase will provide this later.
  social: {
    github: 'https://github.com/Nilperalta/',
    linkedin: 'https://www.linkedin.com/in/nilda-peralta-b145691b3/',
    behance: 'https://www.behance.net/yourusername',
  },
  technologies: [
    { name: 'HTML5', short: 'HTML' },
    { name: 'CSS3', short: 'CSS' },
    { name: 'JavaScript', short: 'JS' },
    //{ name: 'TypeScript', short: 'TS' },
    { name: 'React', short: '⚛' },
    { name: 'Wordpress', short: 'W' },
    //{ name: 'Node.js', short: 'N' },
    { name: 'Git', short: 'G' },
    { name: 'Figma', short: 'F' },
    { name: 'Supabase', short: 'S' },
  ],
  services: [
    {
      number: '01',
      title: 'UI/UX Design',
      text: 'Diseño de interfaces intuitivas y experiencias de usuario claras, prestando atención a los detalles visuales.',
    },
    {
      number: '02',
      title: 'Web Development',
      text: 'Creación de sitios web modernos y responsivos con HTML semantico, CSS, JavaScript y React.',
    },
    {
      number: '03',
      title: 'Frontend Development',
      text: 'Diseños transformados en componentes reutilizables e interfaces pulidas que funcionan en diferentes tamaños de pantalla.',
    },
    {
      number: '04',
      title: 'UI Implementation',
      text: 'Traduzco conceptos de Figma en interfaces accesibles y fáciles de mantener, cuidando que se conserve la intención visual original del diseño.',
    },
  ],
}

export function getWhatsAppUrl(message = '') {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsapp}${message ? `?text=${encodedMessage}` : ''}`
}
