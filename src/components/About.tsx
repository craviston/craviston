
export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-5xl md:text-9xl leading-[0.9] mb-8 reveal-on-scroll">BORN TO FEED YOUR CRAVINGS</h2>
            <div className="space-y-6 font-body text-lg md:text-xl text-muted-foreground reveal-on-scroll">
              <p>
                Craviston is a cloud kitchen obsessed with making waffles and sandwiches that <span className="text-foreground font-bold">hit different.</span>
              </p>
              <p>
                No dine-in, no frills — just food that arrives hot, fresh, and ready to destroy. We cook to order, every single time.
              </p>
              <p>
                We believe in bold flavors and generous portions. If it's not crave-worthy, it's not on our menu.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-on-scroll">
            <div className="bg-primary p-6 md:p-8 rounded-3xl text-primary-foreground flex flex-col justify-center items-center text-center">
              <span className="text-4xl md:text-5xl mb-4">🧇</span>
              <h4 className="font-headline text-xl md:text-2xl mb-2">Belgian-style waffles, made to order</h4>
            </div>
            <div className="bg-secondary p-6 md:p-8 rounded-3xl text-secondary-foreground flex flex-col justify-center items-center text-center">
              <span className="text-4xl md:text-5xl mb-4">🥪</span>
              <h4 className="font-headline text-xl md:text-2xl mb-2">Stacked sandwiches, loaded flavours</h4>
            </div>
            <div className="bg-secondary p-6 md:p-8 rounded-3xl text-secondary-foreground flex flex-col justify-center items-center text-center">
              <span className="text-4xl md:text-5xl mb-4">⚡</span>
              <h4 className="font-headline text-xl md:text-2xl mb-2">Cloud kitchen — fast & fresh, always</h4>
            </div>
            <div className="bg-primary p-6 md:p-8 rounded-3xl text-primary-foreground flex flex-col justify-center items-center text-center">
              <span className="text-4xl md:text-5xl mb-4">❤️</span>
              <h4 className="font-headline text-xl md:text-2xl mb-2">Real ingredients, zero shortcuts</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
