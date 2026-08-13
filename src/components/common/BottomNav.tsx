import {
  CameraIcon,
  HomeIcon,
  MapIcon,
  PlusIcon,
  UserIcon,
} from '../ui/Icons'
import { cn } from '../../utils/cn'

const mobileItems = [
  { id: 'home', label: 'Inicio', icon: HomeIcon, active: true },
  { id: 'map', label: 'Mapa', icon: MapIcon, active: false },
  { id: 'my-reports', label: 'Mis Reportes', icon: CameraIcon, active: false },
  { id: 'profile', label: 'Perfil', icon: UserIcon, active: false },
]

export const BottomNav = () => (
  <nav
    aria-label="Navegacion movil"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-2 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
  >
    <ul className="relative mx-auto grid max-w-md grid-cols-5 items-end">
      {mobileItems.slice(0, 2).map((item) => {
        const Icon = item.icon

        return (
          <li key={item.id} className="text-center">
            <button type="button" className="mx-auto flex flex-col items-center gap-1 px-1 py-1">
              <span
                className={cn(
                  'grid size-8 place-items-center rounded-full',
                  item.active ? 'bg-secondary/20 text-secondary' : 'text-tertiary',
                )}
              >
                <Icon className="size-4" />
              </span>
              <span
                className={cn(
                  'text-xs font-semibold',
                  item.active ? 'text-secondary' : 'text-tertiary',
                )}
              >
                {item.label}
              </span>
            </button>
          </li>
        )
      })}

      <li aria-hidden="true" />

      {mobileItems.slice(2).map((item) => {
        const Icon = item.icon

        return (
          <li key={item.id} className="text-center">
            <button type="button" className="mx-auto flex flex-col items-center gap-1 px-1 py-1">
              <span className="grid size-8 place-items-center rounded-full text-tertiary">
                <Icon className="size-4" />
              </span>
              <span className="text-xs font-semibold text-tertiary">
                {item.id === 'my-reports' ? (
                  <>
                    <span className="block">Mis</span>
                    <span className="block">Reportes</span>
                  </>
                ) : (
                  item.label
                )}
              </span>
            </button>
          </li>
        )
      })}

      <li className="pointer-events-none absolute inset-x-0 -top-7 mx-auto flex justify-center">
        <button
          type="button"
          className="pointer-events-auto grid size-14 place-items-center rounded-full border-4 border-background bg-secondary text-white shadow-soft"
          aria-label="Crear reporte"
        >
          <PlusIcon className="size-7" />
        </button>
      </li>
    </ul>
  </nav>
)
