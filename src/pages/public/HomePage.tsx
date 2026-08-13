import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface ColonyForm {
  colonyName: string
  municipality: string
  leaderName: string
  email: string
}

const initialForm: ColonyForm = {
  colonyName: '',
  municipality: '',
  leaderName: '',
  email: '',
}

export const HomePage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<ColonyForm>(initialForm)

  const generateInviteCode = (colonyName: string) => {
    const base = colonyName
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '')
      .trim()
      .replace(/\s+/g, '')
      .slice(0, 10) || 'COLONIA'

    const suffix = Math.floor(1000 + Math.random() * 9000)
    return `${base}-${suffix}`
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const inviteCode = generateInviteCode(form.colonyName)

    window.localStorage.setItem('colony-invite-code', inviteCode)

    const params = new URLSearchParams({
      email: form.email,
      colonia: form.colonyName,
      lider: form.leaderName,
      codigoColonia: inviteCode,
    })

    navigate(`/login?${params.toString()}`)
  }

  return (
    <main className="min-h-screen space-y-6 px-4 py-8 sm:px-6 lg:px-12">
      <section className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-border bg-surface p-6 shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
            Plataforma vecinal
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-tight text-tertiary sm:text-6xl">
            Tu colonia conectada para resolver incidentes mas rapido.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            VeciReport ayuda a tu comunidad a reportar problemas urbanos, coordinar apoyos y dar
            seguimiento transparente con evidencia geolocalizada.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-border bg-background px-4 py-4">
              <p className="text-3xl font-extrabold text-secondary">+2.4k</p>
              <p className="text-sm font-semibold text-muted">Reportes gestionados</p>
            </article>
            <article className="rounded-2xl border border-border bg-background px-4 py-4">
              <p className="text-3xl font-extrabold text-emerald-600">82%</p>
              <p className="text-sm font-semibold text-muted">Casos resueltos</p>
            </article>
            <article className="rounded-2xl border border-border bg-background px-4 py-4">
              <p className="text-3xl font-extrabold text-primary">24h</p>
              <p className="text-sm font-semibold text-muted">Tiempo promedio</p>
            </article>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-white transition hover:bg-tertiary"
            >
              Ya tengo cuenta
            </Link>
            <Link
              to="/dashboard"
              className="rounded-xl border border-border px-6 py-3 text-sm font-bold text-tertiary transition hover:bg-secondary/5"
            >
              Ver demo
            </Link>
          </div>
        </div>

        <aside id="registro-colonia" className="rounded-2xl border border-border bg-background p-5 sm:p-6">
          <h2 className="text-3xl font-bold text-tertiary">Registra tu colonia</h2>
          <p className="mt-1 text-sm text-muted">Completa este paso y continua al inicio de sesion.</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Nombre de la colonia</span>
              <input
                required
                value={form.colonyName}
                onChange={(event) => setForm((prev) => ({ ...prev, colonyName: event.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
                placeholder="Ej. San Rafael"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Municipio / Alcaldia</span>
              <input
                required
                value={form.municipality}
                onChange={(event) => setForm((prev) => ({ ...prev, municipality: event.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
                placeholder="Ej. Benito Juarez"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Representante vecinal</span>
              <input
                required
                value={form.leaderName}
                onChange={(event) => setForm((prev) => ({ ...prev, leaderName: event.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
                placeholder="Tu nombre"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Correo de acceso</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
                placeholder="correo@colonia.mx"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white transition hover:bg-tertiary"
            >
              Continuar a login
            </button>
          </form>
        </aside>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 rounded-3xl border border-border bg-surface p-6 shadow-soft lg:grid-cols-[1fr_0.9fr] lg:p-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-extrabold tracking-tight text-tertiary">Invita a tus vecinos</h2>
          <p className="max-w-xl text-sm text-muted">
            El codigo unico se genera al registrar tu colonia y podras verlo dentro del panel.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-background p-5">
          <p className="text-sm text-muted">
            Ve al panel para copiar el codigo e invitar vecinos al registro con correo y contrasena.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex justify-center rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-white transition hover:bg-tertiary"
          >
            Ver codigo en el panel
          </Link>
        </div>
      </section>
    </main>
  )
}
