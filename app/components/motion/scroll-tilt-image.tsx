"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bungkus gambar/video (mis. <DriveMedia />) supaya punya efek "3D"
 * ringan saat discroll: sedikit rotasi di sumbu X/Y + scale, mengikuti
 * posisi elemen relatif ke viewport. Sengaja dipakai hanya di beberapa
 * gambar kunci (hero, menu andalan) — jangan ditempel ke semua gambar
 * biar tetap terasa spesial, bukan ramai/berlebihan.
 */
export function ScrollTiltImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  return (
    <div ref={ref} style={{ perspective: 1200 }} className={cn("w-full", className)}>
      <motion.div style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
