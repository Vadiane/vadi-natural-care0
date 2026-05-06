import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { allProducts, formatFCFA } from "@/data/products";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz Routine Capillaire – Vadi Natural Care" },
      { name: "description", content: "Découvrez en 3 questions la routine de soins parfaite pour vos cheveux naturels." },
      { property: "og:title", content: "Quiz Routine Capillaire" },
      { property: "og:description", content: "Trouvez votre routine personnalisée Vadi Natural Care." },
    ],
  }),
  component: QuizPage,
});

const questions = [
  {
    key: "type",
    label: "Quel est votre type de cheveux ?",
    options: ["Crépus (4A-4C)", "Bouclés (3A-3C)", "Frisés (2A-2C)", "Mixtes / Locks"],
  },
  {
    key: "issue",
    label: "Votre problématique principale ?",
    options: ["Pousse lente / chute", "Sécheresse", "Pellicules / cuir chevelu sensible", "Casse / pointes abîmées"],
  },
  {
    key: "freq",
    label: "Combien de temps pouvez-vous consacrer à votre routine ?",
    options: ["5 minutes par jour", "30 minutes / semaine", "1h par semaine", "Routine intensive"],
  },
] as const;

function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const choose = (val: string) => {
    const k = questions[step].key;
    const next = { ...answers, [k]: val };
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => { setAnswers({}); setStep(0); setDone(false); };

  const reco = (() => {
    if (!done) return [];
    const ids: string[] = [];
    if (answers.issue?.startsWith("Pousse")) ids.push("p2", "a6", "a3");
    else if (answers.issue?.startsWith("Sécheresse")) ids.push("p1", "a1", "p2");
    else if (answers.issue?.startsWith("Pellicules")) ids.push("p1", "a2");
    else ids.push("p1", "p2", "a1");
    return allProducts.filter((p) => ids.includes(p.id));
  })();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <div className="text-center">
        <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl text-cocoa md:text-5xl">Votre routine personnalisée</h1>
        <p className="mt-3 text-muted-foreground">3 questions pour révéler la routine idéale de votre couronne ✨</p>
      </div>

      <div className="mt-10">
        {!done && (
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-primary transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Question {step + 1} / {questions.length}</p>
              <h2 className="mt-2 font-display text-2xl text-cocoa">{questions[step].label}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {questions[step].options.map((o) => (
                  <button
                    key={o}
                    onClick={() => choose(o)}
                    className="rounded-xl border border-border bg-background p-4 text-left text-sm font-medium text-cocoa transition hover:border-primary hover:bg-primary/5"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm"
            >
              <h2 className="font-display text-2xl text-cocoa">Votre routine recommandée</h2>
              <p className="mt-1 text-sm text-muted-foreground">Basée sur vos réponses : {Object.values(answers).join(" • ")}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {reco.map((p) => (
                  <Link key={p.id} to="/produit/$slug" params={{ slug: p.slug }} className="group flex flex-col rounded-xl border border-border bg-background p-3 hover:border-primary">
                    <div className="aspect-square overflow-hidden rounded-lg bg-secondary/40">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-cocoa">{p.name}</p>
                    <p className="text-xs text-primary">{formatFCFA(p.price)}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/boutique" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow">
                  Voir tous les produits <ArrowRight className="h-4 w-4" />
                </Link>
                <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-cocoa hover:border-primary">
                  <RotateCcw className="h-4 w-4" /> Recommencer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}