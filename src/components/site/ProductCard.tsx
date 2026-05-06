import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { type Product, formatFCFA } from "@/data/products";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <Link to="/produit/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden bg-secondary/40">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Link to="/produit/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-lg leading-tight text-cocoa">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <span className="font-display text-lg text-primary">{formatFCFA(product.price)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">{formatFCFA(product.oldPrice)}</span>
            )}
          </div>
          <button
            onClick={() => {
              add(product.id);
              toast.success(`${product.name} ajouté au panier`);
            }}
            aria-label="Ajouter au panier"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}