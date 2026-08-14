import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

interface LoginForm {
  identifier: string
  password: string
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const prefilledEmail = searchParams.get('email') ?? ''
  const prefilledUser = searchParams.get('usuario') ?? ''
  const colonyName = searchParams.get('colonia')
  const registrationSuccess = searchParams.get('registroVecino') === 'ok'
  const colonyCode = searchParams.get('codigoColonia')

  const [form, setForm] = useState<LoginForm>({
    identifier: prefilledEmail || prefilledUser,
    password: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-12">
      <section className="mx-auto grid max-w-4xl gap-6 rounded-3xl border border-border bg-surface p-6 shadow-soft lg:grid-cols-[1fr_1fr] lg:p-10">
        <div className="space-y-4">
          <p className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
            Acceso vecinal
          </p>
          <h1 className="font-display text-5xl font-extrabold text-tertiary">Inicia sesion</h1>
          <p className="text-sm text-muted">
            Gestiona reportes, notificaciones y avances de tu comunidad desde un solo lugar.
          </p>
          {colonyName && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              Colonia registrada: {colonyName}. Ya puedes entrar a tu panel.
            </p>
          )}
          {registrationSuccess && (
            <p className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
              Registro vecinal completado para codigo {colonyCode || 'de colonia'}. Inicia sesion para continuar.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-background p-5">
          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Correo</span>
            <input
              required
              value={form.identifier}
              onChange={(event) => setForm((prev) => ({ ...prev, identifier: event.target.value }))}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
              placeholder="correo@colonia.mx"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Contrasena</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
              placeholder="Ingresa tu contrasena"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white transition hover:bg-tertiary"
          >
            Entrar al panel
          </button>

          <p className="text-center text-xs text-muted">
            ¿No has registrado tu comunidad?{' '}
            <Link to="/" className="font-semibold text-secondary hover:underline">
              Hazlo aqui
            </Link>
          </p>
          <p className="text-center text-xs text-muted">
            ¿Eres vecino y tienes codigo?{' '}
            <Link to="/unirse" className="font-semibold text-secondary hover:underline">
              Registrate aqui
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
