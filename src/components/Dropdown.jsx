import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

/**
 * Accessible custom select (WAI-ARIA "select-only combobox / listbox" pattern).
 *
 * Keyboard: ↓/↑ or Enter/Space opens · ↑/↓ moves · Home/End jump · type a letter to jump
 *           Enter/Space selects · Esc closes · Tab closes and moves on
 *
 * variant="field" → big two-line field used in the hero search
 * variant="pill"  → compact filter button used on the search page
 */
export default function Dropdown({
  label, value, options, onChange,
  variant = 'pill', icon: Icon, align = 'left', disabled = false, className = '',
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const id = useId()
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const listRef = useRef(null)
  const typeahead = useRef({ text: '', t: 0 })

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value))
  const selected = options[selectedIndex]
  const isDefault = selectedIndex === 0

  // close on outside click
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // on open: highlight current value and move focus into the list
  useEffect(() => {
    if (open) {
      setActive(selectedIndex)
      requestAnimationFrame(() => listRef.current?.focus({ preventScroll: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // keep highlighted option in view
  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const close = (refocus = true) => { setOpen(false); if (refocus) btnRef.current?.focus() }
  const choose = (i) => { onChange(options[i].value); close() }

  const onButtonKey = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); setOpen(true) }
  }

  const onListKey = (e) => {
    const last = options.length - 1
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive((a) => Math.min(a + 1, last)); break
      case 'ArrowUp': e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); break
      case 'Home': e.preventDefault(); setActive(0); break
      case 'End': e.preventDefault(); setActive(last); break
      case 'Enter': case ' ': e.preventDefault(); choose(active); break
      case 'Escape': e.preventDefault(); close(); break
      case 'Tab': close(false); break
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const now = Date.now()
          const ta = typeahead.current
          ta.text = now - ta.t > 600 ? e.key.toLowerCase() : ta.text + e.key.toLowerCase()
          ta.t = now
          const i = options.findIndex((o) => o.label.toLowerCase().replace(/[^a-z0-9]/g, '').startsWith(ta.text) || o.label.toLowerCase().startsWith(ta.text))
          if (i >= 0) setActive(i)
        }
    }
  }

  const labelId = `${id}-label`
  const listId = `${id}-list`

  const trigger =
    variant === 'field' ? (
      <button
        ref={btnRef} type="button" disabled={disabled}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-labelledby={`${labelId} ${id}-value`}
        onClick={() => setOpen((o) => !o)} onKeyDown={onButtonKey}
        className={`group flex h-full min-h-[64px] w-full items-center gap-3 rounded-2xl px-4 text-left transition ${open ? 'bg-white ring-2 ring-brand' : 'bg-soft hover:bg-[#ECF2F0]'}`}
      >
        {Icon && <Icon size={18} strokeWidth={1.8} className="shrink-0 text-brand" aria-hidden="true" />}
        <span className="flex min-w-0 flex-1 flex-col">
          <span id={labelId} className="text-xs font-semibold text-muted">{label}</span>
          <span id={`${id}-value`} className={`truncate text-[15px] font-semibold ${isDefault ? 'text-ink-soft' : 'text-ink'}`}>{selected?.label}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
    ) : (
      <button
        ref={btnRef} type="button" disabled={disabled}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-labelledby={`${labelId} ${id}-value`}
        onClick={() => setOpen((o) => !o)} onKeyDown={onButtonKey}
        className={`inline-flex h-11 w-full items-center justify-between gap-2 whitespace-nowrap rounded-xl border px-4 text-sm font-medium transition sm:w-auto ${
          open ? 'border-brand ring-4 ring-brand-tint' : isDefault ? 'border-line-strong bg-white hover:border-ink' : 'border-brand bg-brand-tint text-brand-dark'
        }`}
      >
        {Icon && <Icon size={16} strokeWidth={1.8} aria-hidden="true" />}
        <span id={labelId} className="sr-only">{label}</span>
        <span id={`${id}-value`} className="flex-1 text-left">{selected?.label}</span>
        <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
    )

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {trigger}
      {open && (
        <ul
          ref={listRef} id={listId} role="listbox" tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
          className={`animate-pop absolute top-[calc(100%+8px)] z-50 max-h-72 min-w-full w-max max-w-[min(320px,calc(100vw-2rem))] overflow-auto rounded-2xl border border-line bg-white p-1.5 shadow-[var(--shadow-pop)] outline-none ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {options.map((o, i) => {
            const isSel = i === selectedIndex
            return (
              <li
                key={o.value} id={`${id}-opt-${i}`} data-index={i} role="option" aria-selected={isSel}
                onPointerMove={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex min-h-11 cursor-pointer select-none items-center justify-between gap-6 rounded-xl px-3 text-sm transition-colors ${
                  i === active ? 'bg-soft' : ''
                } ${isSel ? 'font-semibold text-brand-dark' : 'text-ink'}`}
              >
                <span className="flex items-center gap-2">
                  {o.label}
                  {o.hint && <span className="text-xs font-normal text-muted">{o.hint}</span>}
                </span>
                {isSel && <Check size={16} strokeWidth={2.2} className="text-brand" aria-hidden="true" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
