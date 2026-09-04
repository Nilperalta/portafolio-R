import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="simple-page">
      <div className="section-shell">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="button button-primary">Back to portfolio</Link>
      </div>
    </main>
  )
}
