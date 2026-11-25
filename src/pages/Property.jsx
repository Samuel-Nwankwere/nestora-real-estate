import { lazy, Suspense, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CalendarDays, Check, CheckCircle2, Droplets, Grid2x2, MapPin, MessageCircle, Phone, Share2, Star, Video, Users } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import ListingCard, { SaveButton, StatusBadge } from '../components/ListingCard'
import Lightbox from '../components/Lightbox'
import Segmented from '../components/Segmented'
import Dropdown from '../components/Dropdown'
import { getAgent, getListing, img, listings, monthlyRepayment, naira, shortNaira } from '../data/listings'
import { useApp } from '../context/AppContext'
import NotFound from './NotFound'

const SingleMap = lazy(() => import('../components/ListingsMap').then((m) => ({ default: m.SingleMap })))

function nextDays(n = 7) {
  const out = []
  const d = new Date()
  for (let i = 1; out.length < n; i++) {
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i)
    out.push({ key: day.toISOString().slice(0, 10), dow: day.toLocaleDateString('en-GB', { weekday: 'short' }), date: day.getDate(), month: day.toLocaleDateString('en-GB', { month: 'short' }) })
  }
  return out
}
const times = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30']

function TourBooking({ listing, agent }) {
  const days = useMemo(() => nextDays(7), [])
  const [kind, setKind] = useState('person')
  const [day, setDay] = useState(days[1].key)
  const [time, setTime] = useState('13:30')
  const [people, setPeople] = useState('1')
  const [done, setDone] = useState(false)
  const chosen = days.find((d) => d.key === day)

  if (done) {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-3 rounded-2xl bg-brand-tint p-6 text-center" role="status">
        <CheckCircle2 size={36} className="text-brand" aria-hidden="true" />
        <p className="font-display text-lg font-bold">Tour requested</p>
        <p className="text-sm text-ink-soft">{kind === 'person' ? 'In-person' : 'Video'} tour on {chosen.dow} {chosen.date} {chosen.month} at {time}. {agent.name.split(' ')[0]} will confirm on WhatsApp shortly.</p>
        <button onClick={() => setDone(false)} className="mt-1 text-sm font-semibold text-brand underline underline-offset-4">Change booking</button>
      </div>
    )
  }

  return (
    <form id="tour" onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-lg font-bold">Schedule a tour</h2>
      <Segmented label="Tour type" value={kind} onChange={setKind} className="w-full"
        options={[{ value: 'person', label: 'In person', icon: Users }, { value: 'video', label: 'Video tour', icon: Video }]} />
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold">Pick a date</legend>
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {days.map((d) => (
            <label key={d.key} className={`relative flex h-[72px] w-[62px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${day === d.key ? 'border-2 border-brand bg-brand-tint text-brand-dark' : 'border-line-strong hover:border-ink'}`}>
              <input type="radio" name="day" value={d.key} checked={day === d.key} onChange={() => setDay(d.key)} className="sr-only" />
              <span className="text-xs">{d.dow}</span>
              <span className="text-lg font-bold leading-tight">{d.date}</span>
              <span className="text-[11px] text-muted">{d.month}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold">Pick a time</legend>
        <div className="grid grid-cols-3 gap-2">
          {times.map((t) => (
            <label key={t} className={`relative flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${time === t ? 'border-2 border-brand bg-brand-tint font-semibold text-brand-dark' : 'border-line-strong hover:border-ink'}`}>
              <input type="radio" name="time" value={t} checked={time === t} onChange={() => setTime(t)} className="sr-only" />{t}
            </label>
          ))}
        </div>
      </fieldset>
      {kind === 'person' && (
        <Dropdown label="Number of people" value={people} onChange={setPeople} className="[&>button]:w-full"
          options={[1, 2, 3, 4].map((n) => ({ value: String(n), label: `${n} ${n === 1 ? 'person' : 'people'} attending` }))} />
      )}
      <button type="submit" className="btn-primary h-[54px] text-[15px]"><CalendarDays size={18} aria-hidden="true" />Request tour · {chosen.dow} {chosen.date}, {time}</button>
      <p className="text-center text-xs text-muted">Free to book · No obligation</p>
    </form>
  )
}

export default function Property() {
  const { id } = useParams()
  const listing = getListing(id)
  const [lightbox, setLightbox] = useState(null)
  const { notify } = useApp()
  if (!listing) return <NotFound />
  const l = listing
  const agent = getAgent(l.agentId)
  const est = monthlyRepayment(l.price, 30, 18, 20).monthly
  const similar = listings.filter((x) => x.id !== l.id && (x.area === l.area || x.mode === l.mode)).slice(0, 3)

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: l.title, url: location.href })
      else { await navigator.clipboard.writeText(location.href); notify('Link copied to clipboard') }
    } catch { /* cancelled */ }
  }

  const facts = [
    ['Bedrooms', l.beds], ['Bathrooms', l.baths], ['Living area', `${l.size} m²`],
    ['Plot size', l.plot ? `${l.plot.toLocaleString()} m²` : '—'], ['Title', l.title_doc], ['Built', l.year],
  ]

  return (
    <div className="pb-28 lg:pb-0">
      <div className="container-x pt-3 sm:pt-6">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: l.mode === 'rent' ? 'Rent' : 'Buy', to: `/search?mode=${l.mode}` },
          { label: 'Lagos', to: `/search?mode=${l.mode}` },
          { label: l.area, to: `/search?mode=${l.mode}&area=${encodeURIComponent(l.area)}` },
          { label: l.title },
        ]} />

        {/* Gallery */}
        <div className="relative mt-3 sm:mt-4">
          <div className="grid h-[300px] grid-cols-1 gap-2.5 overflow-hidden rounded-[20px] sm:h-[420px] sm:grid-cols-[2fr_1fr] sm:grid-rows-2 sm:rounded-[26px] lg:h-[520px] lg:grid-cols-[2fr_1fr_1fr]">
            {l.gallery.map((g, i) => (
              <button key={g + i} onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1} of ${l.gallery.length}`}
                className={`group relative overflow-hidden bg-soft ${i === 0 ? 'sm:row-span-2' : i <= 2 ? 'hidden sm:block' : 'hidden lg:block'}`}>
                <img src={img(g, i === 0 ? 1400 : 700)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between sm:inset-x-4 sm:top-4">
            <div className="flex gap-1.5"><StatusBadge mode={l.mode} />{l.tour && <span className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-ink/80 px-2.5 text-xs font-semibold text-white"><Box size={13} aria-hidden="true" />3D tour</span>}</div>
            <div className="pointer-events-auto flex gap-2">
              <button onClick={share} aria-label="Share this home" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-sm hover:scale-105"><Share2 size={18} /></button>
              <SaveButton listing={l} />
            </div>
          </div>
          <button onClick={() => setLightbox(0)} className="btn absolute bottom-3 right-3 bg-white text-ink shadow-md hover:bg-soft sm:bottom-4 sm:right-4">
            <Grid2x2 size={16} aria-hidden="true" /> {l.gallery.length} photos
          </button>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-10">
            <header className="flex flex-col gap-3">
              <h1 className="text-[30px] font-extrabold leading-tight sm:text-[44px]">{l.title}</h1>
              <p className="flex items-center gap-2 text-muted"><MapPin size={16} aria-hidden="true" />{l.address}, {l.area}, Lagos</p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:hidden">
                <span className="font-display text-[28px] font-extrabold">{naira(l.price)}</span>
                {l.mode === 'rent' ? <span className="text-muted">per year</span> : <span className="text-sm font-semibold text-brand-dark">Est. {shortNaira(est)}/mo</span>}
              </div>
            </header>

            <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line p-4">
                  <dt className="text-[13px] text-muted">{k}</dt>
                  <dd className="mt-0.5 font-display text-lg font-extrabold leading-tight">{v}</dd>
                </div>
              ))}
            </dl>

            <section className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">About this home</h2>
              <p className="max-w-3xl text-[16px] leading-[1.75] text-ink-soft">{l.description}</p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {l.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-[15px]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-tint text-brand"><Check size={17} strokeWidth={2.2} aria-hidden="true" /></span>{a}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-bold">Location &amp; nearby</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-sm"><Droplets size={15} className="text-brand" aria-hidden="true" />Flood risk: <strong>{l.flood}</strong></span>
              </div>
              <Suspense fallback={<div className="h-[320px] animate-pulse rounded-[22px] bg-soft" />}>
                <SingleMap listing={l} className="h-[280px] sm:h-[340px]" />
              </Suspense>
              <ul className="grid gap-2.5 sm:grid-cols-3">
                {l.nearby.map(([name, kind, dist]) => (
                  <li key={name} className="rounded-2xl bg-soft px-4 py-3.5">
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-muted">{kind} · {dist}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-5 rounded-[24px] border border-line p-5 shadow-[0_20px_50px_rgba(15,27,45,0.07)] sm:p-6">
              <div className="hidden lg:block">
                <p className="text-sm text-muted">{l.mode === 'rent' ? 'Annual rent' : 'Asking price'}</p>
                <p className="font-display text-[34px] font-extrabold tracking-tight">{naira(l.price)}</p>
                {l.mode === 'buy' && <p className="text-sm font-semibold text-brand-dark">Est. {naira(est)}/mo · 30% equity, 18% over 20 yrs</p>}
              </div>
              <div className="hidden h-px bg-[#EEF2F1] lg:block" />
              <TourBooking listing={l} agent={agent} />
            </div>
            <div className="flex items-center gap-3.5 rounded-[24px] border border-line p-4 sm:p-5">
              <img src={img(agent.photo, 200)} alt="" className="h-14 w-14 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{agent.name}</p>
                <p className="flex items-center gap-1 text-[13px] text-muted"><Star size={13} className="fill-[#F5A524] text-[#F5A524]" aria-hidden="true" />{agent.rating.toFixed(1)} · Listing agent</p>
              </div>
              <a href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} aria-label={`Message ${agent.name} on WhatsApp`} className="btn-outline w-11 px-0"><MessageCircle size={18} /></a>
              <a href={`tel:${agent.phone.replace(/\s/g, '')}`} aria-label={`Call ${agent.name}`} className="btn-outline w-11 px-0"><Phone size={18} /></a>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="bg-soft">
          <div className="container-x py-14 sm:py-20">
            <h2 className="mb-8 text-[28px] font-extrabold sm:text-4xl">Similar homes</h2>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {similar.map((s) => <ListingCard key={s.id} listing={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(15,27,45,0.06)] backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-extrabold leading-tight">{shortNaira(l.price)}{l.mode === 'rent' && <span className="font-sans text-sm font-normal text-muted"> / yr</span>}</p>
          <p className="truncate text-xs text-muted">{l.beds} beds · {l.size} m²</p>
        </div>
        <a href={`tel:${agent.phone.replace(/\s/g, '')}`} aria-label={`Call ${agent.name}`} className="btn-outline h-12 w-12 px-0"><Phone size={19} /></a>
        <a href="#tour" className="btn-primary h-12 px-5">Request tour</a>
      </div>

      {lightbox !== null && <Lightbox images={l.gallery} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} title={l.title} />}
    </div>
  )
}
