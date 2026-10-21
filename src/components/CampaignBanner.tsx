"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Trophy } from "lucide-react"
import {
  CAMPAIGN,
  CAMPAIGN_END,
  CAMPAIGN_RESULTS,
  CAMPAIGN_START,
  getCampaignPhase,
  type CampaignPhase,
} from "@/lib/campaign"

type Segment = { value: string; label: string }

const PLACEHOLDER: Segment[] = [
  { value: "--", label: "hrs" },
  { value: "--", label: "min" },
  { value: "--", label: "sec" },
]

function toSegments(ms: number): Segment[] {
  const total = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  const pad = (n: number) => String(n).padStart(2, "0")

  const segments: Segment[] = []
  if (days > 0) segments.push({ value: String(days), label: "days" })
  segments.push({ value: pad(hours), label: "hrs" })
  segments.push({ value: pad(minutes), label: "min" })
  segments.push({ value: pad(seconds), label: "sec" })
  return segments
}

export default function CampaignBanner() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // Until the client clock is known, render the live state with placeholder
  // digits so the server markup and the first client render agree.
  const phase: CampaignPhase = now === null ? "live" : getCampaignPhase(now)
  const counting = phase === "live" || phase === "upcoming"
  const target = phase === "upcoming" ? CAMPAIGN_START : CAMPAIGN_END
  const segments = now === null ? PLACEHOLDER : counting ? toSegments(target - now) : []

  const badge =
    phase === "live"
      ? "GAME DROP"
      : phase === "upcoming"
        ? "COMING SOON"
        : phase === "closed"
          ? "CONTEST CLOSED"
          : "RESULTS ARE IN"

  const cta =
    phase === "live"
      ? "PLAY NOW"
      : phase === "upcoming"
        ? "SEE DETAILS"
        : phase === "closed"
          ? "VIEW FINAL BOARD"
          : "VIEW LEADERBOARD"

  const deadlineNote =
    phase === "live"
      ? "Ends 7 Nov 2026 · Winner announced 8 Nov"
      : phase === "upcoming"
        ? "Opens 21 Oct 2026 · Winner announced 8 Nov"
        : phase === "closed"
          ? "Winner announced 8 Nov 2026"
          : "Winner announced 8 Nov 2026 · Free waffle claimed"

  return (
    <section
      id="campaign-banner"
      className="relative overflow-hidden bg-foreground text-background pt-28 md:pt-36 pb-10 md:pb-14 px-6"
    >
      <div className="bg-grid-white absolute inset-0 opacity-[0.07]" />
      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary/25 blur-[120px]" />
      <div className="watermark absolute bottom-0 right-0 text-[26vw] opacity-[0.06] select-none pointer-events-none">
        SNAKE
      </div>

      <a
        href={CAMPAIGN.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-10 mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
      >
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 font-headline text-base md:text-lg tracking-widest text-primary-foreground">
              <span aria-hidden="true">🐍</span> {badge}
            </span>
            <span className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-background/70">
              {deadlineNote}
            </span>
          </div>

          <h2 className="font-headline text-5xl md:text-8xl leading-[0.85] tracking-tighter uppercase">
            Waffle <span className="text-primary">Snake</span>
          </h2>

          <p className="font-body text-base md:text-xl text-background/80 mt-5 max-w-xl">
            Eat waffles, grow longer, top the leaderboard. The highest score wins{" "}
            <span className="text-background font-bold">one free waffle of your choice</span> from the Craviston menu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:shrink-0">
          <div className="rounded-[1.75rem] bg-background/5 border-2 border-primary/25 px-6 py-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-primary font-headline text-2xl md:text-3xl">
              <Trophy className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
              1 FREE WAFFLE
            </div>
            <div className="font-body text-[0.7rem] md:text-xs uppercase tracking-[0.2em] text-background/60 mt-2 mb-3">
              {phase === "live"
                ? "Contest ends in"
                : phase === "upcoming"
                  ? "Starts in"
                  : "Contest status"}
            </div>
            {counting ? (
              <div className="flex items-end gap-2">
                {segments.map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <span className="font-headline text-3xl md:text-4xl text-background tabular-nums">
                      {s.value}
                    </span>
                    <span className="font-body text-[0.6rem] md:text-[0.65rem] uppercase tracking-widest text-background/50">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="font-headline text-3xl md:text-4xl text-background">FINAL</div>
            )}
          </div>

          <span className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-5 font-headline text-2xl md:text-3xl text-primary-foreground shadow-[0_0_30px_rgba(212,77,37,0.45)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            {cta}
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </div>
      </a>
    </section>
  )
}
