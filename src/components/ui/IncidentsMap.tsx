import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { mapIncidents } from '../../services/map.mock'
import { cn } from '../../utils/cn'

const defaultMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const statusStyles = {
  Nuevo: 'bg-secondary/10 text-secondary',
  'En proceso': 'bg-amber-100 text-amber-700',
  Resuelto: 'bg-emerald-100 text-emerald-700',
}

export const IncidentsMap = () => (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-tertiary lg:text-4xl">Mapa de reportes</h2>
      <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
        {mapIncidents.length} incidentes
      </span>
    </div>

    <div className="h-[60vh] min-h-105 overflow-hidden rounded-2xl border border-border bg-surface shadow-card lg:h-[72vh]">
      <MapContainer center={[19.4326, -99.1332]} zoom={14} className="h-full w-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapIncidents.map((incident) => (
          <Marker key={incident.id} position={incident.position} icon={defaultMarkerIcon}>
            <Popup>
              <div className="min-w-56 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-800">{incident.title}</h3>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      statusStyles[incident.status],
                    )}
                  >
                    {incident.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{incident.category}</p>
                <p className="text-xs text-slate-600">{incident.address}</p>
                <p className="text-[11px] font-medium text-slate-500">{incident.updatedAt}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </section>
)
