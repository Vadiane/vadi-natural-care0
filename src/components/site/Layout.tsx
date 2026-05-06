import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFAB } from "./WhatsAppFAB";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}