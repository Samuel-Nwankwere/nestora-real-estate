// Dummy data for the Nestora concept. Every listing, agent and price is fictional.
// Photography: Unsplash (https://unsplash.com), free to use under the Unsplash License.

export const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

const interiors = [
  '1600607687939-ce8a6c25118c',
  '1507089947368-19c1da9775ae',
  '1600210492486-724fe5c67fb0',
  '1560448204-e02f11c3d0e2',
  '1502672260266-1c1ef2d93688',
  '1522708323590-d24dbb6b0267',
  '1493809842364-78817add7ffb',
  '1484154218962-a197022b5858',
]
const galleryFor = (main, offset) => [main, ...Array.from({ length: 4 }, (_, i) => interiors[(offset + i) % interiors.length])]

export const agents = [
  { id: 'adaeze', name: 'Adaeze Okafor', area: 'Ikoyi & Victoria Island', rating: 4.9, sold: 128, phone: '+234 803 000 1101', photo: '1494790108377-be9c29b29330' },
  { id: 'tunde', name: 'Tunde Bakare', area: 'Lekki & Ajah', rating: 4.8, sold: 96, phone: '+234 803 000 1102', photo: '1507003211169-0a1dd7228f2d' },
  { id: 'chinedu', name: 'Chinedu Eze', area: 'Ikeja GRA & Mainland', rating: 4.9, sold: 142, phone: '+234 803 000 1103', photo: '1500648767791-00dcc994a43e' },
  { id: 'funmi', name: 'Funmi Adeyemi', area: 'Banana Island & luxury', rating: 5.0, sold: 74, phone: '+234 803 000 1104', photo: '1438761681033-6461ffad8d80' },
]

export const areas = [
  { name: 'Ikoyi', image: '1512917774080-9991f1c4c750', lat: 6.4531, lng: 3.435 },
  { name: 'Lekki Phase 1', image: '1600047509807-ba8f99d2cdde', lat: 6.4474, lng: 3.4723 },
  { name: 'Victoria Island', image: '1545324418-cc1a3fa10c00', lat: 6.4281, lng: 3.4219 },
  { name: 'Ikeja GRA', image: '1568605114967-8130f3a36994', lat: 6.5806, lng: 3.3553 },
  { name: 'Banana Island', image: '1580587771525-78b9dba3b914', lat: 6.459, lng: 3.448 },
  { name: 'Oniru', image: '1613490493576-7fde63acd811', lat: 6.437, lng: 3.45 },
  { name: 'Yaba', image: '1600566753190-17f0baa2a6c3', lat: 6.5095, lng: 3.3711 },
  { name: 'Surulere', image: '1600047509807-ba8f99d2cdde', lat: 6.4969, lng: 3.3542 },
  { name: 'Ajah', image: '1568605114967-8130f3a36994', lat: 6.4698, lng: 3.5852 },
  { name: 'Magodo', image: '1605276374104-dee2a0ed3cd6', lat: 6.615, lng: 3.3813 },
]

export const propertyTypes = ['Detached', 'Duplex', 'Terrace', 'Apartment', 'Villa', 'Bungalow']

