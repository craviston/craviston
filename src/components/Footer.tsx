
import { Instagram, Facebook } from "lucide-react"
import Logo from "@/components/Logo"

const ZOMATO_URL = "https://www.zomato.com/mumbai/craviston-gokuldham?amp=1"
const INSTAGRAM_URL = "https://www.instagram.com/craviston/"
const FACEBOOK_URL = "https://www.facebook.com/people/Craviston/61590774712152/"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-8 px-6 border-t border-primary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2 mb-6">
            <Logo className="w-40 md:w-48 h-auto" color="#f8e9d4" />
          </div>
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-xs mx-auto md:mx-0">
            Waffles & Sandwiches · Delivering joy, one craving at a time.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-headline text-2xl mb-6 tracking-wider">QUICK LINKS</h4>
          <ul className="space-y-4 font-body text-lg font-bold">
            <li><a href="#menu" className="hover:text-primary transition-colors">MENU</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">OUR STORY</a></li>
            <li><a href="#why-us" className="hover:text-primary transition-colors">WHY CRAVISTON</a></li>
            <li><a href={ZOMATO_URL} target="_blank" className="text-zomato hover:opacity-80 transition-opacity">ORDER ON ZOMATO</a></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-headline text-2xl mb-6 tracking-wider">FIND US ON</h4>
          <div className="flex justify-center md:justify-start gap-4 md:gap-6 flex-wrap">
            <a href={ZOMATO_URL} target="_blank" className="bg-background/10 p-3 rounded-full hover:bg-zomato hover:text-white transition-all flex items-center justify-center">
              <span className="font-headline text-xl px-2">ZOMATO</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="bg-background/10 p-4 rounded-full hover:bg-primary transition-all flex items-center justify-center">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="bg-background/10 p-4 rounded-full hover:bg-primary transition-all flex items-center justify-center">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground font-body font-bold text-sm">
        <p>© 2026 Craviston. All rights reserved.</p>
        <p className="flex items-center gap-2">Made with hunger 🧇</p>
      </div>
    </footer>
  )
}
