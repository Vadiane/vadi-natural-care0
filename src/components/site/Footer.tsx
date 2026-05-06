import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
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
            Soins capillaires naturels pour cheveux crépus, bouclés et frisés. Fabriqué au Cameroun avec amour.
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
          <div className="flex gap-3">
            <a href="https://instagram.com/vadhinaturalcare" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="https://facebook.com/vadhinaturalcare" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="https://wa.me/237673733530" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground"><MessageCircle className="h-4 w-4" /></a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">WhatsApp : +237 673 733 530</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vadi Natural Care — Made in Cameroon 🇨🇲
      </div>
    </footer>
  );
}