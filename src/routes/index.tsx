import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Truck, Shield, Star } from "lucide-react";
import hero from "@/assets/hero-afro.jpg";
import ingredients from "@/assets/ingredients-real.jpg";
import { products, packs } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vadi Natural Care – Soins Capillaires Naturels Cameroun" },
      { name: "description", content: "Découvrez nos soins naturels pour cheveux crépus et bouclés. Formulés au Cameroun avec karité, hibiscus et moringa." },
      { property: "og:title", content: "Vadi Natural Care – Soins Capillaires Naturels Cameroun" },
      { property: "og:description", content: "Soins naturels artisanaux pour cheveux crépus, bouclés et frisés. Made in Cameroon." },
      { property: "og:image", content: hero },
      { property: "twitter:image", content: hero },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-secondary/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-xs font-medium text-cocoa shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> 100% Naturel · Made in Cameroon
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-cocoa md:text-6xl">
              Prenez soin de vos cheveux <em className="text-primary not-italic">comme d'une couronne</em> ✨
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
              Soins capillaires artisanaux à base de karité, hibiscus, moringa et chébé. Pensés pour les cheveux crépus, bouclés et frisés.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:scale-105"
              >
                Découvrir la boutique
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center rounded-full border border-cocoa/20 bg-background px-7 py-3 text-sm font-semibold text-cocoa transition hover:border-primary hover:text-primary"
              >
                Mon quiz routine
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">+500 femmes nous font confiance</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
            <img
              src={hero}
              alt="Femme aux cheveux crépus naturels"
              width={1536}
              height={1536}
              className="aspect-square w-full rounded-[2.5rem] object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* USP */}
      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-6">
          {[
            { icon: Leaf, title: "100% naturel", text: "Ingrédients africains, sans silicones" },
            { icon: Sparkles, title: "Fait main", text: "Formules artisanales au Cameroun" },
            { icon: Truck, title: "Livraison Cameroun", text: "Partout, sous 48h" },
              { icon: Shield, title: "Paiement simple", text: "MTN MoMo, Orange Money ou à la livraison" },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base text-cocoa">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Nos soins</p>
            <h2 className="mt-2 font-display text-3xl text-cocoa md:text-4xl">Bestsellers</h2>
          </div>
          <Link to="/boutique" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            Voir toute la boutique →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="bg-secondary/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
          <img
            src={ingredients}
            alt="Ingrédients naturels: hibiscus, karité, moringa, romarin"
            width={1536}
            height={1024}
            loading="lazy"
            className="rounded-3xl object-cover shadow-xl"
          />
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Le pouvoir des plantes</p>
            <h2 className="mt-2 font-display text-3xl text-cocoa md:text-4xl">
              La nature africaine au cœur de chaque flacon
            </h2>
            <p className="mt-4 text-muted-foreground">
              Karité, hibiscus, moringa, fenugrec, chébé, romarin… Des actifs puissants sélectionnés pour nourrir,
              fortifier et sublimer vos cheveux texturés.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {["Karité du Nord", "Hibiscus", "Moringa", "Fenugrec", "Chébé du Tchad", "Romarin"].map((i) => (
                <li key={i} className="flex items-center gap-2 rounded-full bg-background px-4 py-2">
                  <Leaf className="h-4 w-4 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Économisez</p>
          <h2 className="mt-2 font-display text-3xl text-cocoa md:text-4xl">Nos packs routine</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {packs.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.5_0.18_5)] px-6 py-16 text-center text-primary-foreground shadow-2xl md:px-10">
          <h2 className="mx-auto max-w-2xl font-display text-3xl md:text-4xl">
            Pas sûre par où commencer ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Faites notre quiz et recevez en 1 minute la routine adaptée à votre type de cheveux.
          </p>
          <Link
            to="/quiz"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-background px-7 py-3 text-sm font-semibold text-primary transition hover:scale-105"
          >
            Faire le quiz routine ✨
          </Link>
        </div>
      </section>
    </>
  );
}
