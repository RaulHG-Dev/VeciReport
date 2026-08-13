import type { ReportCardData } from '../../types/dashboard'
import { cn } from '../../utils/cn'
import {
  MessageIcon,
  PinIcon,
  ShareIcon,
  SparkIcon,
  ThumbsUpIcon,
} from './Icons'

interface IssueCardProps {
  report: ReportCardData
}

const statusToneClass = {
  secondary: 'bg-secondary/12 text-secondary',
  warning: 'bg-amber-100 text-amber-600',
  success: 'bg-emerald-100 text-emerald-700',
}

const categoryIcon = {
  road: PinIcon,
  light: SparkIcon,
  water: PinIcon,
}

export const IssueCard = ({ report }: IssueCardProps) => {
  const CategoryIcon = categoryIcon[report.category]

  return (
    <article className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card sm:rounded-3xl">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-secondary/12 text-secondary">
            <CategoryIcon className="size-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold leading-tight text-tertiary sm:text-3xl">{report.title}</h3>
            <p className="text-sm text-muted">
              {report.timeAgo} • {report.location}
            </p>
          </div>
        </div>

        <span
          className={cn(
            'rounded-full px-3 py-1 text-sm font-semibold',
            statusToneClass[report.statusTone],
          )}
        >
          {report.status}
        </span>
      </div>

      <p className="mb-4 border-b border-border pb-4 text-base leading-relaxed text-tertiary/85 sm:text-xl">
        {report.description}
      </p>

      <footer className="flex items-center justify-between">
        <div className="flex items-center gap-5 text-secondary">
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <ThumbsUpIcon className="size-4" /> {report.likes}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-tertiary">
            <MessageIcon className="size-4" /> {report.comments}
          </span>
        </div>

        <button type="button" className="text-muted transition hover:text-secondary">
          <ShareIcon className="size-4" />
        </button>
      </footer>
    </article>
  )
}
