import type { DraftImage, ReportDraft, Step } from './types'

interface ReviewReportStepProps {
  draft: ReportDraft
  images: DraftImage[]
  selectedCategoryLabel: string
  isSubmitted: boolean
  setStep: (step: Step) => void
  onPublish: () => void
}

export const ReviewReportStep = ({
  draft,
  images,
  selectedCategoryLabel,
  isSubmitted,
  setStep,
  onPublish,
}: ReviewReportStepProps) => (
  <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
    <h3 className="mb-4 text-lg font-bold text-tertiary sm:text-xl">Revision final del reporte</h3>

    <div className="grid gap-3 rounded-xl border border-border bg-white p-4 text-sm text-tertiary">
      <div>
        <p className="text-xs font-semibold text-muted">Categoria</p>
        <p className="font-semibold">{selectedCategoryLabel}</p>
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
        onClick={onPublish}
        className="rounded-xl bg-secondary px-8 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-tertiary"
      >
        Publicar reporte
      </button>
    </div>
  </article>
)
