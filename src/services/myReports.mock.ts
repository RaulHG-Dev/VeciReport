import type { MyReportItem, RecentNotificationItem } from '../types/dashboard'

export const myReportsData: MyReportItem[] = [
  {
    id: 'r1',
    title: 'Bache peligroso en la Av. Central',
    description:
      'Hay un bache muy profundo en el carril derecho. Varios autos han danado sus llantas.',
    status: 'en-proceso',
    statusLabel: 'En proceso',
    statusTone: 'warning',
    createdAt: 'Hace 2 dias',
    supports: 14,
    imageUrl:
      'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'r2',
    title: 'Luminaria fundida reparada',
    description:
      'Luminaria del parque frente a la escuela no funciona desde hace semanas.',
    status: 'resuelto',
    statusLabel: 'Resuelto',
    statusTone: 'success',
    createdAt: 'Hace 1 semana',
    supports: 32,
    imageUrl:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'r3',
    title: 'Basura acumulada en esquina',
    description: 'El camion recolector no paso ayer y los perros estan rompiendo las bolsas.',
    status: 'confirmado',
    statusLabel: 'Confirmado',
    statusTone: 'secondary',
    createdAt: 'Hoy',
    supports: 3,
  },
]

export const recentNotifications: RecentNotificationItem[] = [
  {
    id: 'n1',
    title: 'Reporte resuelto! Tu reporte sobre "Luminaria fundida" ha sido marcado como resuelto por el municipio.',
    subtitle: 'Sistema de reportes',
    timeAgo: 'Hace 2 horas',
    tone: 'success',
  },
  {
    id: 'n2',
    title: '5 vecinos han apoyado tu reporte "Bache peligroso en la Av. Central".',
    subtitle: 'Interaccion vecinal',
    timeAgo: 'Ayer',
    tone: 'primary',
  },
  {
    id: 'n3',
    title: 'Actualizacion general: Habra corte de agua programado en tu zona manana a las 10:00 AM.',
    subtitle: 'Aviso comunitario',
    timeAgo: 'Hace 3 dias',
    tone: 'secondary',
  },
]
