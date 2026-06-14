
"use client"

import { Button } from "@/components/ui/button"

const ZOMATO_URL = "https://www.zomato.com/mumbai/craviston-gokuldham?amp=1"

export default function OrderCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-foreground text-background overflow-hidden text-center">
      <div className="watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] opacity-[0.05] font-headline select-none pointer-events-none">
        EAT
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-headline text-6xl md:text-[12rem] leading-none mb-6 reveal-on-scroll uppercase tracking-tight">ORDER NOW</h2>
        <p className="font-body text-lg md:text-2xl mb-12 opacity-80 reveal-on-scroll">Available on Zomato — delivered to your door in under 30 minutes.</p>

        <Button
          size="lg"
          className="w-full sm:w-auto bg-zomato hover:bg-zomato/90 text-zomato-foreground font-headline text-2xl md:text-3xl h-auto py-6 md:py-8 px-10 md:px-16 rounded-full shadow-[0_0_30px_rgba(226,55,68,0.4)] transition-all transform hover:scale-105 active:scale-95 reveal-on-scroll"
          onClick={() => window.open(ZOMATO_URL, "_blank")}
        >
          ORDER ON ZOMATO
        </Button>
      </div>
    </section>
  )
}
