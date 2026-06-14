
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import { Star, ArrowRight } from "lucide-react"

const ZOMATO_URL = "https://www.zomato.com/mumbai/craviston-gokuldham?amp=1"

const MENU_ITEMS = [
  { 
    id: 1, 
    name: "Belgian Milk Chocolate", 
    price: 165, 
    category: "Waffles", 
    description: "Classic crispy waffle base loaded with smooth melted premium Belgian milk chocolate.", 
    image: PlaceHolderImages[0] 
  },
  { 
    id: 2, 
    name: "Triple Chocolate", 
    price: 190, 
    category: "Waffles", 
    description: "Indulgent layers of white, milk, and dark chocolate on a freshly baked waffle.", 
    image: PlaceHolderImages[1] 
  },
  { 
    id: 3, 
    name: "Nutella Waffle", 
    price: 200, 
    category: "Waffles", 
    description: "Our bestseller: fresh waffle topped with a rich, generous spread of authentic Nutella.", 
    image: PlaceHolderImages[2] 
  },
  { 
    id: 4, 
    name: "Kit Kat Waffle", 
    price: 180, 
    category: "Waffles", 
    description: "A delightful combination of crushed Kit Kat and chocolate sauce over a crispy waffle.", 
    image: PlaceHolderImages[3] 
  },
  { 
    id: 5, 
    name: "Paneer Tikka Sandwich", 
    price: 210, 
    category: "Sandwiches", 
    description: "Tandoori-spiced paneer chunks with crunchy veggies in a perfectly grilled sandwich.", 
    image: PlaceHolderImages[4] 
  },
  { 
    id: 6, 
    name: "Pizza Sandwich", 
    price: 190, 
    category: "Sandwiches", 
    description: "All the flavors of a pizza—tangy sauce, olives, and corn—stuffed inside grilled bread.", 
    image: PlaceHolderImages[5] 
  },
  { 
    id: 7, 
    name: "Corn Cheese Grill", 
    price: 170, 
    category: "Sandwiches", 
    description: "Sweet corn and double cheese, grilled until gooey and golden brown.", 
    image: PlaceHolderImages[6] 
  },
  { 
    id: 8, 
    name: "Veg Cheese Grill", 
    price: 160, 
    category: "Sandwiches", 
    description: "The classic Indian street-style grilled sandwich loaded with fresh veggies and cheese.", 
    image: PlaceHolderImages[7] 
  },
]

export default function Menu() {
  const [filter, setFilter] = useState("All")

  const filteredItems = filter === "All" ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === filter)

  return (
    <section id="menu" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="watermark absolute top-0 left-10 text-[20vw] opacity-[0.02]">MENU</div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <h2 className="font-headline text-6xl md:text-9xl tracking-tighter mb-4 reveal-on-scroll">THE LINEUP</h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground reveal-on-scroll">Premium textures. Bold flavors. Built to satisfy.</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto reveal-on-scroll no-scrollbar">
            {["All", "Waffles", "Sandwiches"].map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                className={cn(
                  "font-headline text-lg md:text-xl px-6 md:px-8 h-10 md:h-12 rounded-full border-2 transition-all whitespace-nowrap",
                  filter === cat ? "bg-primary text-primary-foreground border-primary" : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                )}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="group relative bg-card rounded-[2.5rem] overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-500 hover:shadow-2xl reveal-on-scroll flex flex-col h-full"
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <div className="relative h-60 md:h-72 overflow-hidden">
                <Image
                  src={item.image.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  data-ai-hint={item.image.imageHint}
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-background/90 backdrop-blur-md text-foreground font-headline px-4 py-1 md:px-5 md:py-1.5 rounded-full text-lg md:text-xl z-10 shadow-lg">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow bg-card relative">
                <div className="mb-6 md:mb-8 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline text-3xl md:text-4xl leading-[0.85] group-hover:text-primary transition-colors uppercase">
                      {item.name}
                    </h3>
                  </div>
                  <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 md:gap-6 mt-auto">
                  <div className="flex items-center justify-between border-t border-border/50 pt-4 md:pt-6">
                    <div className="flex flex-col">
                      <span className="font-body text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-1">PRICE</span>
                      <span className="font-headline text-4xl md:text-5xl text-primary">₹{item.price}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-primary/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                      <span className="font-body font-black text-xs md:text-sm text-primary">4.9</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-foreground text-background font-headline text-xl md:text-2xl h-14 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] hover:bg-primary hover:text-primary-foreground transition-all shadow-xl active:scale-95 group/btn"
                    onClick={() => window.open(ZOMATO_URL, "_blank")}
                  >
                    ORDER NOW
                    <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center reveal-on-scroll">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-foreground font-headline text-2xl md:text-3xl px-8 md:px-16 py-8 md:py-10 rounded-full hover:bg-foreground hover:text-background transition-all shadow-2xl"
            onClick={() => window.open(ZOMATO_URL, "_blank")}
          >
            EXPLORE FULL MENU ON ZOMATO
          </Button>
        </div>
      </div>
    </section>
  )
}
