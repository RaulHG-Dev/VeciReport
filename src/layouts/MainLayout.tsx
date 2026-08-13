import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="min-h-screen w-full bg-[linear-gradient(170deg,#f8fbff_0%,#edf3ff_40%,#e9f0ff_100%)]">
    {children}
  </div>
)
