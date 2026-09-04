# Configurar Supabase para tu portafolio

Esto es lo único que **tienes que hacer tú misma**, porque requiere tu propia
cuenta. Todo el código ya está listo esperando estas credenciales.

## 1. Crear el proyecto en Supabase

1. Entra a https://supabase.com y crea una cuenta (puede ser con GitHub).
2. Clic en **"New project"**.
3. Elige un nombre (ej. `portafolio-react`), una contraseña para la base de
   datos (guárdala, no la necesitarás en el día a día pero es buena
   práctica anotarla) y la región más cercana (ej. `South America`).
4. Espera 1-2 minutos mientras se aprovisiona el proyecto.

## 2. Copiar las credenciales al `.env`

1. En el dashboard de tu proyecto, ve a **Project Settings → API**.
2. Copia:
   - **Project URL** → va en `VITE_SUPABASE_URL`
   - **anon public key** → va en `VITE_SUPABASE_PUBLISHABLE_KEY`
3. En la raíz del proyecto, crea un archivo llamado `.env` (puedes copiar
   `.env.example` y renombrarlo) con este contenido:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-anon-key-aqui
```

`.env` ya está en `.gitignore`, así que nunca se subirá a GitHub.

## 3. Ejecutar el script SQL

1. En el dashboard, ve a **SQL Editor**.
2. Abre el archivo `supabase/schema.sql` de este proyecto, copia **todo** su
   contenido y pégalo en el editor.
3. Presiona **Run**.

Esto crea:

- la tabla `projects`
- las políticas de seguridad (RLS) que permiten:
  - a cualquier visitante, ver solo proyectos **publicados**
  - solo a ti (con sesión iniciada), ver/crear/editar/eliminar todo
- dos buckets de Storage: `project-images` y `cv` (públicos para lectura,
  protegidos para escritura)

## 4. Crear tu usuario admin

Como es tu portafolio personal, no necesitas un formulario de registro
público. Creas tu único usuario directamente desde el dashboard:

1. Ve a **Authentication → Users**.
2. Clic en **"Add user" → "Create new user"**.
3. Ingresa tu correo y una contraseña. Marca **"Auto Confirm User"** para no
   tener que verificar el correo.
4. Guarda. Esas son las credenciales con las que entrarás a `/admin`.

## 5. Probar todo

```bash
npm install
npm run dev
```

- Visita `/` → el sitio carga proyectos desde Supabase (al principio estará
  vacío, es normal).
- Visita `/admin` → inicia sesión con el usuario que creaste.
- Crea tu primer proyecto, sube una imagen, márcalo como publicado.
- Sube tu CV en la pestaña "CV" del panel.
- Vuelve a `/` → deberías ver el proyecto y el botón de descargar CV.

## Notas para cuando lo repasemos juntos

- `src/lib/supabaseClient.js` → dónde se crea la conexión.
- `src/services/` → toda la comunicación con Supabase (proyectos, auth,
  storage) vive aquí, nunca directamente en los componentes.
- `src/hooks/` → `useAuth`, `useProjects`, `useCv` conectan los servicios
  con los componentes usando `useState`/`useEffect`, igual que ya
  practicaste con JSONPlaceholder.
- `supabase/schema.sql` → la "fuente de la verdad" de tu base de datos. Si
  alguna vez recreas el proyecto de Supabase, solo vuelves a correr este
  script.
