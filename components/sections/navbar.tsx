"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { CartSidebar } from "@/components/sections/cart-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/menu", label: "Menu" },
  { href: "/ulasan", label: "Ulasan" },
  { href: "/cabang", label: "Cabang" },
  { href: "/franchise", label: "Franchise" },
  { href: "/order", label: "Order" },
]

function initialOf(nameOrEmail: string) {
  return nameOrEmail.trim().charAt(0).toUpperCase() || "?"
}

/** Kontrol akun di navbar: tombol "Masuk" kalau belum login, avatar + dropdown kalau sudah. */
function NavAuth({ mobile = false }: { mobile?: boolean }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [imgFailed, setImgFailed] = useState(false)

  if (isPending) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--color-muted)]" />
    )
  }

  if (!session?.user) {
    return (
      <Button
        asChild
        // size={mobile ? "default" : "sm"}
        className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
      >
        <Link href="/login">Masuk</Link>
      </Button>
    )
  }

  const { user } = session

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Akun ${user.name || user.email}`}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-primary)]/10 text-sm font-semibold text-[var(--color-primary)]"
        >
          {user.image && !imgFailed ? (
            // Foto profil Google butuh referrerPolicy="no-referrer" — kalau
            // tidak, sebagian browser memblokir request-nya (gambar gagal
            // tampil walau URL-nya valid). Kalau tetap gagal, jatuh balik
            // ke inisial nama/email. Pakai <img> biasa (bukan next/image)
            // supaya tidak wajib width/height dan tidak perlu daftar
            // domain di next.config.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            initialOf(user.name || user.email || "?")
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
            {user.name || "Pengguna"}
          </p>
          <p className="truncate text-xs font-normal text-[var(--color-foreground)]/50">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/ulasan">
            <User className="h-4 w-4" /> Ulasan Saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut()
            router.push("/")
            router.refresh()
          }}
        >
          <LogOut className="h-4 w-4" /> Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 xl:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-10" />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-colors hover:text-[var(--color-primary)]",
                  active
                    ? "font-bold text-[var(--color-primary)]"
                    : "font-medium text-[var(--color-foreground)]/70"
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute right-0 -bottom-[17px] left-0 h-0.5 rounded-full bg-[var(--color-primary)]" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <CartSidebar />
          <NavAuth />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle mobile />
          <CartSidebar mobile />
          <button aria-label="Buka menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm",
                    active
                      ? "font-bold text-[var(--color-primary)]"
                      : "font-medium text-[var(--color-foreground)]/70"
                  )}
                >
                  {l.label}
                </Link>
              )
            })}
            <div className="mt-2">
              <NavAuth mobile />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
