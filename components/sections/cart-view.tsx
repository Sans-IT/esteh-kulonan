"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Minus,
  Plus,
  Trash2,
  MessageCircle,
  ShoppingBag,
  Store,
  User,
  MapPin,
  Phone,
  Navigation,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FadeIn } from "@/components/motion/fade-in";
import { useCart } from "@/lib/cart-context";
import { branches, WA_NUMBER } from "@/lib/data";
import { cn } from "@/lib/utils";

function formatPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function EmptyCart({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-16 text-center">
      <ShoppingBag className="h-8 w-8 text-[var(--color-foreground)]/30" />
      <p className="text-sm text-[var(--color-foreground)]/60">Keranjang masih kosong</p>
      <Button
        asChild
        className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
      >
        <Link href="/menu" onClick={onNavigate}>
          Tambah Menu
        </Link>
      </Button>
    </div>
  );
}

/** Daftar item keranjang + kontrol qty — dipakai di sidebar dan halaman Order. */
function CartLinesList() {
  const { lines, updateQty, removeItem } = useCart();

  return (
    <div className="space-y-3">
      {lines.map((line) => (
        <div
          key={line.id}
          className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] p-3"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
              {line.name}
            </p>
            <p className="text-xs text-[var(--color-foreground)]/50">
              {line.size} · {formatPrice(line.price)}
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <div className="flex items-center gap-0.5 rounded-full border border-[var(--color-border)] px-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => updateQty(line.id, line.qty - 1)}
                aria-label="Kurangi"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-4 text-center text-xs font-medium">{line.qty}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => updateQty(line.id, line.qty + 1)}
                aria-label="Tambah"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-[var(--color-foreground)]/40 hover:text-destructive"
              onClick={() => removeItem(line.id)}
              aria-label={`Hapus ${line.name}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Isi keranjang ringkas — dipakai di dalam sidebar (Sheet) lewat navbar.
 * Checkout dari sini diarahkan ke halaman /order (bukan langsung WA) karena
 * pesanan perlu pilih cabang tujuan dulu di sana.
 */
export function CartContents({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, note, setNote, totalPrice, clear } = useCart();

  if (lines.length === 0) {
    return <EmptyCart onNavigate={onNavigate} />;
  }

  return (
    <>
      <div className="flex-1 space-y-3 overflow-y-auto px-5">
        <CartLinesList />
      </div>

      <div className="space-y-3 border-t border-[var(--color-border)] px-5 pt-4">
        <div>
          <label
            htmlFor="cart-note"
            className="text-xs font-medium text-[var(--color-foreground)]/60"
          >
            Catatan (opsional)
          </label>
          <Textarea
            id="cart-note"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 200))}
            placeholder="Mis. tidak terlalu manis, es dipisah, dll."
            rows={2}
            maxLength={200}
            className="mt-1.5 border-[var(--color-border)] text-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={clear}
            className="text-xs font-medium text-[var(--color-foreground)]/50 hover:text-destructive"
          >
            Kosongkan
          </button>
          <div className="text-right">
            <p className="text-xs text-[var(--color-foreground)]/50">Total</p>
            <p className="font-heading text-lg font-semibold text-[var(--color-primary)]">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        <Button
          asChild
          className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
        >
          <Link href="/order" onClick={onNavigate}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Lanjut ke Order
          </Link>
        </Button>
      </div>
    </>
  );
}

/**
 * Halaman Order penuh (`/order`). Berbeda dari mini-cart di sidebar: di sini
 * user pilih cabang tujuan, alamat, dan nomor WA tujuan sebelum pesanan
 * (lengkap dengan rincian item + total harga) dikirim langsung ke WhatsApp
 * cabang yang dipilih.
 *
 * Query param yang didukung (diisi otomatis dari link "Chat WA" di halaman
 * Cabang, atau dari CTA lain di situs):
 * - ?cabang=<nama cabang>
 * - ?wa=<nomor whatsapp tujuan>
 * - ?address=<alamat, langsung terisi di input alamat>
 */
export function CartView() {
  const searchParams = useSearchParams();
  const {
    lines,
    clear,
    note,
    setNote,
    totalItems,
    totalPrice,
    branchName,
    setBranchName,
    targetWaNumber,
    setTargetWaNumber,
    address,
    setAddress,
    customerName,
    setCustomerName,
    buildOrderWaLink,
  } = useCart();

  // Hanya jalan sekali per kunjungan (saat query param berubah) supaya tidak
  // menimpa input yang sudah diedit manual oleh user.
  const appliedQuery = useRef(false);
  useEffect(() => {
    if (appliedQuery.current) return;
    const qCabang = searchParams.get("cabang");
    const qWa = searchParams.get("wa");
    const qAddress = searchParams.get("address");
    if (qCabang) setBranchName(qCabang);
    if (qWa) setTargetWaNumber(qWa);
    if (qAddress) setAddress(qAddress);
    appliedQuery.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleBranchChange(value: string) {
    setBranchName(value);
    const branch = branches.find((b) => b.name === value);
    if (branch) {
      setTargetWaNumber(branch.wa);
      setAddress(branch.address);
    } else {
      setTargetWaNumber("");
    }
  }

  // Switch opsional: user bisa pilih pakai alamat yang ditulis manual, atau
  // "bagikan" lokasi saat ini (browser geolocation) supaya link Google Maps
  // ke titik itu otomatis masuk ke input alamat. Ini murni opsional — kalau
  // ditolak/gagal, user tetap bisa isi alamat manual seperti biasa.
  const [useMyLocation, setUseMyLocation] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  function handleToggleLocation(checked: boolean) {
    setUseMyLocation(checked);
    setLocationError("");
    if (!checked) return;

    if (!navigator.geolocation) {
      setLocationError("Perangkat/browser tidak mendukung fitur lokasi.");
      setUseMyLocation(false);
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setAddress(`Titik lokasi saya (share location): ${mapsLink}`);
        setLocating(false);
      },
      () => {
        setLocationError("Gagal mengambil lokasi. Izinkan akses lokasi lalu coba lagi.");
        setLocating(false);
        setUseMyLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 xl:px-10 md:py-16">
      <FadeIn>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Order
          </p>
          <h1 className="font-heading mt-2 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Selesaikan Pesananmu
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-foreground)]/60">
            Cek keranjang, pilih cabang tujuan, lalu kirim pesanan lengkap
            langsung ke WhatsApp cabang tersebut.
          </p>
        </div>
      </FadeIn>

      {lines.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <EmptyCart />
          </div>
        </FadeIn>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <FadeIn delay={0.08} className="lg:col-span-3">
            <div className="rounded-3xl border border-[var(--color-border)] p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-[var(--color-foreground)]">
                  Keranjang ({totalItems} item)
                </h2>
                <button
                  onClick={clear}
                  className="text-xs font-medium text-[var(--color-foreground)]/50 hover:text-destructive"
                >
                  Kosongkan
                </button>
              </div>
              <div className="mt-4">
                <CartLinesList />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="order-note"
                  className="text-xs font-medium text-[var(--color-foreground)]/60"
                >
                  Catatan (opsional)
                </label>
                <Textarea
                  id="order-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 200))}
                  placeholder="Mis. tidak terlalu manis, es dipisah, dll."
                  rows={2}
                  maxLength={200}
                  className="mt-1.5 border-[var(--color-border)] text-sm"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.16} className="lg:col-span-2">
            <div className="flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] p-5">
              <h2 className="font-heading text-base font-semibold text-[var(--color-foreground)]">
                Detail Pengiriman
              </h2>

              <div>
                <label
                  htmlFor="order-name"
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-foreground)]/60"
                >
                  <User className="h-3.5 w-3.5" /> Nama Pemesan
                </label>
                <Input
                  id="order-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama kamu"
                  className="mt-1.5 border-[var(--color-border)] text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="order-branch"
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-foreground)]/60"
                >
                  <Store className="h-3.5 w-3.5" /> Cabang Tujuan
                </label>
                <select
                  id="order-branch"
                  value={branchName}
                  onChange={(e) => handleBranchChange(e.target.value)}
                  className={cn(
                    "mt-1.5 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-foreground)] outline-none",
                    "focus-visible:border-[var(--color-primary)]/50"
                  )}
                >
                  <option value="">Pilih cabang terdekat...</option>
                  {branches.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-[var(--color-foreground)]/45">
                  Belum yakin? Cek dulu{" "}
                  <Link href="/cabang" className="font-medium text-[var(--color-primary)] hover:underline">
                    daftar cabang
                  </Link>
                  .
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="order-address"
                    className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-foreground)]/60"
                  >
                    <MapPin className="h-3.5 w-3.5" /> Alamat / Titik Ambil
                  </label>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="use-my-location"
                      className="text-[11px] font-medium text-[var(--color-foreground)]/50"
                    >
                      {locating ? (
                        <span className="flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" /> Mengambil lokasi...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" /> Lokasi saat ini
                        </span>
                      )}
                    </Label>
                    <Switch
                      id="use-my-location"
                      checked={useMyLocation}
                      onCheckedChange={handleToggleLocation}
                      disabled={locating}
                    />
                  </div>
                </div>
                <Textarea
                  id="order-address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (useMyLocation) setUseMyLocation(false);
                  }}
                  placeholder="Alamat lengkap atau patokan lokasi"
                  rows={2}
                  className="mt-1.5 border-[var(--color-border)] text-sm"
                />
                <p className="mt-1.5 text-[11px] text-[var(--color-foreground)]/45">
                  {useMyLocation
                    ? "Titik lokasimu (opsional dibagikan) sudah diisi otomatis — masih bisa diedit."
                    : "Bisa ketik manual, atau aktifkan \"Lokasi saat ini\" untuk membagikan titik lokasimu."}
                </p>
                {locationError && (
                  <p className="mt-1 text-[11px] text-destructive">{locationError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="order-wa"
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-foreground)]/60"
                >
                  <Phone className="h-3.5 w-3.5" /> Nomor WhatsApp Tujuan
                </label>
                <Input
                  id="order-wa"
                  inputMode="numeric"
                  value={targetWaNumber}
                  onChange={(e) => setTargetWaNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder={WA_NUMBER}
                  className="mt-1.5 border-[var(--color-border)] text-sm"
                />
                <p className="mt-1.5 text-[11px] text-[var(--color-foreground)]/45">
                  Terisi otomatis begitu kamu pilih cabang, tapi bisa diganti
                  manual kalau perlu.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                <p className="text-xs text-[var(--color-foreground)]/50">
                  Total ({totalItems} item)
                </p>
                <p className="font-heading text-lg font-semibold text-[var(--color-primary)]">
                  {formatPrice(totalPrice)}
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
              >
                <a href={buildOrderWaLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Kirim Pesanan ke WhatsApp
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      )}
    </section>
  );
}
