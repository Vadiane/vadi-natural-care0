import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, getCartDetailed, cartTotal } from "@/store/cart";
import { formatFCFA } from "@/data/products";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier – Vadi Natural Care" },
      { name: "description", content: "Votre sélection de soins capillaires Vadi Natural Care." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove } = useCart();
  const detailed = getCartDetailed(items);
  const subtotal = cartTotal(items);

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-primary/40" />
        <h1 className="font-display text-3xl text-cocoa">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Découvrez nos soins naturels pour cheveux crépus et bouclés.</p>
        <Link to="/boutique" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg">
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h1 className="mb-8 font-display text-4xl text-cocoa">Mon panier</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {detailed.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4">
              <Link to="/produit/$slug" params={{ slug: product.slug }} className="block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to="/produit/$slug" params={{ slug: product.slug }} className="font-display text-lg text-cocoa hover:text-primary">
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.tagline}</p>
                  </div>
                  <button onClick={() => remove(product.id)} aria-label="Retirer" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(product.id, qty - 1)} className="p-2"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                  </div>
                  <span className="font-display text-primary">{formatFCFA(product.price * qty)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-2xl bg-secondary/60 p-6">
          <h2 className="font-display text-xl">Récapitulatif</h2>
          <div className="flex justify-between text-sm"><span>Sous-total</span><span>{formatFCFA(subtotal)}</span></div>
          <div className="flex justify-between text-sm text-muted-foreground"><span>Livraison</span><span>Calculée à l'étape suivante</span></div>
          <div className="flex justify-between border-t border-border pt-3 font-display text-lg">
            <span>Total estimé</span><span className="text-primary">{formatFCFA(subtotal)}</span>
          </div>
          <Link to="/checkout" className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg">
            Passer la commande
          </Link>
          <Link to="/boutique" className="block text-center text-sm text-cocoa/70 hover:text-primary">← Continuer mes achats</Link>
        </aside>
      </div>
    </div>
  );
}