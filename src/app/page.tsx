"use client"

import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import Ticker from "@/components/Ticker"
import Menu from "@/components/Menu"
import About from "@/components/About"
import WhyUs from "@/components/WhyUs"
import OrderCTA from "@/components/OrderCTA"
import Footer from "@/components/Footer"
import { useReveal } from "@/hooks/use-reveal"

export default function Home() {
  // Initialize the improved reveal logic
  useReveal()

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Ticker />
      <Menu />
      <About />
      <WhyUs />
      <OrderCTA />
      <Footer />
    </main>
  )
}
