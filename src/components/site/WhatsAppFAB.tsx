import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  const url = buildWhatsAppUrl("Bonjour Vadi Natural Care ✨");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        // Robust fallback for sandboxed iframes / popup blockers
        const w = window.open(url, "_blank", "noopener,noreferrer");
        if (!w) {
          window.location.href = url;
        }
        e.preventDefault();
      }}
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}