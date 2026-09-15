"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, ShoppingBag, HelpCircle, MapPin } from "lucide-react";
import { orderLink, waLink, PHONE_DISPLAY } from "@/lib/data";

const quickActions = [
  {
    icon: ShoppingBag,
    title: "Buat Pesanan",
    desc: "Pilih menu & langsung ke halaman order",
    href: orderLink(),
    internal: true,
  },
  {
    icon: MapPin,
    title: "Cari Cabang Terdekat",
    desc: "Lihat lokasi & peta semua cabang",
    href: "/cabang",
    internal: true,
  },
  {
    icon: HelpCircle,
    title: "Tanya Customer Service",
    desc: `Chat langsung CS kami (${PHONE_DISPLAY})`,
    href: waLink("Halo, saya butuh bantuan customer service Es Teh Kulonan"),
    internal: false,
  },
];

/**
 * Floating web-chat "Customer Service" — muncul di semua halaman (dipasang
 * di layout global). Beda dari CartSidebar: ini pusat bantuan cepat, bukan
 * keranjang belanja.
 */
export function CustomerServiceChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl"
          >
            <div className="flex items-center justify-between bg-[var(--color-primary)] px-5 py-4 text-[var(--color-primary-foreground)]">
              <div>
                <p className="font-heading text-base font-semibold">Butuh Bantuan?</p>
                <p className="text-xs opacity-80">Tim kami siap bantu pesanan kamu</p>
              </div>
              <button
                aria-label="Tutup chat"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 opacity-80 transition-opacity hover:bg-white/10 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 p-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const content = (
                  <>
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--color-foreground)]">
                        {action.title}
                      </span>
                      <span className="block truncate text-xs text-[var(--color-foreground)]/55">
                        {action.desc}
                      </span>
                    </span>
                  </>
                );

                return action.internal ? (
                  <Link
                    key={action.title}
                    href={action.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-muted)]"
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    key={action.title}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-muted)]"
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Tutup customer service" : "Buka customer service"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg shadow-[var(--color-primary)]/30"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
