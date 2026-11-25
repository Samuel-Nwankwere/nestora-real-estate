import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight sm:text-[22px] ${light ? 'text-white' : 'text-ink'}`} aria-label="Nestora home">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" />
        </svg>
      </span>
      Nestora
    </Link>
  )
}
