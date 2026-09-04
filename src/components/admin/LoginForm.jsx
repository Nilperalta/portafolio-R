// ============================================================
// COMPONENTE: LoginForm
// ============================================================
// Formulario controlado (igual a los que ya practicaste con
// JSONPlaceholder): dos inputs controlados con useState y un
// submit que llama a `login` (viene del hook useAuth por props).

import { useState } from 'react'
import { Database, LogIn } from 'lucide-react'

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await onLogin(email, password)
    } catch (err) {
      // Supabase devuelve mensajes en inglés; mostramos uno genérico
      // en español para no filtrar detalles técnicos al visitante.
      setError('Correo o contraseña incorrectos.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-placeholder">
      <div className="admin-placeholder-card">
        <div className="login-icon">
          <Database size={21} />
        </div>
        <p className="eyebrow">Acceso privado</p>
        <h1>Panel admin</h1>
        <p>Inicia sesión para gestionar tus proyectos y tu CV.</p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Correo electrónico</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label className="form-field">
            <span>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button-primary" disabled={submitting}>
            <LogIn size={16} />
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}
