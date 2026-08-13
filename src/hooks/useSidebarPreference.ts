import { useState } from 'react'

const SIDEBAR_KEY = 'dashboard-sidebar-visible'

export const useSidebarPreference = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true
    }

    const stored = window.localStorage.getItem(SIDEBAR_KEY)
    return stored === null ? true : stored === 'true'
  })

  const toggleSidebar = () => {
    setIsExpanded((current) => {
      const next = !current
      window.localStorage.setItem(SIDEBAR_KEY, String(next))
      return next
    })
  }

  return {
    isExpanded,
    toggleSidebar,
  }
}
