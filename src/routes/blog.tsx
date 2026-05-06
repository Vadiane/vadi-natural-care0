import { createFileRoute, Link } from "@tanstack/react-router";
import ingredients from "@/assets/ingredients.jpg";
import founder from "@/assets/founder.jpeg";
import hero from "@/assets/hero-vadi.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog – Conseils Soins Capillaires Naturels | Vadi Natural Care" },
      { name: "description", content: "Routines, ingrédients et astuces pour cheveux crépus, bouclés et frisés. Le blog Vadi Natural Care." },
      { property: "og:title", content: "Blog Vadi Natural Care" },
      { property: "og:description", content: "Conseils experts pour prendre soin de vos cheveux naturels." },
      { property: "og:image", content: ingredients },
    ],
  }),
  component: BlogPage,
});

const articles = [
  {
    slug: "routine-pousse-cheveux-crepus",
    title: "Routine pousse : 5 étapes pour des cheveux crépus en bonne santé",
    excerpt: "Massages, huile fortifiante et protection : la méthode Vadi pour activer la pousse en douceur.",
    image: hero,
    date: "12 mars 2026",
    cat: "Routine",
  },
  {
    slug: "hibiscus-chebe-moringa",
    title: "Hibiscus, chébé, moringa : les superpouvoirs des plantes africaines",
    excerpt: "Trois ingrédients ancestraux qui transforment la fibre capillaire des femmes noires.",
    image: ingredients,
    date: "28 février 2026",
    cat: "Ingrédients",
  },
  {
    slug: "hydratation-vs-nutrition",
    title: "Hydratation vs nutrition : comprendre la différence",
    excerpt: "Eau, huile, beurre : à quoi sert vraiment chaque texture dans votre routine ?",
    image: founder,
    date: "10 février 2026",
    cat: "Conseils",
  },
];

function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-cocoa md:text-5xl">Le journal Vadi</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Conseils, ingrédients et routines pour prendre soin de vos cheveux comme d'une couronne.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article key={a.slug} className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{a.cat}</span>
                <span>{a.date}</span>
              </div>
              <h2 className="mt-3 font-display text-xl leading-snug text-cocoa group-hover:text-primary">{a.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">Lire l'article →</Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-8 text-center md:p-12">
        <h2 className="font-display text-3xl text-cocoa">Rejoignez la newsletter Vadi</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">Recevez chaque mois des conseils exclusifs et -10% sur votre prochaine commande.</p>
        <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="votre@email.com" className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm focus:border-primary focus:outline-none" />
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}