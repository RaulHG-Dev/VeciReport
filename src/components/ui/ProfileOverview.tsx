import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faShield,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  profileSettings,
  profileStats,
  profileSummary,
  recentProfileActivity,
  securitySessions,
} from '../../services/profile.mock'
import { cn } from '../../utils/cn'

export const ProfileOverview = () => (
  <section className="space-y-6">
    <header className="space-y-1 border-b border-border pb-4">
      <h2 className="text-4xl font-extrabold tracking-tight text-tertiary">Perfil</h2>
      <p className="text-sm text-muted">Administra tu informacion personal y ajustes de seguridad.</p>
    </header>

    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <aside className="space-y-4">
        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <div className="mb-4 flex items-center gap-4">
            <img
              src={profileSummary.avatarUrl}
              alt={profileSummary.fullName}
              className="size-20 rounded-full border-4 border-secondary/10 object-cover"
              loading="lazy"
            />
            <div>
              <h3 className="text-2xl font-bold text-tertiary">{profileSummary.fullName}</h3>
              <p className="text-sm font-medium text-secondary">{profileSummary.username}</p>
              <p className="text-xs text-muted">{profileSummary.joinedAt}</p>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-tertiary">
            <li className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-secondary" />
              {profileSummary.neighborhood}
            </li>
            <li className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
              {profileSummary.email}
            </li>
            <li className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-secondary" />
              {profileSummary.phone}
            </li>
          </ul>

          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white transition hover:bg-tertiary"
          >
            Editar perfil
          </button>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <h4 className="mb-3 text-xl font-bold text-tertiary">Resumen</h4>
          <div className="space-y-2">
            {profileStats.map((stat) => (
              <div key={stat.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-sm text-muted">{stat.label}</span>
                <span className="text-lg font-extrabold text-secondary">{stat.value}</span>
              </div>
            ))}
          </div>
        </article>
      </aside>

      <div className="space-y-4">
        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <h4 className="mb-3 text-xl font-bold text-tertiary">Configuracion</h4>
          <ul className="space-y-3">
            {profileSettings.map((setting) => (
              <li key={setting.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-sm font-medium text-tertiary">{setting.label}</span>
                <span
                  className={cn(
                    'inline-flex h-6 w-10 rounded-full p-1',
                    setting.enabled ? 'bg-secondary' : 'bg-slate-300',
                  )}
                >
                  <span
                    className={cn(
                      'block size-4 rounded-full bg-white transition',
                      setting.enabled ? 'ml-auto' : 'ml-0',
                    )}
                  />
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <h4 className="mb-3 inline-flex items-center gap-2 text-xl font-bold text-tertiary">
            <FontAwesomeIcon icon={faShield} className="text-secondary" /> Seguridad
          </h4>
          <ul className="space-y-2">
            {securitySessions.map((session) => (
              <li key={session.id} className="rounded-lg border border-border px-3 py-2">
                <p className="text-sm font-semibold text-tertiary">{session.device}</p>
                <p className="text-xs text-muted">{session.location} • {session.status}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-secondary transition hover:bg-secondary/5"
          >
            Cerrar otras sesiones
          </button>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <h4 className="mb-3 inline-flex items-center gap-2 text-xl font-bold text-tertiary">
            <FontAwesomeIcon icon={faUser} className="text-secondary" /> Actividad reciente
          </h4>
          <ul className="space-y-2">
            {recentProfileActivity.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2">
                <p className="text-sm text-tertiary">{item.title}</p>
                <span className="text-xs font-medium text-muted">{item.time}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  </section>
)