export const listings = [
  {
    id: 'glass-pavilion', title: 'The Glass Pavilion', address: '14 Bourdillon Road', area: 'Ikoyi', type: 'Villa',
    mode: 'buy', price: 1250000000, beds: 5, baths: 6, size: 580, plot: 1200, title_doc: 'C of O', year: 2022,
    lat: 6.4555, lng: 3.4318, tour: true, featured: true, agentId: 'funmi',
    image: '1613490493576-7fde63acd811',
    amenities: ['Swimming pool', 'Solar & inverter backup', 'Borehole & water treatment', '24/7 security', 'Parking for 4 cars', 'Boys’ quarters (BQ)'],
    description: 'A light-filled contemporary home on a quiet, gated street in Old Ikoyi, minutes from the Lekki–Ikoyi Link Bridge. Floor-to-ceiling glass opens the living spaces onto a 20-metre pool and landscaped terraces. Inside: a fitted kitchen with a stone island, a cinema room, a home office and a primary suite with a private balcony.',
    nearby: [['Ikoyi Club 1938', 'Leisure', '1.1 km'], ['Falomo Shopping Centre', 'Shopping', '1.6 km'], ['Lekki–Ikoyi Link Bridge', 'Commute', '2.3 km']],
    flood: 'Low',
  },
  {
    id: 'admiralty-court-duplex', title: 'Admiralty Court Duplex', address: '7 Admiralty Way', area: 'Lekki Phase 1', type: 'Duplex',
    mode: 'buy', price: 480000000, beds: 4, baths: 5, size: 420, plot: 600, title_doc: 'Governor’s Consent', year: 2021,
    lat: 6.4462, lng: 3.4741, tour: true, featured: true, agentId: 'tunde',
    image: '1600585154340-be6161a56a0c',
    amenities: ['Fitted kitchen', 'Inverter backup', 'Borehole', 'Gated estate', 'Parking for 3 cars', 'Boys’ quarters (BQ)'],
    description: 'A sharp, modern 4-bedroom duplex inside a serviced estate off Admiralty Way. All rooms en-suite, a double-height living area, a family lounge upstairs and a rooftop terrace with views across Lekki.',
    nearby: [['Admiralty Way', 'Restaurants', '0.3 km'], ['Lekki Conservation Centre', 'Nature', '3.2 km'], ['Circle Mall', 'Shopping', '4.5 km']],
    flood: 'Medium',
  },
  {
    id: 'sabo-courtyard-terrace', title: 'Sabo Courtyard Terrace', address: '22 Herbert Macaulay Way', area: 'Yaba', type: 'Terrace',
    mode: 'rent', price: 9500000, beds: 3, baths: 3, size: 210, plot: 300, title_doc: 'Lease', year: 2019,
    lat: 6.5072, lng: 3.3745, tour: false, featured: true, agentId: 'chinedu',
    image: '1600566753190-17f0baa2a6c3',
    amenities: ['Private courtyard', 'Prepaid meter', 'Borehole', 'Estate security', 'Parking for 2 cars', 'Fibre internet ready'],
    description: 'A warm, timber-clad terrace in the heart of Yaba’s tech district. Open-plan ground floor around a planted courtyard, three bedrooms upstairs and a study nook. Walking distance to co-working spaces and UNILAG.',
    nearby: [['UNILAG', 'University', '2.1 km'], ['Yaba Tech Hub', 'Work', '0.8 km'], ['Tejuosho Market', 'Shopping', '1.9 km']],
    flood: 'Low',
  },
  {
    id: 'lagoon-view-mansion', title: 'Lagoon View Mansion', address: '3 Ocean Parade', area: 'Banana Island', type: 'Villa',
    mode: 'buy', price: 2100000000, beds: 6, baths: 7, size: 900, plot: 1800, title_doc: 'C of O', year: 2023,
    lat: 6.4602, lng: 3.4462, tour: true, featured: true, agentId: 'funmi',
    image: '1580587771525-78b9dba3b914',
    amenities: ['Lagoon frontage', 'Infinity pool', 'Elevator', 'Smart home system', 'Cinema room', 'Staff quarters'],
    description: 'A landmark waterfront residence with direct lagoon frontage, private jetty access and a 25-metre infinity pool. Six suites, an elevator, a cinema, a gym and staff quarters on a generous 1,800 m² plot.',
    nearby: [['Banana Island jetty', 'Waterfront', '0.4 km'], ['Ikoyi Club 1938', 'Leisure', '3.0 km'], ['Victoria Island', 'Business', '5.2 km']],
    flood: 'Low',
  },
  {
    id: 'eko-skyline-12b', title: 'Eko Skyline Apartment 12B', address: 'Adeola Odeku Street', area: 'Victoria Island', type: 'Apartment',
    mode: 'rent', price: 15000000, beds: 2, baths: 2, size: 140, plot: null, title_doc: 'Lease', year: 2020,
    lat: 6.4298, lng: 3.4208, tour: true, featured: true, agentId: 'adaeze',
    image: '1545324418-cc1a3fa10c00',
    amenities: ['Gym & pool', '24/7 power', 'Concierge', 'Elevator', 'Secure parking', 'Ocean view'],
    description: 'A serviced 2-bedroom apartment on the 12th floor with ocean views, 24-hour power, a residents’ gym and pool, and a concierge. Minutes from the offices and restaurants of Victoria Island.',
    nearby: [['Eko Atlantic', 'Business', '2.0 km'], ['Bar Beach', 'Beach', '1.4 km'], ['Ozumba Mbadiwe', 'Commute', '0.9 km']],
    flood: 'Medium',
  },
  {
    id: 'ikeja-gra-family-home', title: 'Ikeja GRA Family Home', address: '9 Isaac John Street', area: 'Ikeja GRA', type: 'Detached',
    mode: 'buy', price: 320000000, beds: 4, baths: 4, size: 380, plot: 900, title_doc: 'C of O', year: 2015,
    lat: 6.5812, lng: 3.3574, tour: false, featured: true, agentId: 'chinedu',
    image: '1570129477492-45c003edd2be',
    amenities: ['Large garden', 'Generator house', 'Borehole', 'Gatehouse', 'Parking for 5 cars', 'Boys’ quarters (BQ)'],
    description: 'A classic family home on a leafy, tree-lined street in Ikeja GRA. A wide verandah, a mature garden, four bedrooms and two living rooms — 10 minutes from the airport.',
    nearby: [['Murtala Muhammed Airport', 'Travel', '4.8 km'], ['Ikeja City Mall', 'Shopping', '2.7 km'], ['Lagos State Secretariat', 'Work', '3.1 km']],
    flood: 'Low',
  },
  {
    id: 'oniru-waterfront-penthouse', title: 'Oniru Waterfront Penthouse', address: 'Landmark Boulevard', area: 'Oniru', type: 'Apartment',
    mode: 'buy', price: 650000000, beds: 3, baths: 4, size: 260, plot: null, title_doc: 'Governor’s Consent', year: 2022,
    lat: 6.4362, lng: 3.4515, tour: true, featured: false, agentId: 'adaeze',
    image: '1512917774080-9991f1c4c750',
    amenities: ['Private terrace pool', 'Ocean view', '24/7 power', 'Concierge', 'Gym', 'Two parking bays'],
    description: 'A top-floor penthouse with a wraparound terrace and a private plunge pool overlooking the Atlantic. Three suites, a chef’s kitchen and full building services.',
    nearby: [['Landmark Beach', 'Beach', '0.5 km'], ['Victoria Island', 'Business', '2.2 km'], ['Lekki Phase 1', 'Lifestyle', '2.9 km']],
    flood: 'Medium',
  },
  {
    id: 'ajah-garden-bungalow', title: 'Ajah Garden Bungalow', address: 'Thomas Estate', area: 'Ajah', type: 'Bungalow',
    mode: 'buy', price: 95000000, beds: 3, baths: 3, size: 180, plot: 500, title_doc: 'Registered Survey', year: 2018,
    lat: 6.4683, lng: 3.5871, tour: false, featured: false, agentId: 'tunde',
    image: '1568605114967-8130f3a36994',
    amenities: ['Garden', 'Prepaid meter', 'Borehole', 'Estate security', 'Parking for 2 cars', 'Room to extend'],
    description: 'A well-kept 3-bedroom bungalow in a quiet, gated estate in Ajah, with a front garden and space to extend. A great first home or investment.',
    nearby: [['Ajah roundabout', 'Commute', '1.3 km'], ['Novare Mall', 'Shopping', '6.0 km'], ['Lagos Business School', 'Education', '5.5 km']],
    flood: 'Medium',
  },
  {
    id: 'surulere-modern-semi', title: 'Surulere Modern Semi', address: 'Adelabu Street', area: 'Surulere', type: 'Detached',
    mode: 'rent', price: 6000000, beds: 3, baths: 3, size: 190, plot: 350, title_doc: 'Lease', year: 2017,
    lat: 6.4952, lng: 3.3571, tour: false, featured: false, agentId: 'chinedu',
    image: '1600047509807-ba8f99d2cdde',
    amenities: ['Fitted kitchen', 'Prepaid meter', 'Borehole', 'Gated compound', 'Parking for 2 cars', 'Close to schools'],
    description: 'A bright, modern semi-detached home on a quiet street in Surulere, close to the National Stadium, schools and Lagos Island.',
    nearby: [['National Stadium', 'Leisure', '1.5 km'], ['Adeniran Ogunsanya Mall', 'Shopping', '1.1 km'], ['Third Mainland Bridge', 'Commute', '6.8 km']],
    flood: 'Low',
  },
  {
    id: 'magodo-brick-detached', title: 'Magodo Brick Detached', address: 'Phase 2, CMD Road', area: 'Magodo', type: 'Detached',
    mode: 'buy', price: 210000000, beds: 5, baths: 5, size: 450, plot: 700, title_doc: 'C of O', year: 2016,
    lat: 6.6162, lng: 3.3792, tour: true, featured: false, agentId: 'chinedu',
    image: '1605276374104-dee2a0ed3cd6',
    amenities: ['Double garage', 'Generator house', 'Borehole', 'Estate security', 'Garden', 'Boys’ quarters (BQ)'],
    description: 'A spacious 5-bedroom brick home in Magodo Phase 2, with a double garage, two lounges and a large garden in one of the Mainland’s best-kept estates.',
    nearby: [['Magodo Shopping Arcade', 'Shopping', '0.9 km'], ['Ojota', 'Commute', '4.0 km'], ['Ikeja GRA', 'Lifestyle', '8.5 km']],
    flood: 'Low',
  },
  {
    id: 'lekki-palm-villa', title: 'Lekki Palm Villa', address: 'Fola Osibo Road', area: 'Lekki Phase 1', type: 'Villa',
    mode: 'rent', price: 28000000, beds: 4, baths: 5, size: 400, plot: 650, title_doc: 'Lease', year: 2021,
    lat: 6.4428, lng: 3.4689, tour: true, featured: false, agentId: 'tunde',
    image: '1564013799919-ab600027ffc6',
    amenities: ['Swimming pool', 'Tropical garden', 'Inverter backup', 'Borehole', '24/7 security', 'Parking for 3 cars'],
    description: 'A breezy, fully serviced villa with a pool and tropical garden in Lekki Phase 1. Four en-suite bedrooms, a family lounge and an outdoor kitchen for entertaining.',
    nearby: [['Admiralty Way', 'Restaurants', '0.7 km'], ['Lekki–Ikoyi Link Bridge', 'Commute', '1.8 km'], ['Circle Mall', 'Shopping', '3.9 km']],
    flood: 'Medium',
  },
  {
    id: 'glover-road-residence', title: 'Glover Road Residence', address: 'Glover Road', area: 'Ikoyi', type: 'Detached',
    mode: 'rent', price: 18000000, beds: 3, baths: 4, size: 300, plot: 800, title_doc: 'Lease', year: 2012,
    lat: 6.4489, lng: 3.4384, tour: false, featured: false, agentId: 'adaeze',
    image: '1583608205776-bfd35f0d9f83',
    amenities: ['Mature garden', 'Generator house', 'Borehole', '24/7 security', 'Parking for 4 cars', 'Boys’ quarters (BQ)'],
    description: 'A gracious, colonial-style home set back from Glover Road behind a mature garden, with high ceilings, a wide verandah and generous rooms.',
    nearby: [['Ikoyi Club 1938', 'Leisure', '0.9 km'], ['Awolowo Road', 'Shopping', '1.2 km'], ['Falomo Bridge', 'Commute', '1.7 km']],
    flood: 'Low',
  },
].map((l, i) => ({ ...l, gallery: galleryFor(l.image, i) }))

