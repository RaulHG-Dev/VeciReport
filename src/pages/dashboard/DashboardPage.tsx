import { ActivityPanel } from '../../components/common/ActivityPanel'
import { BottomNav } from '../../components/common/BottomNav'
import { MobileTopBar } from '../../components/common/MobileTopBar'
import { Sidebar } from '../../components/common/Sidebar'
import { IssueCard } from '../../components/ui/IssueCard'
import { ListIcon } from '../../components/ui/Icons'
import { TopSummary } from '../../components/ui/TopSummary'
import { useSidebarPreference } from '../../hooks/useSidebarPreference'
import { nearbyReports } from '../../services/dashboard.mock'
import { cn } from '../../utils/cn'

export const DashboardPage = () => {
  const { isExpanded, toggleSidebar } = useSidebarPreference()

  return (
    <>
      <div
        className={cn(
          'min-h-screen w-full overflow-hidden bg-background lg:grid',
          isExpanded ? 'lg:grid-cols-[260px_1fr]' : 'lg:grid-cols-[88px_1fr]',
        )}
      >
        <div className="hidden lg:block">
          <Sidebar compact={!isExpanded} />
        </div>

        <main className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(37,54,235,0.13),transparent_34%),radial-gradient(circle_at_95%_6%,rgba(22,58,74,0.13),transparent_42%)]" />

          <MobileTopBar />

          <div className="relative z-10 space-y-6 px-4 pb-28 pt-4 sm:px-5 lg:space-y-8 lg:p-10 lg:pb-10">
            <div className="hidden lg:flex lg:justify-end">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-tertiary shadow-card transition hover:bg-secondary/5"
                aria-pressed={!isExpanded}
              >
                <ListIcon className="size-4" />
                {isExpanded ? 'Compactar menu' : 'Expandir menu'}
              </button>
            </div>

            <TopSummary />

            <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-4xl font-extrabold tracking-tight text-tertiary">
                    Reportes Cercanos
                  </h3>
                  <button type="button" className="text-sm font-semibold text-secondary">
                    Ver todos
                  </button>
                </div>

                <div className="space-y-4">
                  {nearbyReports.map((report) => (
                    <IssueCard key={report.id} report={report} />
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                <ActivityPanel />
              </div>
            </section>
          </div>
        </main>
      </div>

      <BottomNav />
    </>
  )
}
