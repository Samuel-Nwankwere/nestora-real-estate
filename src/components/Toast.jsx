import { CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 lg:bottom-6">
      {toast && (
        <div key={toast.key} className="animate-fade-up flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-xl">
          <CheckCircle2 size={18} className="text-mint" aria-hidden="true" />
          {toast.message}
        </div>
      )}
    </div>
  )
}
