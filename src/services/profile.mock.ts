export const profileSummary = {
  fullName: 'Ana Martinez',
  username: '@ana.vecina',
  neighborhood: 'Barrio San Rafael',
  email: 'ana.martinez@email.com',
  phone: '+52 55 1234 5678',
  joinedAt: 'Miembro desde 2024',
  avatarUrl:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=180&q=80',
}

export const profileStats = [
  { id: 'reports', label: 'Reportes enviados', value: 18 },
  { id: 'resolved', label: 'Reportes resueltos', value: 9 },
  { id: 'supports', label: 'Apoyos recibidos', value: 47 },
]

export const profileSettings = [
  { id: 'push', label: 'Notificaciones push', enabled: true },
  { id: 'email', label: 'Alertas por correo', enabled: true },
  { id: 'privacy', label: 'Perfil visible a vecinos', enabled: false },
]

export const securitySessions = [
  { id: 's1', device: 'Chrome - Windows', location: 'Ciudad de Mexico', status: 'Activa' },
  { id: 's2', device: 'Safari - iPhone', location: 'Ciudad de Mexico', status: 'Hace 2 dias' },
]

export const recentProfileActivity = [
  { id: 'a1', title: 'Actualizaste tu foto de perfil', time: 'Hace 3 dias' },
  { id: 'a2', title: 'Cambiaste tu numero telefonico', time: 'Hace 1 semana' },
  { id: 'a3', title: 'Activaste notificaciones push', time: 'Hace 2 semanas' },
]
