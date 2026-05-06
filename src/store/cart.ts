import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allProducts, type Product } from "@/data/products";

export type CartItem = { id: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...s.items, { id, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "vadi-cart" }
  )
);

export const getCartDetailed = (items: CartItem[]) =>
  items
    .map((i) => {
      const p = allProducts.find((p) => p.id === i.id);
      return p ? { product: p, qty: i.qty } : null;
    })
    .filter((x): x is { product: Product; qty: number } => !!x);

export const cartTotal = (items: CartItem[]) =>
  getCartDetailed(items).reduce((sum, { product, qty }) => sum + product.price * qty, 0);

export const cartCount = (items: CartItem[]) =>
  items.reduce((s, i) => s + i.qty, 0);