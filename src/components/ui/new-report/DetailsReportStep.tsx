import type { ChangeEvent } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faLocationDot,
  faNoteSticky,
  faTriangleExclamation,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons'

import { LocationPickerMap } from '../LocationPickerMap'
import type { DraftImage, ReportDraft, SetDraft, Step } from './types'

interface DetailsReportStepProps {
  draft: ReportDraft
  images: DraftImage[]
  isResolvingAddress: boolean
  canContinueToReview: boolean
  setDraft: SetDraft
  setStep: (step: Step) => void
  onImagesChange: (event: ChangeEvent<HTMLInputElement>) => void
  onLocationChange: (coordinates: { lat: number; lng: number }) => void
}

export const DetailsReportStep = ({
  draft,
  images,
  isResolvingAddress,
  canContinueToReview,
  setDraft,
  setStep,
  onImagesChange,
  onLocationChange,
}: DetailsReportStepProps) => (
  <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
    <h3 className="mb-4 text-lg font-bold text-tertiary sm:text-xl">Agrega los detalles del incidente</h3>

    <div className="grid gap-4">
      <label className="space-y-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-secondary" />
          Titulo del reporte
        </span>
        <input
          value={draft.title}
          onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
          placeholder="Ej. Bache profundo en Av. Principal"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
        />
      </label>

      <label className="space-y-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary">
          <FontAwesomeIcon icon={faNoteSticky} className="text-secondary" />
          Descripcion
        </span>
        <textarea
          value={draft.description}
          onChange={(event) =>
            setDraft((current) => ({ ...current, description: event.target.value }))
          }
          rows={4}
          placeholder="Describe lo que observaste y por que es importante atenderlo"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
        />
      </label>

      <label className="space-y-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary">
          <FontAwesomeIcon icon={faLocationDot} className="text-secondary" />
          Ubicacion por mapa y GPS
        </span>
        <LocationPickerMap onLocationChange={onLocationChange} />
        <div className="rounded-xl border border-border bg-white px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-muted">Direccion detectada</p>
          <p className="text-sm text-tertiary">
            {isResolvingAddress
              ? 'Buscando direccion...'
              : draft.addressLabel || 'Selecciona un punto en el mapa para obtener la direccion'}
          </p>
        </div>
      </label>

      <label className="space-y-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary">
          <FontAwesomeIcon icon={faCamera} className="text-secondary" />
          Evidencias fotograficas
        </span>
        <div className="rounded-xl border border-dashed border-border bg-white p-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImagesChange}
            className="w-full cursor-pointer rounded-lg border border-border px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary/10 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-secondary"
          />
          <p className="mt-2 text-xs text-muted">Puedes cargar hasta 4 imagenes.</p>

          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((image) => (
                <div key={image.previewUrl} className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={image.previewUrl}
                    alt={image.file.name}
                    className="h-20 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-tertiary">Referencias (opcional)</span>
        <input
          value={draft.references}
          onChange={(event) =>
            setDraft((current) => ({ ...current, references: event.target.value }))
          }
          placeholder="Frente al parque o cerca de la farmacia"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
        />
      </label>

      <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm text-tertiary">
        <input
          type="checkbox"
          checked={draft.anonymous}
          onChange={(event) =>
            setDraft((current) => ({ ...current, anonymous: event.target.checked }))
          }
          className="size-4 rounded border-border text-secondary focus:ring-secondary"
        />
        <FontAwesomeIcon icon={faUserSecret} className="text-secondary" />
        Publicar como anonimo
      </label>
    </div>

    <div className="mt-6 flex flex-wrap justify-end gap-3">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="rounded-xl border border-border bg-white px-6 py-3 text-sm font-bold text-tertiary transition hover:bg-slate-50"
      >
        Regresar
      </button>
      <button
        type="button"
        onClick={() => setStep(3)}
        disabled={!canContinueToReview}
        className="rounded-xl bg-secondary px-8 py-3 text-sm font-bold text-white shadow-soft transition enabled:hover:bg-tertiary disabled:cursor-not-allowed disabled:bg-secondary/40"
      >
        Revisar
      </button>
    </div>
  </article>
)
