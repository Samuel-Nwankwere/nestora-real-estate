import { Link } from 'react-router-dom'
import { Bath, BedDouble, Box, Heart, MapPin, Maximize } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { img, naira } from '../data/listings'

export function StatusBadge({ mode, className = '' }) {
  return mode === 'rent'
    ? <span className={`inline-flex h-7 items-center rounded-lg bg-rent px-2.5 text-xs font-bold text-rent-ink ${className}`}>For rent</span>
    : <span className={`inline-flex h-7 items-center rounded-lg bg-white px-2.5 text-xs font-bold text-brand-dark ${className}`}>For sale</span>
}

export function SaveButton({ listing, className = '' }) {
  const { isSaved, toggleSaved } = useApp()
  const saved = isSaved(listing.id)
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(listing.id, listing.title) }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${listing.title} from saved homes` : `Save ${listing.title}`}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm backdrop-blur transition hover:scale-105 ${className}`}
    >
      <Heart size={19} strokeWidth={1.8} className={saved ? 'fill-heart text-heart' : ''} aria-hidden="true" />
    </button>
  )
}

export default function ListingCard({ listing, compact = false, active = false, onHover }) {
  const l = listing
  return (
    <article
      onMouseEnter={onHover ? () => onHover(l.id) : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-[22px] border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] ${active ? 'border-brand ring-4 ring-brand-tint' : 'border-line'}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-soft">
        <img src={img(l.image, compact ? 600 : 800)} alt={`${l.title}, ${l.area}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute left-3.5 top-3.5 flex gap-1.5">
          <StatusBadge mode={l.mode} />
          {l.tour && <span className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-ink/80 px-2.5 text-xs font-semibold text-white backdrop-blur"><Box size={13} aria-hidden="true" />3D tour</span>}
        </div>
        <SaveButton listing={l} className="absolute right-2.5 top-2.5 z-10" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-[22px] font-extrabold tracking-tight sm:text-2xl">{naira(l.price)}</span>
          {l.mode === 'rent' && <span className="text-sm text-muted">/ year</span>}
        </p>
        <div>
          <h3 className="text-[17px] font-bold leading-snug">
            {/* stretched link: whole card is clickable, but the save button stays separate */}
            <Link to={`/property/${l.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[22px] focus-visible:after:ring-2 focus-visible:after:ring-brand">
              {l.title}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} aria-hidden="true" />{l.area}, Lagos</p>
        </div>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-[#EEF2F1] pt-3 text-sm text-ink-soft" aria-label="Key facts">
          <li className="flex items-center gap-1.5"><BedDouble size={17} strokeWidth={1.8} className="text-brand" aria-hidden="true" />{l.beds} beds</li>
          <li className="flex items-center gap-1.5"><Bath size={17} strokeWidth={1.8} className="text-brand" aria-hidden="true" />{l.baths} baths</li>
          <li className="flex items-center gap-1.5"><Maximize size={16} strokeWidth={1.8} className="text-brand" aria-hidden="true" />{l.size} m²</li>
        </ul>
      </div>
    </article>
  )
}
