import type {
  ActivityItem,
  Metric,
  NavItem,
  ReportCardData,
} from '../types/dashboard'

export const navItems: NavItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home', path: '/dashboard' },
  { id: 'map', label: 'Mapa', icon: 'map', path: '/mapa' },
  { id: 'reports', label: 'Reportes', icon: 'list', path: '/reportar' },
  { id: 'my-reports', label: 'Mis reportes', icon: 'document', path: '/mis-reportes' },
  { id: 'profile', label: 'Perfil', icon: 'user', path: '/perfil' },
]

export const metrics: Metric[] = [
  {
    id: 'active',
    shortLabel: 'En tu calle',
    label: 'Reportes activos',
    value: 2,
    detail: 'Bacheo y alumbrado',
    tone: 'primary',
  },
  {
    id: 'resolved',
    shortLabel: 'Esta semana',
    label: 'Resueltos',
    value: 5,
    detail: 'Buen trabajo vecinal',
    tone: 'success',
  },
  {
    id: 'new',
    shortLabel: 'Hoy',
    label: 'Nuevos',
    value: 3,
    detail: 'Con evidencia valida',
    tone: 'secondary',
  },
]

export const nearbyReports: ReportCardData[] = [
  {
    id: '1',
    category: 'road',
    status: 'Nuevo',
    statusTone: 'secondary',
    timeAgo: 'Hace 2 horas',
    location: 'Av. Principal 123',
    title: 'Bache peligroso',
    description:
      'Hay un bache muy profundo en el carril derecho, varios coches ya cayeron. Urge reparacion.',
    likes: 12,
    comments: 3,
  },
  {
    id: '2',
    category: 'light',
    status: 'En proceso',
    statusTone: 'warning',
    timeAgo: 'Ayer',
    location: 'Calle Los Pinos 45',
    title: 'Luminaria fundida',
    description:
      'La lampara de la esquina lleva fundida tres dias, la calle esta muy oscura de noche.',
    likes: 28,
    comments: 5,
  },
]

export const activityFeed: ActivityItem[] = [
  {
    id: '1',
    actor: 'Maria',
    action: 'confirmo el reporte',
    context: 'Bache en Av. Principal.',
    timeAgo: 'Hace 15 min',
    tone: 'secondary',
  },
  {
    id: '2',
    actor: 'Autoridades',
    action: 'resolvieron el reporte',
    context: 'Fuga de agua en C. 8.',
    timeAgo: 'Hace 2 horas',
    tone: 'success',
  },
  {
    id: '3',
    actor: 'Carlos',
    action: 'creo un nuevo reporte',
    context: 'Semaforo descompuesto.',
    timeAgo: 'Ayer',
    tone: 'warning',
  },
  {
    id: '4',
    actor: 'Ana',
    action: 'comento en',
    context: 'Basura en parque.',
    timeAgo: 'Ayer',
    tone: 'primary',
  },
]
