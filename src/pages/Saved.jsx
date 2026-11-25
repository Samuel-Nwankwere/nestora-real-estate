import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import ListingCard from '../components/ListingCard'
import { useApp } from '../context/AppContext'
import { listings } from '../data/listings'

export default function Saved() {
  const { saved } = useApp()
  const list = listings.filter((l) => saved.includes(l.id))
  return (
    <div className="container-x py-10 sm:py-14">
      <h1 className="text-[30px] font-extrabold sm:text-[40px]">Saved homes</h1>
      <p className="mt-1 text-muted">{list.length} {list.length === 1 ? 'home' : 'homes'} saved on this device</p>
      {list.length ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {list.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-[24px] border border-dashed border-line-strong px-6 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-tint text-brand"><Heart size={28} aria-hidden="true" /></span>
          <h2 className="text-2xl font-bold">No saved homes yet</h2>
          <p className="max-w-md text-muted">Tap the heart on any listing to keep it here and compare later.</p>
          <Link to="/search?mode=buy" className="btn-primary mt-2">Browse homes</Link>
        </div>
      )}
    </div>
  )
}
