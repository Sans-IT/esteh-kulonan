import { Geist, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import "./brand-theme.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { QueryProvider } from "@/lib/query-provider"
import { CustomerServiceChat } from "@/components/sections/customer-service-chat"
import { BackgroundPattern } from "@/components/background-pattern"
import { cn } from "@/lib/utils";

// Font judul (heading) khas — dipakai untuk semua judul/h1-h2-h3 di situs.
const batikBlend = localFont({
  src: [
    {
      path: "../public/fonts/BatikBlend-One.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-heading",
});

// Font isi/penjelasan bergaya dekoratif — dipakai untuk paragraf narasi
// (cerita brand, tentang kami, dsb), bukan untuk teks UI (tombol, form, menu).
const soulOfJava = localFont({
  src: [
    {
      path: "../public/fonts/TheSoulOfJava-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-body-decorative",
});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-mono",
        jetbrainsMono.variable,
        batikBlend.variable,
        soulOfJava.variable
      )}
    >
      <body>
        <QueryProvider>
          <ThemeProvider>
            <BackgroundPattern />
            <CartProvider>
              {children}
              <CustomerServiceChat />
            </CartProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
