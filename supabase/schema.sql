-- ============================================================
-- ESQUEMA DE SUPABASE PARA EL PORTAFOLIO
-- ============================================================
-- Cómo usar este archivo:
--   1. Entra a tu proyecto en https://supabase.com/dashboard
--   2. Ve a "SQL Editor" (menú lateral)
--   3. Pega TODO este archivo y presiona "Run"
--
-- Esto crea:
--   - la tabla `projects`
--   - las políticas de seguridad (RLS)
--   - los buckets de Storage para imágenes y CV

-- ------------------------------------------------------------
-- 1) TABLA DE PROYECTOS
-- ------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text,
  title text not null,
  category text,
  description text,
  image_url text,
  technologies text[] default '{}',
  live_url text,
  source_url text,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 2) ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------
-- RLS significa: "por defecto, nadie puede leer ni escribir nada".
-- Cada política de abajo abre un permiso muy específico.

alter table public.projects enable row level security;

-- Cualquier visitante (sin sesión) puede LEER proyectos publicados.
-- Una persona logueada (tú, en /admin) puede leer TODOS, publicados u ocultos.
create policy "Lectura pública de proyectos publicados"
on public.projects for select
to anon, authenticated
using (published = true or auth.role() = 'authenticated');

-- Solo una persona autenticada (tú) puede crear proyectos.
create policy "Solo autenticados pueden crear proyectos"
on public.projects for insert
to authenticated
with check (auth.role() = 'authenticated');

-- Solo una persona autenticada puede editar proyectos.
create policy "Solo autenticados pueden editar proyectos"
on public.projects for update
to authenticated
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

-- Solo una persona autenticada puede eliminar proyectos.
create policy "Solo autenticados pueden eliminar proyectos"
on public.projects for delete
to authenticated
using (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 3) STORAGE: buckets para imágenes de proyectos y CV
-- ------------------------------------------------------------
-- "public: true" significa que cualquiera con el link puede VER
-- el archivo (necesario para mostrar imágenes y el CV en el sitio).
-- Subir/editar/borrar sigue protegido por las políticas de abajo.

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('cv', 'cv', true)
on conflict (id) do nothing;

-- Cualquiera puede leer archivos de estos buckets (son públicos).
create policy "Lectura pública de imágenes de proyectos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'project-images');

create policy "Lectura pública del CV"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'cv');

-- Solo una persona autenticada puede subir/reemplazar/borrar archivos.
create policy "Solo autenticados suben imágenes de proyectos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-images');

create policy "Solo autenticados actualizan imágenes de proyectos"
on storage.objects for update
to authenticated
using (bucket_id = 'project-images');

create policy "Solo autenticados eliminan imágenes de proyectos"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-images');

create policy "Solo autenticados suben el CV"
on storage.objects for insert
to authenticated
with check (bucket_id = 'cv');

create policy "Solo autenticados actualizan el CV"
on storage.objects for update
to authenticated
using (bucket_id = 'cv');

create policy "Solo autenticados eliminan el CV"
on storage.objects for delete
to authenticated
using (bucket_id = 'cv');
