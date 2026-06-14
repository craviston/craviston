
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Logo from "@/components/Logo"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const ZOMATO_URL = "https://www.zomato.com/mumbai/craviston-gokuldham?amp=1"

const NAV_LINKS = [
  { name: "MENU", href: "#menu" },
  { name: "OUR STORY", href: "#about" },
  { name: "WHY US", href: "#why-us" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const NavContent = ({ mobile = false }) => (
    <>
      <div className={cn(
        mobile ? "flex flex-col gap-6" : "hidden md:flex items-center gap-8",
        "font-body font-bold text-sm tracking-widest transition-colors duration-300",
        !mobile && (scrolled ? "text-[#f8e9d4]" : "text-foreground")
      )}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setOpen(false)}
            className="hover:text-primary transition-colors text-lg md:text-sm"
          >
            {link.name}
          </a>
        ))}
      </div>
      <Button
        className={cn(
          "bg-zomato hover:bg-zomato/90 text-zomato-foreground font-headline text-lg px-6 py-6 rounded-full",
          mobile && "w-full"
        )}
        onClick={() => {
          window.open(ZOMATO_URL, "_blank")
          setOpen(false)
        }}
      >
        ORDER ON ZOMATO
      </Button>
    </>
  )

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 flex items-center justify-between",
        scrolled ? "bg-secondary/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent"
      )}
    >
      <a href="/" className="flex items-center gap-2 group">
        <Logo 
          className="w-32 md:w-48 h-auto" 
          color={scrolled ? "#f8e9d4" : "#432E27"} 
        />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <NavContent />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={cn("text-primary", scrolled ? "text-[#f8e9d4]" : "text-foreground")}>
              <Menu className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-secondary border-primary/20 p-8 flex flex-col items-center justify-center text-secondary-foreground">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo className="w-48 h-auto mb-12" color="#f8e9d4" />
            <NavContent mobile />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
