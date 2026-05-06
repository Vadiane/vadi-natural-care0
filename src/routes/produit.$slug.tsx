import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Leaf, Sparkles, ShieldCheck } from "lucide-react";
import { allProducts, formatFCFA } from "@/data/products";
import { useCart } from "@/store/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/produit/$slug")({
  head: ({ params }) => {
    const product = allProducts.find((p) => p.slug === params.slug);
    if (!product) {
      return { meta: [{ title: "Produit introuvable – Vadi Natural Care" }] };
    }
    return {
      meta: [
        { title: `${product.name} – Vadi Natural Care` },
        { name: "description", content: product.description },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.description },
        { property: "og:image", content: product.image },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Produit introuvable</h1>
      <Link to="/boutique" className="mt-4 inline-block text-primary hover:underline">← Retour à la boutique</Link>
    </div>
  ),
});

function ProductPage() {
  const { slug } = useParams({ from: "/produit/$slug" });
  const product = allProducts.find((p) => p.slug === slug);
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Produit introuvable</h1>
        <Link to="/boutique" className="mt-4 inline-block text-primary hover:underline">← Retour à la boutique</Link>
      </div>
    );
  }

  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Accueil</Link> /{" "}
        <Link to="/boutique" className="hover:text-primary">Boutique</Link> /{" "}
        <span className="text-cocoa">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-secondary/50 p-6"
        >
          <img src={product.image} alt={product.name} className="mx-auto aspect-square w-full max-w-lg object-contain" />
        </motion.div>

        <div className="flex flex-col">
          {product.badge && (
            <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {product.badge}
            </span>
          )}
          <h1 className="font-display text-4xl text-cocoa md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>
          {product.volume && <p className="mt-1 text-sm text-muted-foreground">Contenance : {product.volume}</p>}

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl text-primary">{formatFCFA(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatFCFA(product.oldPrice)}</span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-cocoa/80">{product.description}</p>

          {product.benefits && (
            <ul className="mt-6 space-y-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-cocoa/80">
                  <Sparkles className="h-4 w-4 text-primary" /> {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-primary" aria-label="Diminuer">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-primary" aria-label="Augmenter">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.id, qty);
                toast.success(`${product.name} ajouté au panier`);
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
            >
              <ShoppingBag className="h-5 w-5" /> Ajouter au panier
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-cocoa/70">
            <div className="rounded-xl bg-secondary/50 p-3"><Leaf className="mx-auto mb-1 h-4 w-4 text-primary" />100% naturel</div>
            <div className="rounded-xl bg-secondary/50 p-3"><ShieldCheck className="mx-auto mb-1 h-4 w-4 text-primary" />Made in Cameroon</div>
            <div className="rounded-xl bg-secondary/50 p-3"><Sparkles className="mx-auto mb-1 h-4 w-4 text-primary" />Résultats visibles</div>
          </div>
        </div>
      </div>

      {(product.ingredients || product.usage) && (
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {product.ingredients && (
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-display text-xl text-cocoa">Ingrédients clés</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.ingredients.map((i) => (
                  <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs text-cocoa">{i}</span>
                ))}
              </div>
            </div>
          )}
          {product.usage && (
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-display text-xl text-cocoa">Conseils d'utilisation</h2>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/80">{product.usage}</p>
            </div>
          )}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl text-cocoa">Vous aimerez aussi</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}