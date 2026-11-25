import { Link } from 'react-router-dom'
import Logo from './Logo'

const cols = [
  { title: 'Explore', links: [['Buy a home', '/search?mode=buy'], ['Rent a home', '/search?mode=rent'], ['Sell your property', '/#sell'], ['Mortgage calculator', '/#mortgage']] },
  { title: 'Popular areas', links: [['Ikoyi', '/search?mode=buy&area=Ikoyi'], ['Lekki Phase 1', '/search?mode=buy&area=Lekki+Phase+1'], ['Victoria Island', '/search?mode=rent&area=Victoria+Island'], ['Ikeja GRA', '/search?mode=buy&area=Ikeja+GRA']] },
  { title: 'Company', links: [['About', '/'], ['Agents', '/#agents'], ['Careers', '/'], ['Contact', '/']] },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">Verified homes for sale and rent across Lagos — from Ikoyi to Ikeja.</p>
          <p className="text-sm text-muted">12 Admiralty Way, Lekki Phase 1, Lagos</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.08em] text-muted">{c.title}</h2>
            {c.links.map(([label, to]) => (
              <Link key={label} to={to} className="w-fit text-sm text-ink hover:text-brand">{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Nestora. Concept project — all listings are fictional.</span>
        <span>Photos via Unsplash · Map © OpenStreetMap contributors</span>
      </div>
    </footer>
  )
}
