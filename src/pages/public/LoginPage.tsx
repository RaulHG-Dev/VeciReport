import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { HomeIcon } from '../../components/ui/Icons'

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
    <main className="login-page">
      <section className="login-shell">
        <div className="login-visual">
          <Link to="/" className="login-brand"><HomeIcon /><span>VeciReport</span></Link>
          <div className="login-message">
            <h1>Tu voz, tu comunidad.</h1>
            <p>Inicia sesión para reportar incidencias, colaborar con tus vecinos y mejorar tu entorno.</p>
          </div>
        </div>

        <div className="login-content">
          <div className="login-heading">
            <h2>Bienvenido de nuevo</h2>
            <p>Por favor, ingresa tus datos para acceder a tu cuenta.</p>
          </div>
          {colonyName && (
            <p className="login-notice login-notice-success">
              Colonia registrada: {colonyName}. Ya puedes entrar a tu panel.
            </p>
          )}
          {registrationSuccess && (
            <p className="login-notice login-notice-info">
              Registro vecinal completado para codigo {colonyCode || 'de colonia'}. Inicia sesion para continuar.
            </p>
          )}

          <form onSubmit={handleSubmit} className="login-form">
          <label className="block space-y-1">
            <span>Correo Electrónico</span>
            <input
              required
              value={form.identifier}
              onChange={(event) => setForm((prev) => ({ ...prev, identifier: event.target.value }))}
              placeholder="ejemplo@correo.com"
            />
          </label>

          <label className="block space-y-1">
            <span>Contraseña</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="••••••••"
            />
          </label>

          <div className="login-options"><label><input type="checkbox" /> <span>Recordarme</span></label><a href="#recuperar">¿Olvidaste tu contraseña?</a></div>

          <button
            type="submit"
            className="login-submit"
          >
            Iniciar Sesión
          </button>

          <p className="login-register">
            ¿No tienes una cuenta?{' '}
            <Link to="/" className="font-semibold text-secondary hover:underline">
              Regístrate
            </Link>
          </p>
          <p className="login-register login-neighbor">
            ¿Eres vecino y tienes código?{' '}
            <Link to="/unirse" className="font-semibold text-secondary hover:underline">
              Regístrate aquí
            </Link>
          </p>
          </form>
        </div>
      </section>
    </main>
  )
}
