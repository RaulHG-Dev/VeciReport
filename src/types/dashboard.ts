export interface NavItem {
  id: string
  label: string
  icon: 'home' | 'map' | 'list' | 'document' | 'user'
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
