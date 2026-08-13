export interface MapIncident {
  id: string
  title: string
  status: 'Nuevo' | 'En proceso' | 'Resuelto'
  category: 'Bache' | 'Alumbrado' | 'Agua'
  position: [number, number]
  address: string
  updatedAt: string
}
