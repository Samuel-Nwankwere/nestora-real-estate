import { lazy, Suspense, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, KeyRound, LayoutGrid, Map, MessageCircle, Phone, Search, Star } from 'lucide-react'
import ListingCard from '../components/ListingCard'
import SectionHeader from '../components/SectionHeader'
import Segmented from '../components/Segmented'
import MortgageCalculator from '../components/MortgageCalculator'
import { agents, areas, img, listings, naira, shortNaira } from '../data/listings'

const ListingsMap = lazy(() => import('../components/ListingsMap'))

/* ---------- Highlights ---------- */
export function Highlights() {
  const items = [
    ['12k+', 'Verified homes for sale & rent'],
    ['3D', 'Virtual tours on most listings'],
    ['850', 'Licensed Lagos agents'],
    ['24h', 'Average time to book a viewing'],
  ]
  return (
    <section className="container-x pt-6 sm:pt-8" aria-label="Why Nestora">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map(([n, t]) => (
          <li key={t} className="flex flex-col gap-1 rounded-[18px] border border-line px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
            <span className="font-display text-2xl font-extrabold text-brand sm:text-[28px]">{n}</span>
            <span className="text-[13px] leading-snug text-muted sm:text-sm">{t}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------- Featured listings (grid / map) ---------- */
export function FeaturedListings() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('grid')
  const list = useMemo(() => listings.filter((l) => l.featured || view === 'map').filter((l) => filter === 'all' || l.mode === filter), [filter, view])
  const [activeId, setActiveId] = useState(list[0]?.id)
  const active = list.find((l) => l.id === activeId) ?? list[0]

  return (
    <section id="listings" className="container-x scroll-mt-24 py-16 sm:py-24">
      <SectionHeader eyebrow="Featured listings" title="Homes you’ll love this week"
        action={
          <div className="flex flex-wrap gap-2">
            <Segmented label="Filter listings" value={filter} onChange={setFilter}
              options={[{ value: 'all', label: 'All' }, { value: 'buy', label: 'For sale' }, { value: 'rent', label: 'For rent' }]} />
            <Segmented label="View" value={view} onChange={setView}
              options={[{ value: 'grid', label: 'Grid', icon: LayoutGrid }, { value: 'map', label: 'Map', icon: Map }]} />
          </div>
        } />

      {view === 'grid' ? (
        <div key={filter} className="animate-fade-in grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {list.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
          <ul className="no-scrollbar order-2 flex gap-3 overflow-x-auto lg:order-1 lg:max-h-[600px] lg:flex-col lg:overflow-y-auto lg:pr-1">
            {list.map((l) => (
              <li key={l.id} className="w-[280px] shrink-0 lg:w-auto">
                <button onClick={() => setActiveId(l.id)} aria-pressed={active?.id === l.id}
                  className={`flex w-full items-center gap-3.5 rounded-[18px] border bg-white p-2.5 text-left transition ${active?.id === l.id ? 'border-brand ring-4 ring-brand-tint' : 'border-line hover:border-line-strong'}`}>
                  <img src={img(l.image, 300)} alt="" className="h-[84px] w-[108px] shrink-0 rounded-xl object-cover" />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-display text-[17px] font-extrabold">{shortNaira(l.price)}{l.mode === 'rent' && <span className="font-sans text-xs font-normal text-muted"> / yr</span>}</span>
                    <span className="truncate text-sm font-semibold">{l.title}</span>
                    <span className="text-[13px] text-muted">{l.beds} bd · {l.baths} ba · {l.area}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="relative order-1 lg:order-2">
            <Suspense fallback={<div className="h-[440px] animate-pulse rounded-[22px] bg-soft lg:h-[600px]" />}>
              <ListingsMap listings={list} activeId={active?.id} onSelect={setActiveId} className="h-[440px] lg:h-[600px]" />
            </Suspense>
            {active && (
              <Link to={`/property/${active.id}`} className="absolute bottom-4 left-4 right-4 z-[500] flex max-w-sm gap-3 rounded-[18px] bg-white p-3 shadow-[var(--shadow-pop)] transition hover:ring-2 hover:ring-brand">
                <img src={img(active.image, 300)} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-display text-lg font-extrabold">{naira(active.price)}</span>
                  <span className="truncate text-sm font-semibold">{active.title}</span>
                  <span className="flex items-center gap-1 text-[13px] font-semibold text-brand">View details <ArrowRight size={14} /></span>
                </span>
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link to="/search?mode=buy" className="btn-outline h-12 px-7">Browse all homes <ArrowRight size={16} /></Link>
      </div>
    </section>
  )
}

/* ---------- Neighbourhoods ---------- */
export function Neighbourhoods() {
  const featured = ['Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Ikeja GRA'].map((name) => {
    const a = areas.find((x) => x.name === name)
    const homes = listings.filter((l) => l.area === name)
    const sale = homes.filter((l) => l.mode === 'buy').map((l) => l.price)
    const rent = homes.filter((l) => l.mode === 'rent').map((l) => l.price)
    return { ...a, count: homes.length, from: sale.length ? `From ${shortNaira(Math.min(...sale))}` : rent.length ? `Rent from ${shortNaira(Math.min(...rent))}/yr` : '', mode: sale.length ? 'buy' : 'rent' }
  })
  return (
    <section className="bg-soft">
      <div className="container-x py-16 sm:py-24">
        <SectionHeader eyebrow="Neighbourhoods" title="Explore Lagos by neighbourhood"
          action={<Link to="/search?mode=buy" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:text-brand-dark">See all areas <ArrowRight size={16} /></Link>} />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((a) => (
            <Link key={a.name} to={`/search?mode=${a.mode}&area=${encodeURIComponent(a.name)}`} className="group relative block h-56 overflow-hidden rounded-[20px] text-white sm:h-80 sm:rounded-[22px]">
              <img src={img(a.image, 700)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-2 bottom-2 flex flex-col gap-0.5 rounded-2xl bg-[#091422]/65 p-3 backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:flex-row sm:items-end sm:justify-between sm:p-4">
                <span>
                  <span className="block font-display text-base font-bold sm:text-xl">{a.name}</span>
                  <span className="text-xs opacity-90 sm:text-[13px]">{a.count} {a.count === 1 ? 'listing' : 'listings'}</span>
                </span>
                <span className="text-xs font-semibold sm:text-[13px]">{a.from}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Mortgage ---------- */
export function MortgageSection() {
  return (
    <section id="mortgage" className="container-x scroll-mt-24 py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <p className="eyebrow">Mortgage calculator</p>
          <h2 className="text-[28px] font-extrabold leading-tight sm:text-4xl lg:text-[44px]">Know what you can afford before you fall in love.</h2>
          <p className="text-[17px] leading-relaxed text-muted">Adjust the price, equity contribution and rate to see an estimated monthly repayment. Compare offers from Nigerian banks and mortgage lenders in minutes.</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button className="btn-primary h-12 px-6">Get pre-qualified</button>
            <button className="btn-outline h-12 px-6">Compare lenders</button>
          </div>
        </div>
        <MortgageCalculator />
      </div>
    </section>
  )
}

/* ---------- How it works ---------- */
export function HowItWorks() {
  const steps = [
    [Search, 'Search & save', 'Filter by area, price and size. Save favourites and get alerts when new homes match.'],
    [CalendarCheck, 'Tour in person or 3D', 'Book a viewing in two taps, or walk through the home virtually from anywhere.'],
    [KeyRound, 'Offer & move in', 'Make an offer with your agent, verify the title documents and track every step to your keys.'],
  ]
  return (
    <section className="bg-soft">
      <div className="container-x py-16 sm:py-24">
        <SectionHeader center eyebrow="How it works" title="From search to keys in three steps" />
        <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map(([Icon, title, text], i) => (
            <li key={title} className="flex flex-col gap-3.5 rounded-[22px] bg-white p-6 sm:p-8">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-brand-tint text-brand"><Icon size={24} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className="text-[13px] font-bold text-muted">STEP 0{i + 1}</span>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Agents ---------- */
export function Agents() {
  return (
    <section id="agents" className="container-x scroll-mt-24 py-16 sm:py-24">
      <SectionHeader eyebrow="Top agents" title="Work with local experts"
        action={<a href="#agents" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:text-brand-dark">Find an agent <ArrowRight size={16} /></a>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {agents.map((a) => (
          <article key={a.id} className="flex flex-col gap-4 rounded-[22px] border border-line p-5 transition hover:shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3.5">
              <img src={img(a.photo, 200)} alt="" loading="lazy" className="h-16 w-16 rounded-full object-cover" />
              <div>
                <h3 className="text-[17px] font-bold">{a.name}</h3>
                <p className="text-[13px] text-muted">{a.area}</p>
              </div>
            </div>
            <dl className="flex justify-between rounded-[14px] bg-soft px-4 py-3 text-[13px]">
              <div className="flex items-center gap-1.5"><Star size={15} className="fill-[#F5A524] text-[#F5A524]" aria-hidden="true" /><dt className="sr-only">Rating</dt><dd><strong className="text-[15px]">{a.rating.toFixed(1)}</strong> <span className="text-muted">rating</span></dd></div>
              <div><dt className="sr-only">Homes sold</dt><dd><strong className="text-[15px]">{a.sold}</strong> <span className="text-muted">homes sold</span></dd></div>
            </dl>
            <div className="flex gap-2">
              <a href={`https://wa.me/${a.phone.replace(/\D/g, '')}`} className="btn-primary flex-1"><MessageCircle size={16} aria-hidden="true" />WhatsApp</a>
              <a href={`tel:${a.phone.replace(/\s/g, '')}`} aria-label={`Call ${a.name}`} className="btn-outline w-11 px-0"><Phone size={17} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Sell CTA ---------- */
export function SellCta() {
  const [address, setAddress] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section id="sell" className="container-x scroll-mt-24 pb-16 sm:pb-24">
      <div className="grid overflow-hidden rounded-[24px] bg-ink text-white sm:rounded-[28px] lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-5 p-7 sm:p-12 lg:p-16">
          <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-mint">Selling a home?</p>
          <h2 className="text-[28px] font-extrabold leading-tight sm:text-4xl lg:text-[44px]">Get a free, instant valuation.</h2>
          <p className="text-[17px] leading-relaxed text-[#B7C3CF]">See what your Lagos property is worth based on recent sales nearby, then list it with a verified agent.</p>
          {sent ? (
            <p className="animate-fade-up rounded-2xl bg-white/10 p-4 text-[15px]" role="status">Thanks! An agent will send your valuation for <strong>{address}</strong> within 24 hours.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (address.trim()) setSent(true) }} className="flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor="valuation-address" className="sr-only">Your property address</label>
              <input id="valuation-address" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="e.g. 5 Admiralty Way, Lekki" className="input-base h-[54px] flex-1 border-transparent" />
              <button className="btn-primary h-[54px] px-6 text-[15px]">Get valuation</button>
            </form>
          )}
        </div>
        <div className="relative min-h-[260px] sm:min-h-[340px]">
          <img src={img('1600210492486-724fe5c67fb0', 1100)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
