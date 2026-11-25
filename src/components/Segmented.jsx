/** Segmented control (radio-group semantics, arrow keys move between options). */
export default function Segmented({ options, value, onChange, label, size = 'md', dark = false, className = '' }) {
  const onKey = (e, i) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return
    e.preventDefault()
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length
    onChange(options[n].value)
    e.currentTarget.parentElement.children[n]?.focus()
  }
  const h = size === 'sm' ? 'h-9 px-3.5 text-[13px]' : 'h-10 px-4 text-sm'
  return (
    <div role="radiogroup" aria-label={label} className={`inline-flex gap-1 rounded-[14px] bg-soft p-1 ${className}`}>
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button key={o.value} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)} onKeyDown={(e) => onKey(e, i)}
            className={`inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-semibold transition ${h} ${
              on ? (dark ? 'bg-ink text-white' : 'bg-white text-ink shadow-[0_1px_3px_rgba(15,27,45,0.12)]') : 'text-muted hover:text-ink'
            }`}>
            {o.icon && <o.icon size={16} aria-hidden="true" />}{o.label}
          </button>
        )
      })}
    </div>
  )
}
