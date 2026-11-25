import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { MapPin, X } from 'lucide-react'
import { areas, listings } from '../data/listings'

/** Location autocomplete (ARIA combobox with listbox popup). */
export default function LocationInput({ value, onChange, onSubmit, variant = 'field', className = '' }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const id = useId()
  const wrapRef = useRef(null)
  const inputRef = useRef(null)

  const counts = useMemo(() => Object.fromEntries(areas.map((a) => [a.name, listings.filter((l) => l.area === a.name).length])), [])
  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase()
    return areas.filter((a) => !q || a.name.toLowerCase().includes(q)).slice(0, 6)
  }, [value])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  useEffect(() => setActive(-1), [value])

  const pick = (name) => { onChange(name); setOpen(false) }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') {
      if (open && active >= 0 && suggestions[active]) { e.preventDefault(); pick(suggestions[active].name) }
      else { setOpen(false); onSubmit?.() }
    } else if (e.key === 'Escape') { setOpen(false) }
  }

  const listId = `${id}-list`
  const showList = open && suggestions.length > 0

  const input = (
    <input
      ref={inputRef} id={`${id}-input`} type="text" autoComplete="off"
      role="combobox" aria-autocomplete="list" aria-expanded={showList} aria-controls={listId}
      aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
      value={value} placeholder="Lekki, Ikoyi, Yaba…"
      onChange={(e) => { onChange(e.target.value); setOpen(true) }}
      onFocus={() => setOpen(true)} onKeyDown={onKey}
      className="w-full min-w-0 bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:font-medium placeholder:text-muted/70"
    />
  )

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {variant === 'field' ? (
        <div className={`flex min-h-[64px] items-center gap-3 rounded-2xl px-4 transition ${open ? 'bg-white ring-2 ring-brand' : 'bg-soft hover:bg-[#ECF2F0]'}`}
          onClick={() => inputRef.current?.focus()}>
          <MapPin size={18} strokeWidth={1.8} className="shrink-0 text-brand" aria-hidden="true" />
          <span className="flex min-w-0 flex-1 flex-col">
            <label htmlFor={`${id}-input`} className="text-xs font-semibold text-muted">Location</label>
            {input}
          </span>
          {value && <button type="button" aria-label="Clear location" onClick={(e) => { e.stopPropagation(); onChange(''); inputRef.current?.focus() }} className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white hover:text-ink"><X size={16} /></button>}
        </div>
      ) : (
        <div className={`flex h-11 items-center gap-2 rounded-xl border bg-white px-3.5 transition ${open ? 'border-brand ring-4 ring-brand-tint' : 'border-line-strong hover:border-ink'}`}>
          <MapPin size={16} strokeWidth={1.8} className="shrink-0 text-muted" aria-hidden="true" />
          <label htmlFor={`${id}-input`} className="sr-only">Location</label>
          {input}
          {value && <button type="button" aria-label="Clear location" onClick={() => { onChange(''); inputRef.current?.focus() }} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-soft hover:text-ink"><X size={15} /></button>}
        </div>
      )}

      {showList && (
        <ul id={listId} role="listbox" aria-label="Suggested areas"
          className="animate-pop absolute left-0 right-0 top-[calc(100%+8px)] z-50 min-w-[260px] rounded-2xl border border-line bg-white p-1.5 shadow-[var(--shadow-pop)]">
          <li role="presentation" className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted">Areas in Lagos</li>
          {suggestions.map((a, i) => (
            <li key={a.name} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}
              onPointerMove={() => setActive(i)} onPointerDown={(e) => e.preventDefault()} onClick={() => pick(a.name)}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-xl px-3 text-sm ${i === active ? 'bg-soft' : ''}`}>
              <span className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-tint text-brand"><MapPin size={15} aria-hidden="true" /></span>
                <span className="font-medium">{a.name}<span className="font-normal text-muted">, Lagos</span></span>
              </span>
              <span className="text-xs text-muted">{counts[a.name]} {counts[a.name] === 1 ? 'home' : 'homes'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
