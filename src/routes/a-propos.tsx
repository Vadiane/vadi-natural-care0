import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Leaf, Sparkles, Users } from "lucide-react";
import founder from "@/assets/founder-vadiane.png";
import ingredients from "@/assets/ingredients-real.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Notre histoire – Vadi Natural Care" },
      { name: "description", content: "Vadi Natural Care, marque camerounaise fondée par Vadiane NYA à Douala. Soins capillaires naturels pour cheveux afro." },
      { property: "og:title", content: "L'histoire de Vadi Natural Care" },
      { property: "og:description", content: "Une marque camerounaise née de l'amour des cheveux naturels." },
      { property: "og:image", content: founder },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Leaf, title: "Naturel", text: "Des formules à base de plantes africaines, sans silicones ni sulfates." },
  { icon: Heart, title: "Bienveillance", text: "Chaque routine célèbre la beauté unique des cheveux afro." },
  { icon: Sparkles, title: "Efficacité", text: "Des résultats visibles, validés par notre communauté." },
  { icon: Users, title: "Communauté", text: "Une marque par et pour les femmes noires, fière de ses racines." },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Notre histoire</span>
            <h1 className="mt-4 font-display text-4xl text-cocoa md:text-5xl">Une couronne, une mission ✨</h1>
            <p className="mt-4 leading-relaxed text-cocoa/80">
              Vadi Natural Care est née à Douala, au Cameroun, de la passion de Vadiane NYA,
              convaincue que les cheveux crépus, bouclés et frisés méritent des soins à la hauteur de leur beauté.
              Inspirées de traditions africaines et boostées par la science cosmétique,
              nos formules réveillent la santé, la pousse et la définition des cheveux naturels.
            </p>
            <p className="mt-3 leading-relaxed text-cocoa/80">
              Chaque flacon est conçu artisanalement à Douala avec des ingrédients locaux :
              hibiscus, chébé, moringa, romarin, fenugrec et huile d'olive.
            </p>
          </div>
          <div className="relative">
            <img src={founder} alt="Vadiane NYA, fondatrice de Vadi Natural Care" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-4 shadow-xl md:block">
              <p className="font-display text-lg text-cocoa">"Vos cheveux sont votre couronne."</p>
              <p className="text-xs text-muted-foreground">— Vadiane NYA, fondatrice · Douala</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h2 className="text-center font-display text-3xl text-cocoa">Nos valeurs</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
              <Icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg text-cocoa">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6">
          <img src={ingredients} alt="Ingrédients naturels" className="rounded-3xl object-cover shadow-xl" />
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl text-cocoa">L'Afrique au cœur de chaque formule</h2>
            <p className="mt-4 leading-relaxed text-cocoa/80">
              De l'hibiscus du Sahel au chébé tchadien, en passant par le moringa et le romarin,
              nous sélectionnons des ingrédients reconnus depuis des générations pour leurs vertus capillaires.
            </p>
            <Link to="/boutique" className="mt-6 inline-flex w-fit rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg">
              Découvrir nos soins
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}