import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BellIcon, CheckIcon, HomeIcon, MapIcon, PlusIcon } from '../../components/ui/Icons'

interface ColonyForm {
  communityName: string
  leaderName: string
  email: string
}

const initialForm: ColonyForm = {
  communityName: '',
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
      .slice(0, 10) || 'COMUNIDAD'

    const suffix = Math.floor(1000 + Math.random() * 9000)
    return `${base}-${suffix}`
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inviteCode = generateInviteCode(form.communityName)

    window.localStorage.setItem('colony-invite-code', inviteCode)

    const params = new URLSearchParams({
      email: form.email,
      comunidad: form.communityName,
      lider: form.leaderName,
      codigoColonia: inviteCode,
    })

    navigate(`/login?${params.toString()}`)
  }

  const steps: Array<[string, string, typeof PlusIcon]> = [
    ['1. Reporta', 'Toma una foto, describe el problema y marca la ubicación en el mapa.', PlusIcon],
    ['2. Confirma', 'Tus vecinos validan el reporte para evitar duplicados y aumentar prioridad.', CheckIcon],
    ['3. Da Seguimiento', 'Monitorea el estado en tiempo real, desde "Nuevo" hasta "En Proceso".', MapIcon],
    ['4. Resuelto', 'Celebra las mejoras en tu comunidad y mantén un historial organizado.', CheckIcon],
  ]

  return (
    <main className="home-page">
      <header className="home-header">
        <Link to="/" className="brand"><HomeIcon /> <span>Veci<span>Report</span></span></Link>
        <nav><a href="#como-funciona">Cómo Funciona</a><a href="#beneficios">Beneficios</a><Link to="/login">Iniciar Sesión</Link><a className="header-cta" href="#registro-colonia">Regístrate</a></nav>
      </header>

      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">↗ Tu voz hace la diferencia</span>
          <h1>Transforma tu comunidad con <strong>VeciReport</strong></h1>
          <p>La plataforma colaborativa para reportar, organizar y dar seguimiento a problemas de infraestructura comunitaria. Juntos construimos un mejor entorno.</p>
          <div className="hero-actions"><a href="#registro-colonia" className="primary-button">Regístrate ahora <span>→</span></a><a href="#como-funciona" className="secondary-button">Saber más</a></div>
        </div>
        <div className="hero-visual" aria-label="Mapa colaborativo de la colonia">
          <div className="phone"><div className="map-top">Community Events</div><div className="map-shape map-shape-one" /><div className="map-shape map-shape-two" /><div className="map-road road-one" /><div className="map-road road-two" /><span className="map-pin pin-one">●</span><span className="map-pin pin-two">●</span><span className="map-label label-one">park</span><span className="map-label label-two">school</span></div>
          <div className="hero-person person-one" /><div className="hero-person person-two" /><div className="map-card"><span>Map Activity</span><div className="activity-line" /></div>
        </div>
      </section>

      <section id="como-funciona" className="steps-section"><div className="section-heading"><h2>¿Cómo funciona?</h2><p>Un proceso simple y transparente diseñado para la colaboración vecinal.</p></div><div className="steps-grid">
        {steps.map(([title, text, Icon]) => <article className="step-card" key={title}><div className="step-icon"><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}
      </div></section>

      <section id="beneficios" className="benefits-grid"><article className="benefit-card benefit-feature"><h3>Evita Reportes Duplicados</h3><p>Nuestro sistema agrupa automáticamente los reportes similares en la misma zona. Si tu vecino ya reportó el bache, puedes sumarte a su reporte en lugar de crear uno nuevo, concentrando la atención y prioridad.</p></article><article className="benefit-card"><BellIcon /><h3>Evidencia Visual</h3><p>Sube fotos y detalla el impacto para que las autoridades o la mesa directiva actúen rápido.</p></article><article className="benefit-card"><BellIcon /><h3>Alertas en Tiempo Real</h3><p>Recibe notificaciones inmediatas cuando el estado de un reporte cambie a "Resuelto".</p></article><article className="benefit-card benefit-map"><MapIcon /><div><h3>Mapa Interactivo</h3><p>Visualiza todos los incidentes activos en tu zona. Filtra por categoría y conoce el panorama general de tu vecindario.</p></div><div className="mini-map"><span>●</span><span>●</span><span>●</span></div></article></section>

      <section id="registro-colonia" className="signup-section"><div className="signup-copy"><h2>Únete a tu comunidad<br />hoy mismo</h2><p>Crea tu cuenta gratuita y comienza a contribuir a un entorno más seguro y cuidado para todos.</p><ul><li><CheckIcon /> Acceso total al mapa vecinal</li><li><CheckIcon /> Creación y seguimiento de reportes</li><li><CheckIcon /> Notificaciones de progreso</li></ul></div><aside className="signup-form"><h2>Registra tu comunidad</h2><p className="form-intro">Completa este paso y continua al inicio de sesion.</p><form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Nombre de tu comunidad</span>
          <input
            required
            value={form.communityName}
            onChange={(event) => setForm((prev) => ({ ...prev, communityName: event.target.value }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary"
            placeholder="Ej. San Rafael"
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
      </form></aside>
      </section>
      <footer className="home-footer"><Link to="/" className="brand"><HomeIcon /> <span>Veci<span>Report</span></span></Link><span>© 2024 VeciReport. Plataforma colaborativa.</span><span>Privacidad · Términos</span></footer>
    </main>
  )
}
