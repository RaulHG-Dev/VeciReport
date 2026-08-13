export interface NavItem {
  id: string
  label: string
  icon: 'home' | 'map' | 'list' | 'document' | 'user'
  path?: string
}

export interface Metric {
  id: string
  shortLabel: string
  label: string
  value: number
  detail: string
  tone: 'primary' | 'success' | 'secondary'
}

export interface ReportCardData {
  id: string
  category: 'road' | 'light' | 'water'
  status: string
  statusTone: 'secondary' | 'warning' | 'success'
  timeAgo: string
  location: string
  title: string
  description: string
  likes: number
  comments: number
}

export interface ActivityItem {
  id: string
  actor: string
  action: string
  context: string
  timeAgo: string
  tone: 'primary' | 'success' | 'warning' | 'secondary'
}

export interface MyReportItem {
  id: string
  title: string
  description: string
  status: 'en-proceso' | 'resuelto' | 'confirmado'
  statusLabel: string
  statusTone: 'warning' | 'success' | 'secondary'
  createdAt: string
  supports: number
  imageUrl?: string
}

export interface RecentNotificationItem {
  id: string
  title: string
  subtitle: string
  timeAgo: string
  tone: 'primary' | 'success' | 'secondary'
}
