import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, getCartDetailed, cartTotal } from "@/store/cart";
import { formatFCFA } from "@/data/products";

const regions: Record<string, number> = {
  "Douala": 1000,
  "Yaoundé": 1500,
  "Bafoussam": 2500,
  "Bamenda": 3000,
  "Garoua": 3500,
  "Maroua": 4000,
  "Autre ville": 3000,
};

const paymentMethods = [
  { id: "mtn", label: "MTN Mobile Money", info: "Le numéro MoMo vous sera transmis sur WhatsApp après confirmation." },
  { id: "orange", label: "Orange Money", info: "Le numéro Orange Money vous sera transmis sur WhatsApp après confirmation." },
  { id: "livraison", label: "Paiement à la livraison (Douala)", info: "Réglez en espèces à la réception (Douala uniquement)." },
] as const;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Commande – Vadi Natural Care" },
      { name: "description", content: "Finalisez votre commande Vadi Natural Care en quelques clics." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, clear } = useCart();
  const detailed = getCartDetailed(items);
  const subtotal = cartTotal(items);

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", region: "Yaoundé", payment: "mtn" as (typeof paymentMethods)[number]["id"] });

  const shipping = regions[form.region] ?? 3000;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Aucun article à commander</h1>
        <Link to="/boutique" className="mt-4 inline-block text-primary hover:underline">← Boutique</Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    const method = paymentMethods.find((p) => p.id === form.payment)!;
    const lines = detailed
      .map((d) => `• ${d.product.name} x${d.qty} — ${formatFCFA(d.product.price * d.qty)}`)
      .join("%0A");
    const message =
      `Bonjour Vadi Natural Care ✨%0A%0ANouvelle commande :%0A${lines}` +
      `%0A%0ASous-total : ${formatFCFA(subtotal)}` +
      `%0ALivraison (${form.region}) : ${formatFCFA(shipping)}` +
      `%0A*Total : ${formatFCFA(total)}*` +
      `%0A%0AClient : ${form.name}%0ATel : ${form.phone}%0AEmail : ${form.email}%0AAdresse : ${form.address}` +
      `%0A%0AMode de paiement : ${method.label}%0A${method.info}`;
    const url = `https://wa.me/237673733530?text=${message}`;
    clear();
    window.location.href = url;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h1 className="mb-8 font-display text-4xl text-cocoa">Commande</h1>
      <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6 rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="font-display text-xl">Vos informations</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom complet *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Téléphone *" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Région *</label>
              <select
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              >
                {Object.keys(regions).map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Field label="Adresse de livraison *" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl">Mode de paiement</h2>
            <div className="space-y-2">
              {paymentMethods.map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${form.payment === m.id ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === m.id}
                    onChange={() => setForm({ ...form, payment: m.id })}
                    className="mt-1 accent-[oklch(0.62_0.17_0)]"
                  />
                  <div>
                    <div className="font-medium">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.info}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl bg-secondary/60 p-6">
          <h2 className="font-display text-xl">Votre commande</h2>
          <ul className="space-y-2 text-sm">
            {detailed.map((d) => (
              <li key={d.product.id} className="flex justify-between">
                <span>{d.product.name} ×{d.qty}</span>
                <span>{formatFCFA(d.product.price * d.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-3 text-sm">
            <div className="flex justify-between"><span>Sous-total</span><span>{formatFCFA(subtotal)}</span></div>
            <div className="flex justify-between"><span>Livraison</span><span>{formatFCFA(shipping)}</span></div>
          </div>
          <div className="flex justify-between border-t border-border pt-3 font-display text-lg">
            <span>Total</span><span className="text-primary">{formatFCFA(total)}</span>
          </div>
          <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg">
            Confirmer via WhatsApp
          </button>
          <p className="text-xs text-muted-foreground">Vous serez redirigée vers WhatsApp avec les détails de votre commande.</p>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}