export const getListing = (id) => listings.find((l) => l.id === id)
export const getAgent = (id) => agents.find((a) => a.id === id)

// ---------- formatting ----------
export const naira = (n) => '₦' + Math.round(n).toLocaleString('en-NG')
export function shortNaira(n) {
  if (n >= 1e9) return '₦' + (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B'
  if (n >= 1e6) return '₦' + (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  return '₦' + Math.round(n / 1e3) + 'k'
}
export const priceLabel = (l) => naira(l.price) + (l.mode === 'rent' ? ' / year' : '')
export const pinLabel = (l) => shortNaira(l.price) + (l.mode === 'rent' ? '/yr' : '')

// ---------- filters ----------
export const priceRanges = {
  buy: [
    { value: 'any', label: 'Any price' },
    { value: '0-100', label: 'Under ₦100M', min: 0, max: 100e6 },
    { value: '100-300', label: '₦100M – ₦300M', min: 100e6, max: 300e6 },
    { value: '300-1000', label: '₦300M – ₦1B', min: 300e6, max: 1e9 },
    { value: '1000+', label: '₦1B and above', min: 1e9, max: Infinity },
  ],
  rent: [
    { value: 'any', label: 'Any rent' },
    { value: '0-5', label: 'Under ₦5M / yr', min: 0, max: 5e6 },
    { value: '5-10', label: '₦5M – ₦10M / yr', min: 5e6, max: 10e6 },
    { value: '10-20', label: '₦10M – ₦20M / yr', min: 10e6, max: 20e6 },
    { value: '20+', label: '₦20M+ / yr', min: 20e6, max: Infinity },
  ],
}

export const bedOptions = [
  { value: 'any', label: 'Any beds' },
  { value: '1', label: '1+ beds' },
  { value: '2', label: '2+ beds' },
  { value: '3', label: '3+ beds' },
  { value: '4', label: '4+ beds' },
  { value: '5', label: '5+ beds' },
]

export const typeOptions = [{ value: 'any', label: 'Any type' }, ...propertyTypes.map((t) => ({ value: t, label: t }))]

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'size-desc', label: 'Largest first' },
  { value: 'beds-desc', label: 'Most bedrooms' },
]

export function filterListings({ mode = 'buy', area = '', type = 'any', price = 'any', beds = 'any', sort = 'recommended' }) {
  const range = priceRanges[mode]?.find((r) => r.value === price)
  const q = area.trim().toLowerCase()
  let r = listings.filter((l) =>
    l.mode === mode &&
    (!q || l.area.toLowerCase().includes(q) || l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)) &&
    (type === 'any' || l.type === type) &&
    (!range || range.value === 'any' || (l.price >= range.min && l.price < range.max)) &&
    (beds === 'any' || l.beds >= Number(beds))
  )
  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'size-desc': (a, b) => b.size - a.size,
    'beds-desc': (a, b) => b.beds - a.beds,
  }
  if (sorters[sort]) r = [...r].sort(sorters[sort])
  return r
}

// Standard amortised loan repayment
export function monthlyRepayment(price, equityPct, ratePct, years) {
  const loan = price * (1 - equityPct / 100)
  const r = ratePct / 100 / 12
  const n = years * 12
  const monthly = r ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n
  return { loan, monthly }
}
