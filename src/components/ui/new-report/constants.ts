import type { ComponentType } from 'react'

import { RoadIcon, SparkIcon, TrashIcon, TreeIcon, WaterIcon } from '../Icons'
import type { CategoryId, ReportDraft } from './types'

interface IconProps {
  className?: string
}

interface CategoryOption {
  id: CategoryId
  label: string
  icon: ComponentType<IconProps> | null
}

export const steps = [
  { id: 1, label: 'Categoria' },
  { id: 2, label: 'Detalles' },
  { id: 3, label: 'Revision' },
] as const

export const categories: CategoryOption[] = [
  { id: 'road', label: 'Bache en Via', icon: RoadIcon },
  { id: 'light', label: 'Alumbrado Publico', icon: SparkIcon },
  { id: 'trash', label: 'Basura Acumulada', icon: TrashIcon },
  { id: 'water', label: 'Fuga de Agua', icon: WaterIcon },
  { id: 'trees', label: 'Parques y Jardines', icon: TreeIcon },
  { id: 'other', label: 'Otro', icon: null },
]

export const initialDraft: ReportDraft = {
  categoryId: 'road',
  title: '',
  description: '',
  addressLabel: '',
  location: null,
  references: '',
  anonymous: false,
}
