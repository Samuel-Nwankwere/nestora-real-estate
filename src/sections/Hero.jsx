import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BedDouble, Building2, Search, ShieldCheck, Wallet } from 'lucide-react'
import Dropdown from '../components/Dropdown'
import LocationInput from '../components/LocationInput'
import Segmented from '../components/Segmented'
import { bedOptions, img, priceRanges, typeOptions } from '../data/listings'

export default function Hero() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('buy')
  const [area, setArea] = useState('')
  const [type, setType] = useState('any')
  const [price, setPrice] = useState('any')
  const [beds, setBeds] = useState('any')

  const submit = (e) => {
    e?.preventDefault()
    const p = new URLSearchParams({ mode })
    if (area.trim()) p.set('area', area.trim())
    if (type !== 'any') p.set('type', type)
    if (price !== 'any') p.set('price', price)
    if (beds !== 'any') p.set('beds', beds)
    navigate(`/search?${p}`)
  }

  return (
    <section className="container-x pt-3 sm:pt-5">
      <div className="relative flex min-h-[620px] flex-col justify-between rounded-[24px] sm:min-h-[660px] sm:rounded-[28px]">
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <img src={img('1600596542815-ffad4c1539a9', 2000)} alt="" fetchPriority="high" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#091422]/45 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#091422]/75 sm:via-[#091422]/40 sm:to-[#091422]/10" />
        </div>

        <div className="animate-fade-up relative flex max-w-3xl flex-col gap-5 px-5 pt-10 text-white sm:px-12 sm:pt-16 lg:px-16 lg:pt-20">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-[13px] font-medium backdrop-blur">
            <ShieldCheck size={15} aria-hidden="true" /> Every listing verified by a licensed Lagos agent
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-[76px]">
            Find a home in Lagos that fits the way you live.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Search verified homes for sale and rent — from Ikoyi to Lekki — tour them in 3D and compare neighbourhoods in one place.
          </p>
        </div>

        <form onSubmit={submit} role="search" aria-label="Find a home"
          className="animate-fade-up relative mx-3 mb-3 mt-10 rounded-[22px] bg-white p-2.5 shadow-[0_24px_60px_rgba(9,20,34,0.22)] [animation-delay:120ms] sm:mx-8 sm:mb-8 lg:mx-12 lg:mb-12">
          <div className="px-1.5 pb-2.5 pt-1">
            <Segmented label="Search type" dark value={mode} onChange={(m) => { setMode(m); setPrice('any') }}
              options={[{ value: 'buy', label: 'Buy' }, { value: 'rent', label: 'Rent' }]} className="w-full sm:w-auto" />
          </div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <LocationInput value={area} onChange={setArea} onSubmit={submit} className="sm:col-span-2 lg:col-span-1" />
            <Dropdown variant="field" label="Property type" icon={Building2} value={type} onChange={setType} options={typeOptions} />
            <Dropdown variant="field" label={mode === 'rent' ? 'Annual rent' : 'Price range'} icon={Wallet} value={price} onChange={setPrice} options={priceRanges[mode]} />
            <Dropdown variant="field" label="Bedrooms" icon={BedDouble} value={beds} onChange={setBeds} options={bedOptions} className="sm:col-span-2 lg:col-span-1" align="right" />
            <button type="submit" className="btn-primary min-h-[64px] rounded-2xl px-7 text-[15px] sm:col-span-2 lg:col-span-1">
              <Search size={18} strokeWidth={2.2} aria-hidden="true" /> Search
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
