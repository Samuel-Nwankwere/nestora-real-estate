import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Accessible breadcrumb.
 * - <nav aria-label="Breadcrumb"> + ordered list, current page marked with aria-current="page"
 * - Desktop: wraps onto multiple lines if needed
 * - Mobile: a "Back" button to the parent level + a single, horizontally scrollable trail
 *   (44px tap targets, scrolled so the current page is visible)
 */
export default function Breadcrumb({ items }) {
  const parent = items[items.length - 2]
  return (
    <div className="flex items-center gap-1 sm:block">
      {parent && (
        <Link to={parent.to} aria-label={`Back to ${parent.label}`} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink hover:bg-soft sm:hidden">
          <ChevronLeft size={20} aria-hidden="true" />
        </Link>
      )}
      <nav aria-label="Breadcrumb" className="no-scrollbar min-w-0 flex-1 overflow-x-auto sm:overflow-visible"
        ref={(el) => { if (el) el.scrollLeft = el.scrollWidth }}>
        <ol className="flex items-center gap-0.5 whitespace-nowrap text-sm text-muted sm:flex-wrap sm:whitespace-normal">
          {items.map((item, i) => {
            const last = i === items.length - 1
            return (
              <li key={item.label} className="flex items-center gap-0.5">
                {last ? (
                  <span aria-current="page" className="inline-flex min-h-11 items-center px-1.5 font-semibold text-ink">{item.label}</span>
                ) : (
                  <>
                    <Link to={item.to} className="inline-flex min-h-11 items-center rounded-lg px-1.5 hover:text-brand hover:underline hover:underline-offset-4">{item.label}</Link>
                    <ChevronRight size={14} className="shrink-0 text-[#9AA6B2]" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
