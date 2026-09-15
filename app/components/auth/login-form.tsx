"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GoogleIcon } from "@/components/icons/social-icons";
import { signIn, signUp } from "@/lib/auth-client";

const CALLBACK_URL = "/";

function GoogleButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn.social({ provider: "google", callbackURL: CALLBACK_URL });
      }}
      className="w-full gap-2 border-[var(--color-border)]"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <GoogleIcon className="h-4 w-4" />
      )}
      {label}
    </Button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-[var(--color-border)]" />
      <span className="text-[11px] uppercase tracking-wide text-[var(--color-foreground)]/40">
        Atau
      </span>
      <span className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}

function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await signIn.email(
      { email, password, callbackURL: CALLBACK_URL },
      {
        onError: (ctx) => {
          setError(ctx.error.message || "Email atau kata sandi salah.");
          setLoading(false);
        },
        onSuccess: () => {
          router.push(CALLBACK_URL);
          router.refresh();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoogleButton label="Masuk dengan Google" />
      <Divider />

      <div className="space-y-1.5">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          className="border-[var(--color-border)]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signin-password">Kata Sandi</Label>
        <Input
          id="signin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border-[var(--color-border)]"
        />
      </div>

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="mt-1 w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Masuk"}
      </Button>
    </form>
  );
}

function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await signUp.email(
      { name, email, password, callbackURL: CALLBACK_URL },
      {
        onError: (ctx) => {
          setError(ctx.error.message || "Pendaftaran gagal, coba lagi.");
          setLoading(false);
        },
        onSuccess: () => {
          router.push(CALLBACK_URL);
          router.refresh();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoogleButton label="Daftar dengan Google" />
      <Divider />

      <div className="space-y-1.5">
        <Label htmlFor="signup-name">Nama</Label>
        <Input
          id="signup-name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kamu"
          className="border-[var(--color-border)]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          className="border-[var(--color-border)]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password">Kata Sandi</Label>
        <Input
          id="signup-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 8 karakter"
          className="border-[var(--color-border)]"
        />
      </div>

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="mt-1 w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Daftar"}
      </Button>
    </form>
  );
}

/**
 * Kartu Masuk/Daftar (shadcn-style) dengan 2 tab: Masuk & Daftar, masing"
 * punya opsi Google OAuth atau email + kata sandi manual.
 */
export function LoginCard() {
  return (
    <Card className="w-full max-w-sm border-[var(--color-border)] p-6 sm:p-8">
      <div className="text-center">
        <h1 className="font-heading text-xl font-semibold text-[var(--color-foreground)]">
          Selamat Datang
        </h1>
        <p className="mt-1.5 text-sm text-[var(--color-foreground)]/55">
          Masuk untuk memesan lebih cepat & menulis ulasan.
        </p>
      </div>

      <Tabs defaultValue="signin" className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="signin">Masuk</TabsTrigger>
          <TabsTrigger value="signup">Daftar</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
