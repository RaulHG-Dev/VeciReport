import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faEllipsis,
  faLocationDot,
  faNoteSticky,
  faTriangleExclamation,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '../../utils/cn'
import { LocationPickerMap } from './LocationPickerMap'
import { RoadIcon, SparkIcon, TrashIcon, TreeIcon, WaterIcon } from './Icons'

const steps = [
  { id: 1, label: 'Categoria' },
  { id: 2, label: 'Detalles' },
  { id: 3, label: 'Revision' },
] as const

const categories = [
  { id: 'road', label: 'Bache en Via', icon: RoadIcon },
  { id: 'light', label: 'Alumbrado Publico', icon: SparkIcon },
  { id: 'trash', label: 'Basura Acumulada', icon: TrashIcon },
  { id: 'water', label: 'Fuga de Agua', icon: WaterIcon },
  { id: 'trees', label: 'Parques y Jardines', icon: TreeIcon },
  { id: 'other', label: 'Otro', icon: null },
] as const

type Step = 1 | 2 | 3

type CategoryId = (typeof categories)[number]['id']

interface ReportDraft {
  categoryId: CategoryId
  title: string
  description: string
  addressLabel: string
  location: { lat: number; lng: number } | null
  references: string
  anonymous: boolean
}

interface DraftImage {
  file: File
  previewUrl: string
}

const initialDraft: ReportDraft = {
  categoryId: 'road',
  title: '',
  description: '',
  addressLabel: '',
  location: null,
  references: '',
  anonymous: false,
}

export const NewReportCategoryStep = () => {
  const [step, setStep] = useState<Step>(1)
  const [draft, setDraft] = useState<ReportDraft>(initialDraft)
  const [images, setImages] = useState<DraftImage[]>([])
  const [isResolvingAddress, setIsResolvingAddress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === draft.categoryId),
    [draft.categoryId],
  )

  const canContinueToReview =
    draft.title.trim().length >= 5 &&
    draft.description.trim().length >= 20 &&
    draft.location !== null &&
    draft.addressLabel.trim().length >= 6

  const resolveAddressFromCoordinates = async (coordinates: { lat: number; lng: number }) => {
    setIsResolvingAddress(true)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )

      const data = (await response.json()) as { display_name?: string }

      setDraft((current) => ({
        ...current,
        location: coordinates,
        addressLabel:
          data.display_name || `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`,
      }))
    } catch {
      setDraft((current) => ({
        ...current,
        location: coordinates,
        addressLabel: `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`,
      }))
    } finally {
      setIsResolvingAddress(false)
    }
  }

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      return
    }

    setImages((current) => {
      current.forEach((image) => URL.revokeObjectURL(image.previewUrl))

      return Array.from(files).slice(0, 4).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
    })
  }

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    }
  }, [images])

  const handlePublish = () => {
    setIsSubmitted(true)
  }

  return (
    <section className="space-y-7">
      <header className="space-y-1">
        <h2 className="text-4xl font-extrabold tracking-tight text-tertiary">Crear Nuevo Reporte</h2>
        <p className="text-sm text-muted">Ayuda a mejorar tu comunidad reportando incidentes.</p>
      </header>

      <ol className="grid grid-cols-3 gap-2">
        {steps.map((item) => (
          <li key={item.id} className="text-center">
            <span
              className={cn(
                'mx-auto mb-2 grid size-6 place-items-center rounded-full text-xs font-bold',
                step === item.id
                  ? 'bg-secondary text-white'
                  : step > item.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-secondary/20 text-secondary',
              )}
            >
              {item.id}
            </span>
            <p className="text-xs font-semibold text-tertiary">{item.label}</p>
          </li>
        ))}
      </ol>

      {step === 1 && (
        <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-tertiary sm:text-xl">
            Que tipo de problema deseas reportar?
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = draft.categoryId === category.id

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setDraft((current) => ({ ...current, categoryId: category.id }))}
                  className={cn(
                    'rounded-xl border px-4 py-4 text-center transition',
                    isActive
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border bg-white hover:border-secondary/35',
                  )}
                >
                  <span
                    className={cn(
                      'mb-2 inline-grid size-8 place-items-center rounded-full',
                      isActive ? 'text-secondary' : 'text-tertiary',
                    )}
                  >
                    {Icon ? (
                      <Icon className="text-lg" />
                    ) : (
                      <FontAwesomeIcon icon={faEllipsis} className="text-lg" />
                    )}
                  </span>
                  <p className="text-sm font-semibold text-tertiary">{category.label}</p>
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl bg-secondary px-8 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-tertiary"
            >
              Siguiente
            </button>
          </div>
        </article>
      )}

      {step === 2 && (
        <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-tertiary sm:text-xl">
            Agrega los detalles del incidente
          </h3>

          <div className="grid gap-4">
            <label className="space-y-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-secondary" />
                Titulo del reporte
              </span>
              <input
                value={draft.title}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, title: event.target.value }))
                }
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
              <LocationPickerMap onLocationChange={resolveAddressFromCoordinates} />
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
                  onChange={handleImagesChange}
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
      )}

      {step === 3 && (
        <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-tertiary sm:text-xl">Revision final del reporte</h3>

          <div className="grid gap-3 rounded-xl border border-border bg-white p-4 text-sm text-tertiary">
            <div>
              <p className="text-xs font-semibold text-muted">Categoria</p>
              <p className="font-semibold">{selectedCategory?.label || 'Sin categoria'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Titulo</p>
              <p className="font-semibold">{draft.title}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Descripcion</p>
              <p>{draft.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Ubicacion</p>
              <p>{draft.addressLabel}</p>
            </div>

            {draft.location && (
              <div>
                <p className="text-xs font-semibold text-muted">Coordenadas</p>
                <p>
                  {draft.location.lat.toFixed(5)}, {draft.location.lng.toFixed(5)}
                </p>
              </div>
            )}

            {images.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted">Imagenes</p>
                <p>{images.length} archivo(s) adjunto(s)</p>
              </div>
            )}

            {draft.references.trim() && (
              <div>
                <p className="text-xs font-semibold text-muted">Referencias</p>
                <p>{draft.references}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-muted">Privacidad</p>
              <p>{draft.anonymous ? 'Anonimo' : 'Publico con nombre'}</p>
            </div>
          </div>

          {isSubmitted && (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Reporte enviado correctamente. Gracias por ayudar a tu comunidad.
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl border border-border bg-white px-6 py-3 text-sm font-bold text-tertiary transition hover:bg-slate-50"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="rounded-xl bg-secondary px-8 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-tertiary"
            >
              Publicar reporte
            </button>
          </div>
        </article>
      )}
    </section>
  )
}
