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

export interface LocationGPS {
    place_id:     number;
    licence:      string;
    osm_type:     string;
    osm_id:       number;
    lat:          string;
    lon:          string;
    category:     string;
    type:         string;
    place_rank:   number;
    importance:   number;
    addresstype:  string;
    name:         string;
    display_name: string;
    address:      Address;
    boundingbox:  string[];
}

export interface Address {
    road:             string;
    neighbourhood:    string;
    city:             string;
    county:           string;
    state:            string;
    "ISO3166-2-lvl4": string;
    postcode:         string;
    country:          string;
    country_code:     string;
}