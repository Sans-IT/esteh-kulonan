"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, MonitorCog } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const order = ["light", "dark", "system"] as const;
type ThemeName = (typeof order)[number];

const icons: Record<ThemeName, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: MonitorCog,
};

const labels: Record<ThemeName, string> = {
  light: "Mode terang",
  dark: "Mode gelap",
  system: "Ikuti sistem",
};

/**
 * Dropdown pemilih tema: Terang / Gelap / Ikuti Sistem.
 * Dipasang di navbar (desktop & mobile).
 */
export function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hindari mismatch hydration: next-themes baru tahu tema sebenarnya di client.
  useEffect(() => setMounted(true), []);

  const current = (mounted ? (theme as ThemeName) : "system") ?? "system";
  const Icon = icons[current] ?? MonitorCog;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Ganti tema (sekarang: ${labels[current]})`}
          title={labels[current]}
          className={cn(
            mobile
              ? "relative p-1 text-[var(--color-foreground)]"
              : "relative rounded-full border border-[var(--color-border)] p-2.5 text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)]/40"
          )}
        >
          <Icon className={mobile ? "h-6 w-6" : "h-4 w-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? "start" : "end"}>
        <DropdownMenuRadioGroup value={current} onValueChange={(value) => setTheme(value)}>
          {order.map((name) => {
            const OptionIcon = icons[name];
            return (
              <DropdownMenuRadioItem key={name} value={name}>
                <OptionIcon className="h-4 w-4 text-[var(--color-foreground)]/70" />
                {labels[name]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
