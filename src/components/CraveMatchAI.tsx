
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { craveMatch, type CraveMatchOutput } from "@/ai/flows/crave-match"
import { Loader2, Wand2, ChefHat, Sparkles } from "lucide-react"

export default function CraveMatchAI() {
  const [mood, setMood] = useState("")
  const [flavor, setFlavor] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CraveMatchOutput | null>(null)

  const handleMatch = async () => {
    if (!mood || !flavor) return
    setLoading(true)
    try {
      const output = await craveMatch({ mood, flavorPreferences: flavor })
      setResult(output)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 px-6 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="bg-grid-white absolute inset-0 opacity-10"></div>
      <div className="watermark absolute bottom-0 right-0 text-[15vw] opacity-10">AI-CRAVE</div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full font-headline text-base md:text-lg mb-4">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" /> AI-POWERED RECOMMENDATIONS
          </div>
          <h2 className="font-headline text-5xl md:text-8xl tracking-tight mb-4">CRAVEMATCH AI</h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">Tell us how you feel, we'll tell you what to eat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="bg-background/5 border-2 border-primary/20 backdrop-blur-sm p-6 md:p-8 rounded-3xl">
            <CardContent className="p-0 space-y-6">
              <div>
                <label className="font-headline text-xl md:text-2xl mb-2 block">WHAT'S THE VIBE?</label>
                <Input
                  placeholder="e.g. Happy, energetic, gloomy..."
                  className="bg-background/10 border-primary/30 h-12 md:h-14 font-body text-base md:text-lg focus:ring-primary"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                />
              </div>
              <div>
                <label className="font-headline text-xl md:text-2xl mb-2 block">WHAT ARE YOU CRAVING?</label>
                <Input
                  placeholder="e.g. Sweet, spicy, savory..."
                  className="bg-background/10 border-primary/30 h-12 md:h-14 font-body text-base md:text-lg focus:ring-primary"
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-2xl md:text-3xl h-auto py-5 md:py-6 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                onClick={handleMatch}
                disabled={loading || !mood || !flavor}
              >
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <><Wand2 className="mr-2" /> FIND MY MATCH</>}
              </Button>
            </CardContent>
          </Card>

          <div className="min-h-[300px] md:min-h-[400px]">
            {result ? (
              <div className="bg-background text-foreground p-6 md:p-8 rounded-3xl border-4 border-primary shadow-2xl animate-in zoom-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <ChefHat className="text-primary w-8 h-8 md:w-10 md:h-10" />
                  <span className="font-headline text-3xl md:text-4xl">WE FOUND IT!</span>
                </div>
                <h3 className="font-headline text-4xl md:text-5xl mb-2 text-primary">{result.recommendedItem.name}</h3>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-6">{result.recommendedItem.type}</p>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="font-body text-sm md:text-base leading-relaxed">{result.reasoning}</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-primary/30 rounded-xl">
                    <p className="font-body font-bold text-xs uppercase mb-1">PRO-TIP PAIRING:</p>
                    <p className="font-body text-sm italic">{result.suggestedPairing}</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-zomato hover:bg-zomato/90 text-zomato-foreground font-headline text-xl md:text-2xl h-auto py-4 rounded-xl"
                  onClick={() => window.open("https://www.zomato.com", "_blank")}
                >
                  ORDER NOW ON ZOMATO
                </Button>
              </div>
            ) : (
              <div className="h-full border-4 border-dashed border-primary/20 rounded-3xl flex flex-col items-center justify-center p-8 md:p-12 text-center text-muted-foreground">
                <ChefHat className="w-16 h-16 md:w-20 md:h-20 mb-6 opacity-20" />
                <p className="font-headline text-2xl md:text-3xl">YOUR PERFECT BITE IS WAITING</p>
                <p className="font-body text-sm">Input your mood and let the AI do the heavy lifting.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
