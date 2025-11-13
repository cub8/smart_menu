"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl shadow p-6 border">
        <h1 className="text-xl font-semibold mb-4">Zaloguj się</h1>

        {error && (
          <p className="mb-3 text-sm text-red-600">
            Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="you@domain.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Hasło</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border px-4 py-2 font-medium hover:bg-gray-50"
          >
            {loading ? "Logowanie..." : "Zaloguj"}
          </button>
        </form>
      </div>
    </main>
  );
}
