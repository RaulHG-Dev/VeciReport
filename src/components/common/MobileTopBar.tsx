import { BellIcon, PinIcon } from '../ui/Icons'

export const MobileTopBar = () => (
  <header className="flex items-center justify-between border-b border-border px-4 py-4 lg:hidden">
    <div className="flex items-center gap-2">
      <span className="grid size-7 place-items-center rounded-full bg-secondary/12 text-secondary">
        <PinIcon className="size-4" />
      </span>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-secondary">
        VeciReport
      </h1>
    </div>

    <div className="flex items-center gap-3">
      <button
        type="button"
        className="relative grid size-9 place-items-center rounded-full text-tertiary transition hover:bg-secondary/8"
        aria-label="Notificaciones"
      >
        <BellIcon className="size-5" />
        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-red-500" />
      </button>
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
        alt="Avatar de Mariana"
        className="size-10 rounded-full border border-border object-cover"
        loading="lazy"
      />
    </div>
  </header>
)
