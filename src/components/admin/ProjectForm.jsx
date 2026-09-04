// ============================================================
// COMPONENTE: ProjectForm
// ============================================================
// Un mismo formulario sirve para CREAR y para EDITAR:
//  - Si recibe `initialProject`, precargamos los inputs (edición).
//  - Si no, arrancamos con campos vacíos (creación).
//
// La imagen es un caso especial: el input de tipo "file" no se
// puede controlar con `value`, así que la manejamos aparte con
// su propio estado (`imageFile` + `imagePreview`).

import { useState } from 'react'
import { Save, X, UploadCloud } from 'lucide-react'
import { uploadProjectImage } from '../../services/storageService'

const emptyProject = {
  slug: '',
  number: '',
  title: '',
  category: '',
  description: '',
  image: '',
  technologies: '',
  liveUrl: '',
  sourceUrl: '',
  featured: false,
  published: true,
}

export default function ProjectForm({ initialProject, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    initialProject
      ? { ...initialProject, technologies: initialProject.technologies.join(', ') }
      : emptyProject
  )
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(initialProject?.image ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSaving(true)

    try {
      let imageUrl = form.image

      // Si la persona seleccionó un archivo nuevo, lo subimos primero
      // a Supabase Storage y usamos la URL pública que nos devuelve.
      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile, form.slug)
      }

      const technologies = form.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean)

      await onSubmit({
        ...form,
        image: imageUrl,
        technologies,
      })
    } catch (err) {
      setError('No se pudo guardar el proyecto. Revisa los datos e inténtalo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="admin-form project-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Título</span>
          <input
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span>Slug (para la URL /projects/slug)</span>
          <input
            value={form.slug}
            onChange={(event) => updateField('slug', event.target.value)}
            required
            pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
            title="Solo minúsculas, números y guiones"
          />
        </label>

        <label className="form-field">
          <span>Número (ej. 01)</span>
          <input value={form.number} onChange={(event) => updateField('number', event.target.value)} />
        </label>

        <label className="form-field">
          <span>Categoría</span>
          <input
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
            placeholder="Web Development · UI/UX"
          />
        </label>
      </div>

      <label className="form-field">
        <span>Descripción</span>
        <textarea
          rows={3}
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
          required
        />
      </label>

      <label className="form-field">
        <span>Tecnologías (separadas por coma)</span>
        <input
          value={form.technologies}
          onChange={(event) => updateField('technologies', event.target.value)}
          placeholder="React, JavaScript, CSS"
        />
      </label>

      <div className="form-grid">
        <label className="form-field">
          <span>URL del proyecto en vivo</span>
          <input
            value={form.liveUrl}
            onChange={(event) => updateField('liveUrl', event.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className="form-field">
          <span>URL del código (GitHub)</span>
          <input
            value={form.sourceUrl}
            onChange={(event) => updateField('sourceUrl', event.target.value)}
            placeholder="https://github.com/..."
          />
        </label>
      </div>

      <label className="form-field">
        <span>Imagen del proyecto</span>
        <div className="image-upload">
          {imagePreview && <img src={imagePreview} alt="Vista previa" className="image-preview" />}
          <label className="button button-secondary file-button">
            <UploadCloud size={15} />
            {imageFile ? imageFile.name : 'Elegir imagen'}
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
        </div>
      </label>

      <div className="form-checkboxes">
        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => updateField('featured', event.target.checked)}
          />
          <span>Destacado (aparece en el inicio)</span>
        </label>

        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => updateField('published', event.target.checked)}
          />
          <span>Publicado (visible para todos)</span>
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={saving}>
          <Save size={16} />
          {saving ? 'Guardando...' : 'Guardar proyecto'}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel} disabled={saving}>
          <X size={16} />
          Cancelar
        </button>
      </div>
    </form>
  )
}
