# Frontend Portfolio — React + Supabase

Portfolio project for a Frontend Developer, built with React + Vite and
Supabase as the backend (Auth, Database and Storage).

## Current stage

The project is now **fully connected to Supabase**:

- Public portfolio reads projects from the `projects` table.
- `/admin` is a protected route with real login (Supabase Auth).
- Full CRUD for projects (create, edit, delete, publish/hide).
- Project image upload (Supabase Storage).
- CV upload/replace (Supabase Storage), with a download button in Contact.

See **`SUPABASE_SETUP.md`** for the step-by-step setup you need to run once
(create the Supabase project, run the SQL script, create your admin user).

## Routes

- `/` — public portfolio
- `/projects` — all published projects
- `/projects/:slug` — project detail page
- `/admin` — protected admin panel (login required)
- `*` — 404 page

## Architecture

```text
src/
├── components/
│   ├── layout/          Navbar, Footer, SectionHeading
│   ├── sections/        Hero, Technologies, About, Services, Contact
│   ├── projects/        ProjectCard, Projects
│   └── admin/           LoginForm, ProjectForm, ProjectsAdminList, CvManager
├── data/
│   └── siteConfig.js    static site content (name, email, social links...)
├── hooks/
│   ├── useAuth.js       session state (login/logout)
│   ├── useProjects.js   list of projects (public or admin mode)
│   ├── useProject.js    single project by slug
│   └── useCv.js         current CV public URL
├── services/
│   ├── authService.js       all supabase.auth calls
│   ├── projectsService.js   all CRUD calls to the `projects` table
│   └── storageService.js    image/CV uploads to Supabase Storage
├── pages/
│   ├── Home.jsx, ProjectsPage.jsx, ProjectDetails.jsx
│   ├── Admin.jsx         decides: loading / login / dashboard
│   └── NotFound.jsx
├── lib/
│   └── supabaseClient.js  single Supabase client instance
├── App.jsx
└── main.jsx
```

### Why `services/`?

Components never call Supabase directly. They call a hook, the hook calls a
service, and the service talks to Supabase:

```text
ProjectCard → useProjects → projectsService → Supabase → PostgreSQL
LoginForm   → useAuth     → authService     → Supabase Auth
ProjectForm → (upload)    → storageService  → Supabase Storage
```

This means if the data source ever changed again, only the `services/`
layer would need to change — the components and hooks would stay the same.

## Setup

1. `npm install`
2. Follow **`SUPABASE_SETUP.md`** to create your Supabase project, run
   `supabase/schema.sql`, and create your admin user.
3. Copy `.env.example` to `.env` and fill in your Supabase URL and anon key.
4. `npm run dev`

For a production build:

```bash
npm run build
npm run preview
```

## Personal configuration

Edit `src/data/siteConfig.js` to set your real name, email, WhatsApp number
and social links.

## Comments

Code comments are written in Spanish on purpose — this project doubles as
study material while learning React + Supabase.
