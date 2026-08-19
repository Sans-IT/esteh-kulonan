"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { waLink } from "@/lib/data";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  size: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (item: { id: string; name: string; price: number; size: string }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutWaLink: (branchName?: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "esteh-kulonan-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Muat keranjang dari localStorage sekali saat pertama render di client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // abaikan, mulai dengan keranjang kosong
    }
    setHydrated(true);
  }, []);

  // Simpan tiap kali keranjang berubah.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage penuh/diblokir, abaikan
    }
  }, [lines, hydrated]);

  function addItem(item: { id: string; name: string; price: number; size: string }) {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === item.id);
      if (existing) {
        return prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeItem(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  }

  function clear() {
    setLines([]);
  }

  const totalItems = lines.reduce((sum, l) => sum + l.qty, 0);
  const totalPrice = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

  function checkoutWaLink(branchName?: string) {
    if (lines.length === 0) {
      return waLink("Halo, saya mau pesan Es Teh Kulonan");
    }
    const itemsText = lines
      .map((l) => `- ${l.name} (${l.size}) x${l.qty} = Rp ${(l.qty * l.price).toLocaleString("id-ID")}`)
      .join("\n");
    const branchText = branchName ? `\nCabang: ${branchName}` : "";
    const message = `Halo, saya mau pesan:\n${itemsText}\n\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}${branchText}`;
    return waLink(message);
  }

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, updateQty, clear, totalItems, totalPrice, checkoutWaLink }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam <CartProvider>");
  return ctx;
}
