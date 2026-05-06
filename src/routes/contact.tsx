import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact – Vadi Natural Care" },
      { name: "description", content: "Contactez l'équipe Vadi Natural Care : conseils, commandes et collaborations au Cameroun." },
      { property: "og:title", content: "Contact Vadi Natural Care" },
      { property: "og:description", content: "Une question ? Notre équipe vous répond avec amour." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(80),
  email: z.string().trim().email("Email invalide").max(200),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setLoading(true);
    const text = `Bonjour Vadi Natural Care ✨%0A%0A${encodeURIComponent(result.data.message)}%0A%0A— ${encodeURIComponent(result.data.name)} (${encodeURIComponent(result.data.email)})`;
    window.open(`https://wa.me/237673733530?text=${text}`, "_blank");
    toast.success("Merci ! Nous vous répondons rapidement sur WhatsApp.");
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-cocoa md:text-5xl">Contactez-nous</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Une question, un conseil, une collaboration ? L'équipe Vadi vous répond avec amour.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 md:p-8">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Nom complet</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={200}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Message</label>
            <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </div>
          <button disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg disabled:opacity-50">
            {loading ? "Envoi…" : "Envoyer via WhatsApp"}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-secondary/60 p-6">
            <h2 className="font-display text-xl">Coordonnées</h2>
            <ul className="mt-4 space-y-3 text-sm text-cocoa/80">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +237 673 733 530</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> contact@vadinaturalcare.cm</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Yaoundé, Cameroun</li>
              <li className="flex items-center gap-3"><Instagram className="h-4 w-4 text-primary" /> @vadhinaturalcare</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-6">
            <h3 className="font-display text-lg text-cocoa">Horaires</h3>
            <p className="mt-2 text-sm text-cocoa/80">Lundi → Samedi · 8h – 19h<br />Réponse WhatsApp en moins d'une heure.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}