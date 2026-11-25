import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const AppContext = createContext(null)
const KEY = 'nestora:saved'

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? ['glass-pavilion'] } catch { return ['glass-pavilion'] }
}

export function AppProvider({ children }) {
  const [saved, setSaved] = useState(loadSaved)
  const [toast, setToast] = useState(null)
  const timer = useRef()

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(saved)) } catch { /* storage unavailable */ }
  }, [saved])

  const notify = useCallback((message) => {
    clearTimeout(timer.current)
    setToast({ message, key: Date.now() })
    timer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const toggleSaved = useCallback((id, title) => {
    const has = saved.includes(id)
    notify(has ? `Removed ${title} from saved homes` : `Saved ${title}`)
    setSaved((s) => (has ? s.filter((x) => x !== id) : [...s, id]))
  }, [saved, notify])

  return (
    <AppContext.Provider value={{ saved, toggleSaved, isSaved: (id) => saved.includes(id), toast, notify }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
