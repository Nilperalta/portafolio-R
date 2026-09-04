// ============================================================
// DATOS DE EJEMPLO (YA NO SE USAN)
// ============================================================
// Este archivo se usó al principio, antes de conectar Supabase.
// projectsService.js ya NO importa este archivo: ahora los
// proyectos vienen de la tabla `projects` en Supabase.
//
// Lo dejamos aquí solo como referencia del "shape" original
// que se mantuvo al diseñar la tabla y el mapeo en projectsService.js.

export const projects = [
  {
    id: 'project-01',
    slug: 'ecommerce-platform',
    number: '01',
    title: 'E-Commerce Platform',
    category: 'Web Development · UI/UX',
    description:
      'A responsive online store focused on a clear shopping experience, product discovery and a polished interface.',
    image: '/images/project-ecommerce.svg',
    technologies: ['React', 'JavaScript', 'CSS', 'Figma'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
  },
  {
    id: 'project-02',
    slug: 'task-management-app',
    number: '02',
    title: 'Task Management App',
    category: 'React · Frontend',
    description:
      'A clean task management interface designed around simple interactions, reusable components and responsive layouts.',
    image: '/images/project-tasks.svg',
    technologies: ['React', 'JavaScript', 'CSS'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/yourusername/task-management-app',
    featured: true,
  },
  {
    id: 'project-03',
    slug: 'analytics-dashboard',
    number: '03',
    title: 'Analytics Dashboard',
    category: 'Dashboard · UI/UX',
    description:
      'A data-focused dashboard concept with a strong visual hierarchy, cards, charts and responsive information architecture.',
    image: '/images/project-dashboard.svg',
    technologies: ['React', 'JavaScript', 'Figma'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/yourusername/analytics-dashboard',
    featured: true,
  },
]
