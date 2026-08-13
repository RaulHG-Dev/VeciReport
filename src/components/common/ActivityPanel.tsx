import { activityFeed } from '../../services/dashboard.mock'
import { cn } from '../../utils/cn'

const bulletTone = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  secondary: 'bg-secondary',
}

export const ActivityPanel = () => (
  <aside className="rounded-2xl border border-border bg-surface p-5 shadow-card">
    <h3 className="mb-6 text-2xl font-bold text-tertiary">Actividad de tu comunidad</h3>
    <ul className="space-y-5">
      {activityFeed.map((activity) => (
        <li key={activity.id} className="flex gap-3">
          <span
            className={cn('mt-1.5 size-2.5 shrink-0 rounded-full', bulletTone[activity.tone])}
            aria-hidden="true"
          />
          <div className="space-y-1">
            <p className="text-sm leading-relaxed text-tertiary">
              <span className="font-bold">{activity.actor}</span> {activity.action}{' '}
              <span className="font-semibold text-secondary">{activity.context}</span>
            </p>
            <p className="text-xs font-medium text-muted">{activity.timeAgo}</p>
          </div>
        </li>
      ))}
    </ul>
  </aside>
)
