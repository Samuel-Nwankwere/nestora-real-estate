import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Logo from './Logo'

const links = [
  { label: 'Buy', to: '/search?mode=buy' },
  { label: 'Rent', to: '/search?mode=rent' },
  { label: 'Sell', to: '/#sell' },
  { label: 'Mortgage', to: '/#mortgage' },
  { label: 'Agents', to: '/#agents' },
]

export default function Navbar() {
  const { saved } = useApp()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (to) => {
    const [path, query] = to.split('?')
    return location.pathname === path && query && location.search.includes(query)
  }

  return (
    <header className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow ${scrolled ? 'border-line shadow-[0_4px_20px_rgba(15,27,45,0.05)]' : 'border-transparent'}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[76px]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to}
              className={`rounded-lg px-4 py-2 text-[15px] font-medium transition-colors hover:bg-soft hover:text-brand ${isActive(l.to) ? 'text-brand' : 'text-ink'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link to="/saved" className="relative inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors hover:bg-soft" aria-label={`Saved homes, ${saved.length}`}>
            <Heart size={19} strokeWidth={1.8} aria-hidden="true" />
            <span className="hidden sm:inline">Saved</span>
            <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-brand-tint px-1.5 text-xs font-bold text-brand-dark">{saved.length}</span>
          </Link>
          <Link to="/#sell" className="btn-outline hidden md:inline-flex">List a property</Link>
          <button className="btn-primary hidden sm:inline-flex">Sign in</button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="inline-flex h-11 w-11 items-center justify-center rounded-xl hover:bg-soft lg:hidden">
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button aria-label="Close menu" className="animate-fade-in absolute inset-0 h-full w-full bg-ink/40" onClick={() => setOpen(false)} />
          <div className="animate-slide-in absolute inset-y-0 left-0 flex w-[min(340px,86%)] flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-xl hover:bg-soft"><X size={22} /></button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col p-3">
              {links.map((l) => (
                <Link key={l.label} to={l.to} className="flex h-12 items-center rounded-xl px-3 font-display text-lg font-semibold hover:bg-soft">{l.label}</Link>
              ))}
              <Link to="/saved" className="flex h-12 items-center justify-between rounded-xl px-3 font-display text-lg font-semibold hover:bg-soft">Saved homes <span className="rounded-full bg-brand-tint px-2 text-sm text-brand-dark">{saved.length}</span></Link>
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t border-line p-4">
              <button className="btn-primary h-12 w-full">Sign in</button>
              <Link to="/#sell" className="btn-outline h-12 w-full">List a property</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
