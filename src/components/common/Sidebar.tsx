import { navItems } from '../../services/dashboard.mock'
import { cn } from '../../utils/cn'
import {
  DocumentIcon,
  HomeIcon,
  ListIcon,
  MapIcon,
  PlusIcon,
  UserIcon,
} from '../ui/Icons'

const iconByName = {
  home: HomeIcon,
  map: MapIcon,
  list: ListIcon,
  document: DocumentIcon,
  user: UserIcon,
}

interface SidebarProps {
  compact?: boolean
}

export const Sidebar = ({ compact = false }: SidebarProps) => (
  <aside
    className={cn(
      'flex h-full w-full flex-col justify-between border-r border-border bg-surface py-6 transition-all',
      compact ? 'px-2' : 'px-4',
    )}
  >
    <div>
      {compact ? (
        <header className="mb-8 flex justify-center">
          <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-sm font-extrabold text-white">
            VR
          </span>
        </header>
      ) : (
        <header className="mb-8 px-2">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-secondary">
            VeciReport
          </h1>
          <p className="text-sm font-medium text-muted">Comunidad activa</p>
        </header>
      )}

      <nav aria-label="Principal" className="space-y-1">
        {navItems.map((item, index) => {
          const Icon = iconByName[item.icon]
          const isActive = index === 0

          return (
            <button
              key={item.id}
              type="button"
              title={item.label}
              className={cn(
                'group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition',
                isActive
                  ? 'bg-secondary/10 text-secondary'
                  : 'text-tertiary hover:bg-secondary/6 hover:text-secondary',
                compact && 'justify-center px-2',
              )}
            >
              <Icon className="size-4" />
              {!compact && item.label}
            </button>
          )
        })}
      </nav>
    </div>

    <button
      type="button"
      title="Reportar"
      className={cn(
        'rounded-xl bg-secondary text-sm font-bold text-white shadow-soft transition hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
        compact ? 'mx-auto grid size-11 place-items-center rounded-2xl' : 'w-full px-4 py-3',
      )}
    >
      {compact ? <PlusIcon className="size-4" /> : '+ Reportar'}
    </button>
  </aside>
)
