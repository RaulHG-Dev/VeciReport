import type { Dispatch, SetStateAction } from 'react'

export type Step = 1 | 2 | 3

export type CategoryId = 'road' | 'light' | 'trash' | 'water' | 'trees' | 'other'

export interface ReportDraft {
  categoryId: CategoryId
  title: string
  description: string
  addressLabel: string
  location: { lat: number; lng: number } | null
  references: string
  anonymous: boolean
}

export interface DraftImage {
  file: File
  previewUrl: string
}

export type SetDraft = Dispatch<SetStateAction<ReportDraft>>
