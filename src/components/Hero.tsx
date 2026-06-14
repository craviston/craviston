
"use client"

import { Button } from "@/components/ui/button"
import { Star, Zap, Flame } from "lucide-react"

const ZOMATO_URL = "https://www.zomato.com/mumbai/craviston-gokuldham?amp=1"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-background">
      <div className="watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] opacity-[0.03] select-none pointer-events-none font-headline">
        CRAVISTON
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <h1 className="font-headline text-7xl md:text-[10rem] leading-[0.8] mb-8 uppercase tracking-tighter">
          <span className="block reveal-on-scroll">CRAVE.</span>
          <span className="block text-primary reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>SATISFY.</span>
          <span className="block reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>REPEAT.</span>
        </h1>

        <p className="font-body text-lg md:text-2xl max-w-2xl mx-auto mb-12 text-muted-foreground reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
          Hot waffles. Stacked sandwiches. Made fresh, delivered fast — <span className="text-foreground font-bold">only on Zomato.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal-on-scroll" style={{ transitionDelay: '0.4s' }}>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-2xl h-auto py-5 px-10 rounded-full"
            onClick={() => window.open(ZOMATO_URL, "_blank")}
          >
            ORDER ON ZOMATO
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-foreground text-foreground hover:bg-foreground hover:text-background font-headline text-2xl h-auto py-5 px-10 rounded-full transition-all"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            VIEW MENU
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 reveal-on-scroll" style={{ transitionDelay: '0.5s' }}>
          <div className="flex items-center gap-2">
            <Flame className="text-primary w-5 h-5 md:w-6 md:h-6" />
            <span className="font-body font-bold text-xs md:text-sm tracking-widest uppercase">100% Fresh Made</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-primary w-5 h-5 md:w-6 md:h-6" />
            <span className="font-body font-bold text-xs md:text-sm tracking-widest uppercase">Avg. 20 Min Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-primary w-5 h-5 md:w-6 md:h-6 fill-primary" />
            <span className="font-body font-bold text-xs md:text-sm tracking-widest uppercase">4.5★ on Zomato</span>
          </div>
        </div>
      </div>
    </section>
  )
}
