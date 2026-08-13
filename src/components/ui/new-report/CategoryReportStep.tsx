import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { cn } from '../../../utils/cn'
import { categories } from './constants'
import type { SetDraft, Step, ReportDraft } from './types'

interface CategoryReportStepProps {
  draft: ReportDraft
  setDraft: SetDraft
  setStep: (step: Step) => void
}

export const CategoryReportStep = ({ draft, setDraft, setStep }: CategoryReportStepProps) => (
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
)
