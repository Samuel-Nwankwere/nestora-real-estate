# Nestora — Lagos Real Estate Platform (concept)

A modern, fully responsive real-estate front end built as a portfolio project.

**Stack:** React 18 · Vite · Tailwind CSS v4 · React Router · React Leaflet (OpenStreetMap) · lucide-react

## Features
- **Hero search**: Buy/Rent toggle, location autocomplete (Lagos areas), and custom dropdowns for property type, price and bedrooms
- **Custom accessible dropdowns** (`src/components/Dropdown.jsx`): full keyboard support (arrows, Home/End, type to jump, Enter, Esc), correct ARIA listbox roles, closes when you click outside, selected checkmark, two styles (big search field and compact filter pill)
- **Search page** (`/search`): filters, sorting and grid/map view are all saved in the page address so a search can be shared as a link; empty state and a collapsible filter panel on mobile
- **Interactive map**: price pins on an OpenStreetMap map, synced with the listing cards
- **Property page**: photo gallery with a full-screen viewer (keyboard and swipe), key facts, amenities, nearby places, flood risk, location map, tour booking (date and time picker), agent contact, sticky action bar on mobile
- **Accessible breadcrumb**: a back button plus a scrollable trail with 44px tap targets on mobile, and `aria-current` on the current page
- **Mortgage calculator**: custom sliders, equity contribution, rate and term, live naira repayment
- **Saved homes**: heart any listing; saved in the browser (localStorage) and shown on `/saved`
- Neighbourhoods, how it works, top agents (WhatsApp/call links), valuation form, toasts, skip link, support for reduced motion

## Run locally
```bash
npm install
npm run dev
```

## Structure
```
src/
  components/  Dropdown, LocationInput, Navbar, ListingCard, ListingsMap, Breadcrumb, Lightbox, MortgageCalculator…
  sections/    Hero + home page sections
  pages/       Home, Search, Property, Saved, NotFound
  context/     AppContext (saved homes, toasts)
  data/        Dummy Lagos listings, agents, filters and helpers
```

All listings, agents and prices are fictional. Photos from [Unsplash](https://unsplash.com); map data © OpenStreetMap contributors.
# nestora-real-estate
