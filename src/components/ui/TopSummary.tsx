import { metrics } from '../../services/dashboard.mock'
import { CheckIcon, ClockIcon, TicketIcon } from './Icons'
import { cn } from '../../utils/cn'

const iconByTone = {
  primary: ClockIcon,
  success: CheckIcon,
  secondary: TicketIcon,
}

const toneClass = {
  primary: 'text-primary',
  success: 'text-success',
  secondary: 'text-secondary',
}

export const TopSummary = () => (
  <section className="space-y-4 sm:space-y-5">
    <header className="space-y-1">
      <h2 className="text-3xl font-extrabold tracking-tight text-tertiary sm:text-4xl">Hola, Mariana!</h2>
      <p className="text-base text-muted sm:text-xl">Aqui esta el resumen de tu comunidad hoy.</p>
    </header>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => {
        const Icon = iconByTone[metric.tone]

        return (
          <article
            key={metric.id}
            className={cn(
              'rounded-2xl border border-border bg-surface px-4 py-4 shadow-card',
              index === 2 && 'hidden lg:block',
            )}
          >
            <div className="mb-3 flex items-center gap-2 text-muted">
              <span className="grid size-8 place-items-center rounded-full bg-secondary/10">
                <Icon className={cn('size-4', toneClass[metric.tone])} />
              </span>
              <p className="text-sm font-semibold">{metric.shortLabel}</p>
            </div>
            <p className="text-3xl font-bold leading-none text-tertiary sm:text-4xl">
              {metric.value} <span className="text-2xl sm:text-3xl">{metric.label}</span>
            </p>
            <p className="mt-2 text-sm text-muted">{metric.detail}</p>
          </article>
        )
      })}
    </div>
  </section>
)
