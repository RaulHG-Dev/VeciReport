import { useEffect, useRef, useState } from 'react'
import L, { type Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import type { LeafletEvent } from 'leaflet'
import { cn } from '../../utils/cn'

interface LocationPickerMapProps {
  onLocationChange: (coordinates: { lat: number; lng: number }) => void
  value?: { lat: number; lng: number } | null
  className?: string
}

const defaultCenter: [number, number] = [19.4326, -99.1332]

const defaultMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const LocationPickerMap = ({ onLocationChange, value, className }: LocationPickerMapProps) => {
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null)
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(() => {
    return value ? [value.lat, value.lng] : defaultCenter
  })
  const [isLocating, setIsLocating] = useState(false)
  const [geolocationError, setGeolocationError] = useState('')

  const autoGpsLockedRef = useRef(false)
  const latestGpsRequestRef = useRef(0)

  useEffect(() => {
    if (value) {
      const isDifferent =
        Math.abs(value.lat - markerPosition[0]) > 0.000001 ||
        Math.abs(value.lng - markerPosition[1]) > 0.000001

      if (isDifferent) {
        const newPos: [number, number] = [value.lat, value.lng]
        setMarkerPosition(newPos)
        if (mapInstance) {
          mapInstance.setView(newPos, mapInstance.getZoom(), { animate: true })
        }
      }
    }
  }, [value, mapInstance, markerPosition])

  const updateMarkerPosition = (position: [number, number], source: 'gps' | 'manual') => {
    if (source === 'manual') {
      // Lock out delayed automatic GPS callbacks after manual reposition.
      autoGpsLockedRef.current = true
      latestGpsRequestRef.current += 1
    }

    setMarkerPosition(position)
    onLocationChange({ lat: position[0], lng: position[1] })
  }

  const askGpsLocation = (mode: 'auto' | 'manual') => {
    if (!navigator.geolocation) {
      setGeolocationError('Tu navegador no soporta geolocalizacion.')
      return
    }

    if (mode === 'manual') {
      autoGpsLockedRef.current = false
    }

    const requestId = latestGpsRequestRef.current + 1
    latestGpsRequestRef.current = requestId

    setIsLocating(true)
    setGeolocationError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (requestId !== latestGpsRequestRef.current) {
          return
        }

        if (mode === 'auto' && autoGpsLockedRef.current) {
          setIsLocating(false)
          return
        }

        const gpsPosition: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ]

        setMarkerPosition(gpsPosition)
        onLocationChange({ lat: gpsPosition[0], lng: gpsPosition[1] })

        if (mapInstance) {
          mapInstance.setView(gpsPosition, mapInstance.getZoom(), { animate: true })
        }

        setIsLocating(false)
      },
      () => {
        if (requestId !== latestGpsRequestRef.current) {
          return
        }

        setGeolocationError('No se pudo obtener tu ubicacion GPS. Puedes elegir un punto en el mapa.')
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    )
  }

  useEffect(() => {
    askGpsLocation('auto')
    // Run once on mount to request GPS permission and initialize marker location.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted">
          Mueve solo el marcador para ajustar la ubicacion exacta. El mapa no cambia el puntero.
        </p>
        <button
          type="button"
          onClick={() => askGpsLocation('manual')}
          className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-secondary transition hover:bg-secondary/5"
          disabled={isLocating}
        >
          {isLocating ? 'Ubicando...' : 'Usar mi GPS'}
        </button>
      </div>

      <div className="h-72 overflow-hidden rounded-xl border border-border bg-surface">
        <MapContainer
          center={defaultCenter}
          zoom={16}
          className="h-full w-full"
          scrollWheelZoom
          ref={setMapInstance}
        >
          <TileLayer
            attribution='VeciReport'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={markerPosition}
            icon={defaultMarkerIcon}
            draggable
            eventHandlers={{
              dragstart: () => {
                autoGpsLockedRef.current = true
                latestGpsRequestRef.current += 1
              },
              dragend: (event: LeafletEvent) => {
                const latLng = (event.target as L.Marker).getLatLng()
                updateMarkerPosition([latLng.lat, latLng.lng], 'manual')
              },
            }}
          />
        </MapContainer>
      </div>

      {geolocationError && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          {geolocationError}
        </p>
      )}

      <p className="text-xs font-medium text-muted">
        Coordenada actual: {markerPosition[0].toFixed(5)}, {markerPosition[1].toFixed(5)}
      </p>
    </div>
  )
}
