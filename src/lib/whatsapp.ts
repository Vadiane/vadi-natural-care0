import { formatFCFA, type Product } from "@/data/products";

export const WHATSAPP_PHONE = "237673733530";

type OrderLine = { product: Product; qty: number };

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppUrl({
  lines,
  subtotal,
  shipping,
  total,
  customer,
  payment,
}: {
  lines: OrderLine[];
  subtotal: number;
  shipping?: { region: string; amount: number };
  total?: number;
  customer?: { name: string; phone: string; email?: string; address: string };
  payment?: { label: string; info: string };
}) {
  const productLines = lines
    .map(({ product, qty }) => `• ${product.name} x${qty} — ${formatFCFA(product.price * qty)}`)
    .join("\n");

  const message = [
    "Bonjour Vadi Natural Care ✨",
    "",
    "Nouvelle commande :",
    productLines,
    "",
    `Sous-total : ${formatFCFA(subtotal)}`,
    shipping ? `Livraison (${shipping.region}) : ${formatFCFA(shipping.amount)}` : "Livraison : à confirmer sur WhatsApp",
    total ? `Total : ${formatFCFA(total)}` : `Total produits : ${formatFCFA(subtotal)}`,
    customer ? "" : undefined,
    customer ? `Client : ${customer.name}` : undefined,
    customer ? `Tel : ${customer.phone}` : undefined,
    customer?.email ? `Email : ${customer.email}` : undefined,
    customer ? `Adresse : ${customer.address}` : undefined,
    payment ? "" : undefined,
    payment ? `Mode de paiement : ${payment.label}` : undefined,
    payment?.info,
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppUrl(message);
}