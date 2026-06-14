
import { Flame, Target, Package, Star } from "lucide-react"

export default function WhyUs() {
  const points = [
    {
      icon: <Flame className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Always Fresh",
      text: "We cook when you order. No batch cooking, no waiting. Fresh from the iron to your doorstep."
    },
    {
      icon: <Target className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Obsessive Quality",
      text: "Premium ingredients, real cheese, fresh produce, in-house batter. We don't settle for less."
    },
    {
      icon: <Package className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Packed to Perfection",
      text: "Packaging designed to keep food crispy through every minute of delivery. No soggy sandwiches here."
    },
    {
      icon: <Star className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Top Rated",
      text: "Consistently 4.5+ stars on Zomato. Customers keep coming back for the Craviston hit."
    }
  ]

  return (
    <section id="why-us" className="py-24 px-6 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-headline text-6xl md:text-9xl tracking-tighter text-center mb-16 md:mb-20 reveal-on-scroll">WHY CRAVISTON</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="group bg-background/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-2 border-primary/10 hover:border-primary transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(212,77,37,0.2)] reveal-on-scroll flex flex-col items-center text-center"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-2xl">
                {p.icon}
              </div>
              <h3 className="font-headline text-3xl md:text-4xl mb-4 md:mb-6 tracking-wide group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="font-body text-white text-base md:text-lg leading-relaxed opacity-90">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
