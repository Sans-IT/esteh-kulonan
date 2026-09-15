"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInViewProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Sama seperti <FadeIn/>, tapi animasinya baru jalan saat elemen masuk ke
 * viewport (scroll-triggered), bukan langsung saat mount. Cocok dipakai di
 * section yang letaknya di bawah — biar animasi tidak numpuk semua di awal
 * load halaman. Hanya jalan sekali per elemen (once: true).
 */
export function FadeInView({ children, delay = 0, y = 24, className }: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
