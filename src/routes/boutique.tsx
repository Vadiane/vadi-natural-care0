import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { allProducts, type Category } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique – Soins Capillaires Naturels | Vadi Natural Care" },
      { name: "description", content: "Huiles, sprays, masques et accessoires naturels pour cheveux crépus et bouclés. Livraison partout au Cameroun." },
      { property: "og:title", content: "Boutique – Vadi Natural Care" },
      { property: "og:description", content: "Huiles, sprays et accessoires naturels pour cheveux crépus." },
    ],
  }),
  component: Boutique,
});

const filters: { key: Category | "tous"; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "soins", label: "Soins" },
  { key: "accessoires", label: "Accessoires" },
  { key: "packs", label: "Packs" },
];

function Boutique() {
  const [active, setActive] = useState<Category | "tous">("tous");
  const list = active === "tous" ? allProducts : allProducts.filter((p) => p.category === active);

  console.log("All products:", allProducts);
  console.log("Filtered list:", list);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <header className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Boutique</p>
        <h1 className="mt-2 font-display text-4xl text-cocoa md:text-5xl">Tous nos produits</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Soins naturels, accessoires et packs pensés pour vos cheveux texturés.
        </p>
      </header>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              active === f.key
                ? "bg-primary text-primary-foreground shadow"
                : "bg-secondary text-cocoa hover:bg-accent/30"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full text-center py-8">
          <p>Nombre de produits: {list.length}</p>
          <p>Produits totaux: {allProducts.length}</p>
        </div>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}