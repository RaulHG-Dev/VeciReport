import { RoadIcon, SparkIcon, TrashIcon, TreeIcon, WaterIcon } from '../ui/Icons'
import { cn } from '../../utils/cn'

const statusFilters = [
  { id: 'all', label: 'Todos', active: true },
  { id: 'mine', label: 'Mis reportes', active: false },
  { id: 'pending', label: 'Pendientes', active: false },
  { id: 'resolved', label: 'Resueltos', active: false },
]

const categoryFilters = [
  { id: 'pothole', label: 'Bache', icon: RoadIcon, iconClass: 'text-tertiary' },
  { id: 'lighting', label: 'Alumbrado', icon: SparkIcon, iconClass: 'text-amber-500' },
  { id: 'water', label: 'Agua', icon: WaterIcon, iconClass: 'text-blue-500' },
  { id: 'trash', label: 'Basura', icon: TrashIcon, iconClass: 'text-amber-700' },
  { id: 'tree', label: 'Arbol', icon: TreeIcon, iconClass: 'text-emerald-600' },
]

export const MapFiltersPanel = () => (
  <aside className="rounded-2xl border border-border bg-surface p-5 shadow-card">
    <h3 className="mb-5 text-2xl font-bold text-tertiary">Filtros</h3>

    <section className="mb-6">
      <h4 className="mb-3 text-sm font-semibold text-muted">Estado</h4>
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={cn(
              'rounded-full border border-border px-3 py-1 text-xs font-semibold transition',
              filter.active
                ? 'border-secondary bg-secondary text-white'
                : 'bg-surface text-tertiary hover:border-secondary/35 hover:bg-secondary/5',
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>

    <section>
      <h4 className="mb-3 text-sm font-semibold text-muted">Categorias</h4>
      <ul className="space-y-3">
        {categoryFilters.map((category) => {
          const Icon = category.icon

          return (
            <li key={category.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left text-sm font-medium text-tertiary transition hover:bg-secondary/5"
              >
                <Icon className={cn('size-4', category.iconClass)} />
                {category.label}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  </aside>
)
