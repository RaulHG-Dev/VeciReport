import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

interface NeighborRegisterForm {
  colonyCode: string
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

const initialForm: NeighborRegisterForm = {
  colonyCode: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const JoinColonyPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialCode = searchParams.get('codigo') ?? ''

  const [form, setForm] = useState<NeighborRegisterForm>({
    ...initialForm,
    colonyCode: initialCode,
  })
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contrasenas no coinciden.')
      return
    }

    setError('')

    const params = new URLSearchParams({
      email: form.email.trim().toLowerCase(),
      registroVecino: 'ok',
      codigoColonia: form.colonyCode,
    })

    navigate(`/login?${params.toString()}`)
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-12">
      <section className="mx-auto grid max-w-4xl gap-6 rounded-3xl border border-border bg-surface p-6 shadow-soft lg:grid-cols-[1fr_1fr] lg:p-10">
        <div className="space-y-4">
          <p className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
            Unirse a colonia
          </p>
          <h1 className="font-display text-5xl font-extrabold text-tertiary">Registro vecinal</h1>
          <p className="text-sm text-muted">
            Ingresa el codigo unico de tu colonia y crea tu perfil para colaborar en reportes.
          </p>
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Que necesitas</p>
            <ul className="mt-2 space-y-1 text-sm text-tertiary">
              <li>Codigo de colonia compartido por el representante.</li>
              <li>Nombre completo para identificarte en la comunidad.</li>
              <li>Correo y contrasena para ingresar despues.</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-background p-5">
          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Codigo de colonia</span>
            <input
              required
              value={form.colonyCode}
              onChange={(event) => setForm((prev) => ({ ...prev, colonyCode: event.target.value.toUpperCase() }))}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm uppercase outline-none transition focus:border-secondary"
              placeholder="SANRAFAEL-4821"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Nombre completo</span>
            <input
              required
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
              placeholder="Tu nombre"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Correo</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
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
              placeholder="Minimo 6 caracteres"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Confirmar contrasena</span>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
              placeholder="Repite tu contrasena"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white transition hover:bg-tertiary"
          >
            Crear perfil vecinal
          </button>

          <p className="text-center text-xs text-muted">
            Ya tienes cuenta?{' '}
            <Link to="/login" className="font-semibold text-secondary hover:underline">
              Inicia sesion
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
