"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { waLink, waLinkTo, WA_NUMBER } from "@/lib/data";

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
  note: string;
  setNote: (note: string) => void;
  totalItems: number;
  totalPrice: number;
  checkoutWaLink: (branchName?: string) => string;
  // Konteks tujuan pesanan — dipakai di halaman /order supaya pesanan
  // (isi keranjang + total harga) langsung terkirim ke nomor WA cabang
  // yang dipilih user (bisa terisi otomatis lewat query ?cabang=&wa=&address=).
  branchName: string;
  setBranchName: (v: string) => void;
  targetWaNumber: string;
  setTargetWaNumber: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  customerName: string;
  setCustomerName: (v: string) => void;
  buildOrderWaLink: () => string;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "esteh-kulonan-cart";
const NOTE_STORAGE_KEY = "esteh-kulonan-cart-note";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [note, setNoteState] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const [branchName, setBranchName] = useState("");
  const [targetWaNumber, setTargetWaNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");

  // Muat keranjang + catatan dari localStorage sekali saat pertama render di client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
      const rawNote = window.localStorage.getItem(NOTE_STORAGE_KEY);
      if (rawNote) setNoteState(rawNote);
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

  // Simpan catatan (opsional) tiap kali berubah.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(NOTE_STORAGE_KEY, note);
    } catch {
      // abaikan
    }
  }, [note, hydrated]);

  function setNote(value: string) {
    setNoteState(value);
  }

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
    const noteText = note.trim() ? `\nCatatan: ${note.trim()}` : "";
    const message = `Halo, saya mau pesan:\n${itemsText}\n\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}${branchText}${noteText}`;
    return waLink(message);
  }

  // Dipakai khusus di halaman /order — pesan lengkap (item, qty, harga
  // satuan, subtotal, total, cabang tujuan, alamat, nama, catatan)
  // dikirim langsung ke nomor WA cabang yang dipilih (fallback ke nomor
  // WA pusat kalau belum pilih cabang).
  function buildOrderWaLink() {
    const target = targetWaNumber.trim() || WA_NUMBER;

    if (lines.length === 0) {
      const emptyMsg = [
        "Halo, saya mau pesan Es Teh Kulonan.",
        customerName.trim() ? `Nama: ${customerName.trim()}` : "",
        branchName.trim() ? `Cabang: ${branchName.trim()}` : "",
        address.trim() ? `Alamat: ${address.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      return waLinkTo(target, emptyMsg);
    }

    const itemsText = lines
      .map(
        (l, i) =>
          `${i + 1}. ${l.name} (${l.size}) x${l.qty} = Rp ${(l.qty * l.price).toLocaleString("id-ID")}`
      )
      .join("\n");

    const lines2 = [
      "Halo, saya mau pesan Es Teh Kulonan:",
      itemsText,
      "",
      `Total (${totalItems} item): Rp ${totalPrice.toLocaleString("id-ID")}`,
      customerName.trim() ? `Nama: ${customerName.trim()}` : "",
      branchName.trim() ? `Cabang tujuan: ${branchName.trim()}` : "",
      address.trim() ? `Alamat: ${address.trim()}` : "",
      note.trim() ? `Catatan: ${note.trim()}` : "",
    ].filter(Boolean);

    return waLinkTo(target, lines2.join("\n"));
  }

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        updateQty,
        clear,
        note,
        setNote,
        totalItems,
        totalPrice,
        checkoutWaLink,
        branchName,
        setBranchName,
        targetWaNumber,
        setTargetWaNumber,
        address,
        setAddress,
        customerName,
        setCustomerName,
        buildOrderWaLink,
      }}
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
