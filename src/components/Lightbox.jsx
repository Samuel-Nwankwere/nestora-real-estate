import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { img } from '../data/listings'

export default function Lightbox({ images, index, onChange, onClose, title }) {
  const closeRef = useRef(null)
  const touch = useRef(null)
  const prev = () => onChange((index - 1 + images.length) % images.length)
  const next = () => onChange((index + 1) % images.length)

  // on open: lock scroll, move focus in; on close: restore both
  useEffect(() => {
    const last = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = ''; last?.focus?.() }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="animate-fade-in fixed inset-0 z-[80] flex flex-col bg-[#0B131F]/95 text-white" role="dialog" aria-modal="true" aria-label={`${title} photos`}>
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <span className="text-sm font-medium" aria-live="polite">{index + 1} / {images.length}</span>
        <button ref={closeRef} onClick={onClose} aria-label="Close photos" className="inline-flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"><X size={22} /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-2 sm:px-20"
        onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
        onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(d) > 40) (d > 0 ? prev : next)() }}>
        <img key={index} src={img(images[index], 1600)} alt={`${title}, photo ${index + 1}`} className="animate-fade-in max-h-[calc(100dvh-180px)] max-w-full rounded-xl object-contain" />
        <button onClick={prev} aria-label="Previous photo" className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:left-6"><ChevronLeft size={24} /></button>
        <button onClick={next} aria-label="Next photo" className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:right-6"><ChevronRight size={24} /></button>
      </div>
      <div className="no-scrollbar flex justify-start gap-2 overflow-x-auto px-4 py-4 sm:justify-center">
        {images.map((id, i) => (
          <button key={id + i} onClick={() => onChange(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === index}
            className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg transition ${i === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-90'}`}>
            <img src={img(id, 200)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
