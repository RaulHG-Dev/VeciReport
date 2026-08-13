import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { CopyIcon, ShareIcon } from '../ui/Icons'

const fallbackCode = 'GENERA-CODIGO'

export const ColonyInviteCard = () => {
  const [feedback, setFeedback] = useState('')

  const inviteCode = useMemo(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    return window.localStorage.getItem('colony-invite-code') ?? ''
  }, [])

  const hasCode = inviteCode.length > 0

  const joinPath = hasCode ? `/unirse?codigo=${encodeURIComponent(inviteCode)}` : '/unirse'

  const inviteUrl = useMemo(() => {
    if (!hasCode) {
      return ''
    }

    if (typeof window === 'undefined') {
      return joinPath
    }

    return `${window.location.origin}${joinPath}`
  }, [hasCode, joinPath])

  const inviteMessage = hasCode
    ? `Unete a mi colonia en VeciReport con este codigo: ${inviteCode}. Registro: ${inviteUrl}`
    : ''

  const copyInvite = async () => {
    if (!inviteMessage) {
      return
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inviteMessage)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = inviteMessage
        textArea.setAttribute('readonly', '')
        textArea.style.position = 'absolute'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      setFeedback('Codigo copiado al portapapeles.')
    } catch {
      setFeedback('No se pudo copiar automaticamente. Intenta compartir directamente.')
    }
  }

  const shareInvite = async () => {
    if (!inviteMessage) {
      return
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Invitacion a mi colonia',
          text: inviteMessage,
          url: inviteUrl,
        })
        setFeedback('Invitacion compartida.')
        return
      } catch {
        setFeedback('No se pudo abrir el panel de compartir. Usa una red social abajo.')
      }
    } else {
      setFeedback('Tu navegador no soporta compartir directo. Usa una red social abajo.')
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteUrl)}`
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(inviteMessage)}`

  return (
    <article className="rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <h3 className="text-2xl font-bold text-tertiary">Invita a tus vecinos</h3>
      <p className="mt-1 text-sm text-muted">
        Comparte el codigo unico de tu colonia para que se registren con nombre, correo y contrasena.
      </p>

      <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-secondary/30 bg-secondary/6 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Codigo</span>
        <strong className="font-display text-lg tracking-wider text-secondary">
          {inviteCode || fallbackCode}
        </strong>
      </div>

      <div className="mt-4">
        {hasCode ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyInvite}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-tertiary transition hover:bg-slate-50"
              >
                <CopyIcon className="h-4 w-4" />
                Copiar codigo
              </button>
              <button
                type="button"
                onClick={shareInvite}
                className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-tertiary"
              >
                <ShareIcon className="h-4 w-4" />
                Compartir
              </button>
              <Link
                to={joinPath}
                className="inline-flex rounded-xl border border-secondary/30 px-4 py-2.5 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
              >
                Ver enlace
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-tertiary transition hover:bg-slate-50"
              >
                WhatsApp
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-tertiary transition hover:bg-slate-50"
              >
                Facebook
              </a>
              <a
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-tertiary transition hover:bg-slate-50"
              >
                X
              </a>
            </div>

            {feedback ? <p className="text-xs font-medium text-muted">{feedback}</p> : null}
          </div>
        ) : (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
            Aun no tienes un codigo. Registra primero tu colonia desde la pantalla de inicio.
          </p>
        )}
      </div>
    </article>
  )
}
