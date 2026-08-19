import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckIcon, HomeIcon } from '../../components/ui/Icons'

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
    <main className="join-page">
      <header className="join-header"><Link to="/" className="join-brand"><HomeIcon /> VeciReport</Link><Link to="/login" className="join-help">Ayuda</Link></header>
      <section className="join-shell">
        <div className="join-intro">
          <p className="join-eyebrow">Unirse a comunidad</p>
          <h1>Registro<br />vecinal</h1>
          <p className="join-description">
            Ingresa el codigo unico de tu comunidad y crea tu perfil para colaborar en reportes.
          </p>
          <div className="join-requirements">
            <p>Que necesitas</p>
            <ul>
              <li><CheckIcon /> Codigo de comunidad compartido por el representante.</li>
              <li><CheckIcon /> Nombre completo para identificarte en la comunidad.</li>
              <li><CheckIcon /> Correo y contrasena para ingresar despues.</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="join-form">
          <label className="block space-y-1">
            <span>Codigo de comunidad</span>
            <input
              required
              value={form.colonyCode}
              onChange={(event) => setForm((prev) => ({ ...prev, colonyCode: event.target.value.toUpperCase() }))}
              className="join-input uppercase"
              placeholder="SANRAFAEL-4821"
            />
          </label>

          <label className="block space-y-1">
            <span>Nombre completo</span>
            <input
              required
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              className="join-input"
              placeholder="Tu nombre"
            />
          </label>

          <label className="block space-y-1">
            <span>Correo</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="join-input"
              placeholder="correo@colonia.mx"
            />
          </label>

          <label className="block space-y-1">
            <span>Contrasena</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="join-input"
              placeholder="Minimo 6 caracteres"
            />
          </label>

          <label className="block space-y-1">
            <span>Confirmar contrasena</span>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
              className="join-input"
              placeholder="Repite tu contrasena"
            />
          </label>

          {error && (
            <p className="join-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="join-submit"
          >
            Crear perfil vecinal
          </button>

          <p className="join-login-link">
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
