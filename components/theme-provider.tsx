"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Website ini dikunci ke light mode saja — tidak ada toggle atau
// deteksi preferensi sistem untuk dark mode.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
