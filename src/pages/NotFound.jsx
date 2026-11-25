import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center gap-4 py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="text-4xl font-extrabold sm:text-5xl">This home isn’t on the market.</h1>
      <p className="text-muted">The page you’re looking for may have moved or been sold.</p>
      <Link to="/search?mode=buy" className="btn-primary mt-2">Browse homes</Link>
    </section>
  )
}
