"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
};

/**
 * Animasi fade-in + slide-up ringan, hanya jalan SEKALI saat elemen
 * pertama kali muncul di layar (mount pertama kali buka halaman) —
 * bukan animasi scroll berulang. Pakai `delay` (detik) untuk bikin
 * beberapa elemen muncul bertahap (staggered), misal heading dulu,
 * lalu subjudul, baru tombol.
 */
export function FadeIn({ children, delay = 0, y = 16, className, as = "div" }: FadeInProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
