import type { MapIncident } from '../types/map'

export const mapIncidents: MapIncident[] = [
  {
    id: 'inc-1',
    title: 'Bache profundo',
    status: 'Nuevo',
    category: 'Bache',
    position: [19.4326, -99.1332],
    address: 'Av. Principal 123',
    updatedAt: 'Hace 2 horas',
  },
  {
    id: 'inc-2',
    title: 'Luminaria fundida',
    status: 'En proceso',
    category: 'Alumbrado',
    position: [19.4343, -99.129],
    address: 'Calle Los Pinos 45',
    updatedAt: 'Ayer',
  },
  {
    id: 'inc-3',
    title: 'Fuga de agua',
    status: 'Resuelto',
    category: 'Agua',
    position: [19.4297, -99.1365],
    address: 'C. 8, colonia centro',
    updatedAt: 'Hace 1 dia',
  },
]
