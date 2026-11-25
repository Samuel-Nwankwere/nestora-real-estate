import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { pinLabel } from '../data/listings'

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) map.setView(points[0], 15)
    else map.fitBounds(points, { padding: [48, 48], maxZoom: 14 })
  }, [map, points])
  return null
}

function FlyTo({ point }) {
  const map = useMap()
  useEffect(() => { if (point) map.panTo(point, { animate: true }) }, [map, point])
  return null
}

const tiles = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

/** Price-pin map of listings. Pins are keyboard-focusable buttons (Leaflet markers with keyboard: true). */
export default function ListingsMap({ listings, activeId, onSelect, className = '' }) {
  const points = useMemo(() => listings.map((l) => [l.lat, l.lng]), [listings])
  const active = listings.find((l) => l.id === activeId)

  return (
    <div className={`relative isolate overflow-hidden rounded-[22px] border border-line ${className}`}>
      <MapContainer center={[6.47, 3.43]} zoom={12} scrollWheelZoom={false} className="h-full w-full" aria-label="Map of listings">
        <TileLayer url={tiles} attribution={attribution} />
        <FitBounds points={points} />
        {active && <FlyTo point={[active.lat, active.lng]} />}
        {listings.map((l) => (
          <Marker
            key={l.id}
            position={[l.lat, l.lng]}
            title={`${l.title}, ${pinLabel(l)}`}
            alt={`${l.title}, ${pinLabel(l)}`}
            zIndexOffset={l.id === activeId ? 1000 : 0}
            eventHandlers={{ click: () => onSelect?.(l.id), keypress: (e) => e.originalEvent.key === 'Enter' && onSelect?.(l.id) }}
            icon={L.divIcon({ className: 'price-pin-wrap', html: `<span class="price-pin ${l.id === activeId ? 'is-active' : ''}">${pinLabel(l)}</span>`, iconSize: [0, 0] })}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export function SingleMap({ listing, className = '' }) {
  return (
    <div className={`relative isolate overflow-hidden rounded-[22px] border border-line ${className}`}>
      <MapContainer center={[listing.lat, listing.lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full" aria-label={`Map showing ${listing.title}`}>
        <TileLayer url={tiles} attribution={attribution} />
        <Marker position={[listing.lat, listing.lng]} title={listing.title} alt={listing.title}
          icon={L.divIcon({ className: 'price-pin-wrap', iconSize: [0, 0], html: '<span class="home-pin"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg></span>' })} />
      </MapContainer>
    </div>
  )
}
