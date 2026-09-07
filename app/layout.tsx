import { Geist, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import "./brand-theme.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { QueryProvider } from "@/lib/query-provider"
import { CustomerServiceChat } from "@/components/sections/customer-service-chat"
import { cn } from "@/lib/utils";

const dmSerifDisplay = localFont({
  src: [
    {
      path: "../public/fonts/DMSerifDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DMSerifDisplay-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-heading",
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
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable, dmSerifDisplay.variable)}
    >
      <body>
        <QueryProvider>
          <ThemeProvider>
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
