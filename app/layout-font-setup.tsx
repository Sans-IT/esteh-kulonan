/**
 * Tempel bagian ini ke app/layout.tsx yang sudah ada.
 * Jangan timpa file layout.tsx-mu sepenuhnya — cukup gabungkan
 * import font, konfigurasi font, className body, dan import CSS berikut.
 */

import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./brand-theme.css"; // <- tambahkan setelah import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

// Di dalam RootLayout, gabungkan variable font ke className <body>:
// <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
