export default function Ticker() {
  const content = "FRESH WAFFLES · CRISPY SANDWICHES · ORDER ON ZOMATO · CRAVISTON · "
  return (
    <div className="bg-primary py-4 overflow-hidden border-y-4 border-foreground relative z-20">
      <div className="ticker-wrap">
        <div className="ticker-content font-headline text-3xl md:text-5xl text-primary-foreground tracking-widest">
          {Array(20).fill(content).join("") }
        </div>
      </div>
    </div>
  )
}
