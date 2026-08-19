import { CheckIcon, ClockIcon, TicketIcon, ThumbsUpIcon } from './Icons'
import { myReportsData, recentNotifications } from '../../services/myReports.mock'
import { cn } from '../../utils/cn'

const statusToneClass = {
  warning: 'text-amber-600',
  success: 'text-emerald-600',
  secondary: 'text-secondary',
}

const notificationToneClass = {
  primary: 'bg-secondary/12 text-secondary',
  success: 'bg-emerald-100 text-emerald-600',
  secondary: 'bg-blue-100 text-blue-600',
}

export const MyReportsOverview = () => (
  <section className="space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <h2 className="text-4xl font-extrabold tracking-tight text-tertiary">Mi Actividad</h2>
        <p className="text-sm text-muted">Gestiona tus reportes, perfil y notificaciones.</p>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/7 px-4 py-2 text-sm font-semibold text-secondary"
      >
        <TicketIcon className="size-4" />
        3 Nuevas Alertas
      </button>
    </header>

    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <div className="h-20 bg-linear-to-r from-secondary/15 to-primary/20" />
          <div className="px-4 pb-4 pt-2 text-center">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80"
              alt="Avatar de Ana Martinez"
              className="-mt-12 mx-auto mb-3 size-22 rounded-full border-4 border-white object-cover shadow-sm"
              loading="lazy"
            />
            <h3 className="text-2xl font-bold text-tertiary">Ana Martinez</h3>
            <p className="text-sm text-muted">Barrio San Rafael</p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl border border-tertiary/25 px-4 py-2 text-sm font-semibold text-tertiary transition hover:bg-secondary/5"
            >
              Editar Perfil
            </button>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-4 shadow-card">
          <h4 className="mb-3 text-2xl font-bold text-tertiary">Impacto</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary/8 p-3 text-center">
              <p className="text-4xl font-extrabold text-secondary">12</p>
              <p className="text-xs font-semibold uppercase text-muted">Reportes</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-center">
              <p className="text-4xl font-extrabold text-emerald-600">8</p>
              <p className="text-xs font-semibold uppercase text-muted">Resueltos</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-4 shadow-card">
          <h4 className="mb-3 text-2xl font-bold text-tertiary">Configuracion</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-tertiary">Notificaciones Push</span>
              <span className="inline-block h-6 w-10 rounded-full bg-secondary p-1">
                <span className="ml-auto block size-4 rounded-full bg-white" />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-tertiary">Privacidad de Perfil</span>
              <span className="inline-block h-6 w-10 rounded-full bg-emerald-100 p-1">
                <span className="ml-auto block size-4 rounded-full bg-emerald-500" />
              </span>
            </div>
          </div>
        </article>
      </aside>

      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <h3 className="text-3xl font-bold text-tertiary">Mis Reportes</h3>
          <div className="flex gap-2 text-xs">
            <button className="rounded-full bg-secondary px-3 py-1 font-semibold text-white">Todos</button>
            <button className="rounded-full border border-border px-3 py-1 font-semibold text-muted">En Proceso</button>
            <button className="rounded-full border border-border px-3 py-1 font-semibold text-muted">Resueltos</button>
          </div>
        </div>

        <div className="space-y-3">
          {myReportsData.map((report) => (
            <article key={report.id} className="rounded-xl border border-border bg-white p-3">
              <div className="flex gap-3">
                {report.imageUrl ? (
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="size-16 rounded-lg object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid size-16 place-items-center rounded-lg bg-slate-100 text-slate-500">
                    <TicketIcon className="size-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-lg font-bold leading-tight text-tertiary">{report.title}</h4>
                    <span
                      className={cn(
                        'text-[10px] font-extrabold uppercase tracking-wide',
                        statusToneClass[report.statusTone],
                      )}
                    >
                      {report.statusLabel}
                    </span>
                  </div>

                  <p className="mb-2 text-sm text-muted">{report.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="size-3" /> {report.createdAt}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUpIcon className="size-3" /> {report.supports} apoyos
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/5"
        >
          Ver todos mis reportes
        </button>
      </div>
    </div>

    <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
      <h3 className="mb-4 inline-flex items-center gap-2 text-2xl font-bold text-tertiary">
        <CheckIcon className="size-4 text-secondary" /> Notificaciones Recientes
      </h3>
      <ul className="space-y-3">
        {recentNotifications.map((notification) => (
          <li key={notification.id} className="rounded-xl border border-border bg-white p-3">
            <div className="flex gap-3">
              <span
                className={cn(
                  'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full',
                  notificationToneClass[notification.tone],
                )}
              >
                <TicketIcon className="size-3.5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-tertiary">{notification.title}</p>
                <p className="text-xs text-muted">{notification.timeAgo}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  </section>
)
