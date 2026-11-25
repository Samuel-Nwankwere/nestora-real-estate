import { lazy, Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpDown, LayoutGrid, Map, SearchX, SlidersHorizontal, X } from 'lucide-react'
import Dropdown from '../components/Dropdown'
import LocationInput from '../components/LocationInput'
import ListingCard from '../components/ListingCard'
import Segmented from '../components/Segmented'
import { bedOptions, filterListings, priceRanges, sortOptions, typeOptions } from '../data/listings'

const ListingsMap = lazy(() => import('../components/ListingsMap'))

export default function Search() {
  const [params, setParams] = useSearchParams()
  const mode = params.get('mode') === 'rent' ? 'rent' : 'buy'
  const area = params.get('area') ?? ''
  const type = params.get('type') ?? 'any'
  const price = params.get('price') ?? 'any'
  const beds = params.get('beds') ?? 'any'
  const sort = params.get('sort') ?? 'recommended'
  const view = params.get('view') ?? 'grid'
  const [activeId, setActiveId] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const set = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      if (!v || v === 'any' || (k === 'sort' && v === 'recommended') || (k === 'view' && v === 'grid')) next.delete(k)
      else next.set(k, v)
    })
    setParams(next, { replace: true })
  }

  const results = useMemo(() => filterListings({ mode, area, type, price, beds, sort }), [mode, area, type, price, beds, sort])
  const activeFilters = [area && 'area', type !== 'any' && 'type', price !== 'any' && 'price', beds !== 'any' && 'beds'].filter(Boolean).length
  const clear = () => setParams(new URLSearchParams({ mode }), { replace: true })

  return (
    <div>
      <section className="border-b border-line bg-soft">
        <div className="container-x py-8 sm:py-10">
          <h1 className="text-[30px] font-extrabold sm:text-[40px]">
            {mode === 'rent' ? 'Homes for rent' : 'Homes for sale'} in {area || 'Lagos'}
          </h1>
          <p className="mt-1 text-muted" aria-live="polite">{results.length} {results.length === 1 ? 'home' : 'homes'} found</p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur sm:top-[76px]">
        <div className="container-x flex flex-col gap-3 py-3">
          <div className="flex items-center gap-2">
            <Segmented label="Buy or rent" value={mode} onChange={(m) => set({ mode: m, price: 'any' })}
              options={[{ value: 'buy', label: 'Buy' }, { value: 'rent', label: 'Rent' }]} />
            <LocationInput variant="pill" value={area} onChange={(v) => set({ area: v })} className="min-w-0 flex-1 lg:max-w-xs" />
            <button onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen} aria-controls="filter-panel" aria-label={`Filters${activeFilters ? `, ${activeFilters} active` : ''}`}
              className="btn-outline relative shrink-0 px-3.5 lg:hidden">
              <SlidersHorizontal size={17} aria-hidden="true" /><span className="hidden sm:inline">Filters</span>
              {activeFilters > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">{activeFilters}</span>}
            </button>
            <div className="hidden flex-1 items-center gap-2 lg:flex">
              <Dropdown label="Property type" value={type} onChange={(v) => set({ type: v })} options={typeOptions} />
              <Dropdown label={mode === 'rent' ? 'Annual rent' : 'Price'} value={price} onChange={(v) => set({ price: v })} options={priceRanges[mode]} />
              <Dropdown label="Bedrooms" value={beds} onChange={(v) => set({ beds: v })} options={bedOptions} />
              {activeFilters > 0 && <button onClick={clear} className="btn h-11 px-3 text-muted hover:text-ink"><X size={16} aria-hidden="true" />Clear</button>}
              <div className="ml-auto flex items-center gap-2">
                <Dropdown label="Sort by" icon={ArrowUpDown} value={sort} onChange={(v) => set({ sort: v })} options={sortOptions} align="right" />
                <Segmented label="View" value={view} onChange={(v) => set({ view: v })}
                  options={[{ value: 'grid', label: 'Grid', icon: LayoutGrid }, { value: 'map', label: 'Map', icon: Map }]} />
              </div>
            </div>
          </div>

          {/* Mobile / tablet filters */}
          {filtersOpen && (
            <div id="filter-panel" className="animate-fade-in grid grid-cols-2 gap-2 pb-1 lg:hidden">
              <Dropdown label="Property type" value={type} onChange={(v) => set({ type: v })} options={typeOptions} />
              <Dropdown label={mode === 'rent' ? 'Annual rent' : 'Price'} value={price} onChange={(v) => set({ price: v })} options={priceRanges[mode]} align="right" />
              <Dropdown label="Bedrooms" value={beds} onChange={(v) => set({ beds: v })} options={bedOptions} />
              <Dropdown label="Sort by" icon={ArrowUpDown} value={sort} onChange={(v) => set({ sort: v })} options={sortOptions} align="right" />
              <Segmented label="View" value={view} onChange={(v) => set({ view: v })} className="col-span-2"
                options={[{ value: 'grid', label: 'Grid', icon: LayoutGrid }, { value: 'map', label: 'Map', icon: Map }]} />
              {activeFilters > 0 && <button onClick={clear} className="btn-outline col-span-2"><X size={16} aria-hidden="true" />Clear filters</button>}
            </div>
          )}
        </div>
      </div>

      <section className="container-x py-8 sm:py-10">
        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-[24px] border border-dashed border-line-strong px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-tint text-brand"><SearchX size={28} aria-hidden="true" /></span>
            <h2 className="text-2xl font-bold">No homes match those filters</h2>
            <p className="max-w-md text-muted">Try a nearby area, widen your price range or switch between buying and renting.</p>
            <button onClick={clear} className="btn-primary mt-2">Clear filters</button>
          </div>
        ) : view === 'map' ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="order-2 grid auto-rows-max content-start gap-5 sm:grid-cols-2 lg:order-1 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:p-1">
              {results.map((l) => <ListingCard key={l.id} listing={l} compact active={l.id === activeId} onHover={setActiveId} />)}
            </div>
            <div className="order-1 lg:sticky lg:top-[180px] lg:order-2 lg:self-start">
              <Suspense fallback={<div className="h-[380px] animate-pulse rounded-[22px] bg-soft lg:h-[calc(100vh-220px)]" />}>
                <ListingsMap listings={results} activeId={activeId} onSelect={setActiveId} className="h-[380px] lg:h-[calc(100vh-220px)]" />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {results.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>
    </div>
  )
}
