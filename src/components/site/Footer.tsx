import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, Mail, Music2 } from "lucide-react";
import logo from "@/assets/logo-vadi.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Vadi Natural Care" width={48} height={48} className="h-12 w-12 object-contain" />
            <span className="font-display text-lg font-semibold">Vadi Natural Care</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Soins capillaires naturels pour cheveux crépus, bouclés et frisés. Fabriqué à Douala, Cameroun, avec amour par Vadiane NYA.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-display text-base">Boutique</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/boutique" className="hover:text-primary">Tous les produits</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Soins capillaires</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Accessoires</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Packs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-display text-base">Vadi</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/a-propos" className="hover:text-primary">Notre histoire</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/quiz" className="hover:text-primary">Quiz routine</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-display text-base">Suivez-nous</h3>
          <p className="mb-3 text-sm text-muted-foreground">@vadi_natural_care</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.instagram.com/vadi_natural_care" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.facebook.com/share/17jcVgQhLK/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="https://www.tiktok.com/@vadi_natural.care" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><Music2 className="h-4 w-4" /></a>
            <a href="https://wa.me/237673733530" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><MessageCircle className="h-4 w-4" /></a>
            <a href="mailto:vadibeauty2025@gmail.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><Mail className="h-4 w-4" /></a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">WhatsApp : +237 673 733 530</p>
          <p className="text-sm text-muted-foreground">Email : vadibeauty2025@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vadi Natural Care — Made in Cameroon 🇨🇲
      </div>
    </footer>
  );
}