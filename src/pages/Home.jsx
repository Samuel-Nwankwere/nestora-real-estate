import Hero from '../sections/Hero'
import { Agents, FeaturedListings, Highlights, HowItWorks, MortgageSection, Neighbourhoods, SellCta } from '../sections/HomeSections'

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <FeaturedListings />
      <Neighbourhoods />
      <MortgageSection />
      <HowItWorks />
      <Agents />
      <SellCta />
    </>
  )
}
