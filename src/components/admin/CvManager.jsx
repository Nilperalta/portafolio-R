// ============================================================
// COMPONENTE: CvManager
// ============================================================
// Permite subir un PDF que reemplaza el CV anterior.
// Como storageService siempre guarda el archivo con el mismo
// nombre (cv.pdf, con upsert: true), "subir" y "reemplazar" son
// literalmente la misma acción.

import { useState } from 'react'
import { FileText, UploadCloud } from 'lucide-react'
import { uploadCv } from '../../services/storageService'

export default function CvManager({ cv, onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  async function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('El CV debe ser un archivo PDF.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      await uploadCv(file)
      onUploaded()
    } catch (err) {
      setError('No se pudo subir el CV. Inténtalo de nuevo.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="admin-list">
      <div className="admin-list-header">
        <h2>Currículum (CV)</h2>
      </div>

      <div className="cv-manager-card">
        <div className="cv-current">
          <FileText size={20} />
          {cv ? (
            <a href={cv.url} target="_blank" rel="noreferrer" className="text-link">
              Ver CV actual
            </a>
          ) : (
            <span className="cv-empty">Todavía no has subido un CV.</span>
          )}
        </div>

        <label className="button button-secondary file-button">
          <UploadCloud size={15} />
          {uploading ? 'Subiendo...' : cv ? 'Reemplazar CV' : 'Subir CV'}
          <input type="file" accept="application/pdf" onChange={handleFileChange} hidden disabled={uploading} />
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}
    </div>
  )
}
