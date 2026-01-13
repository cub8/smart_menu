"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function formatDDMMYY(value: string) {
  if (!value) return "";
  const [yyyy, mm, dd] = value.split("-");
  if (!yyyy || !mm || !dd) return value;
  return `${dd}/${mm}/${yyyy.slice(2)}`;
}

export default function NewShoppingListPage() {
  const router = useRouter();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const hint = useMemo(() => {
    if (!start && !end) return null;
    const s = start ? formatDDMMYY(start) : "__/__/__";
    const e = end ? formatDDMMYY(end) : "__/__/__";
    return `Wybrany zakres: ${s} → ${e}`;
  }, [start, end]);

  async function handleGenerate() {
    if (!start || !end) {
      alert("Wybierz zarówno datę początkową, jak i końcową");
      return;
    }

    if (start > end) {
      alert("Data końcowa nie może być wcześniejsza niż początkowa.");
      return;
    }

    try {
      const res = await fetch("/api/shopping-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Nie udało się wygenerować listy zakupów");

      router.push("/shopping-list");
    } catch (err) {
      console.error(err);
      alert("Wystąpił błąd przy tworzeniu listy zakupów");
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/shopping-list"
          className="rounded-xl border border-violet-400/40 bg-violet-600/10 px-3 py-1 text-sm font-medium text-violet-200 hover:bg-violet-600/20 transition"
        >
          Listy zakupowe
        </Link>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-violet-400/40 bg-violet-600/10 px-3 py-1 text-sm font-medium text-violet-200 hover:bg-violet-600/20 transition"
        >
          Cofnij
        </button>
      </div>

      <h1 className="text-2xl font-semibold text-zinc-100">
        Nowa lista zakupów
      </h1>
      <p className="mt-1 text-sm text-zinc-300">
        Format wyświetlania: <span className="font-medium">DD/MM/YY</span>
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-200">Data od</label>

            <div
              className="group relative rounded-2xl border border-zinc-700 bg-zinc-950/50 shadow-sm transition
                         hover:border-violet-500/60
                         focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/35 focus-within:shadow-[0_0_0_6px_rgba(139,92,246,0.08)]"
            >
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-300 transition">
                📅
              </span>

              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="h-11 w-full rounded-2xl bg-transparent pl-10 pr-3 text-zinc-100 outline-none"
              />
            </div>

            {start ? (
              <p className="text-xs text-zinc-400">
                Wybrano: <span className="text-zinc-200">{formatDDMMYY(start)}</span>
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-200">Data do</label>

            <div
              className="group relative rounded-2xl border border-zinc-700 bg-zinc-950/50 shadow-sm transition
                         hover:border-violet-500/60
                         focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/35 focus-within:shadow-[0_0_0_6px_rgba(139,92,246,0.08)]"
            >
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-300 transition">
                📅
              </span>

              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="h-11 w-full rounded-2xl bg-transparent pl-10 pr-3 text-zinc-100 outline-none"
              />
            </div>

            {end ? (
              <p className="text-xs text-zinc-400">
                Wybrano: <span className="text-zinc-200">{formatDDMMYY(end)}</span>
              </p>
            ) : null}
          </div>
        </div>

        {hint ? <p className="mt-4 text-sm text-zinc-300">{hint}</p> : null}

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm
                       hover:bg-violet-500 hover:shadow
                       active:scale-[0.99]
                       transition"
          >
            Generuj listę
          </button>
        </div>
      </div>
    </div>
  );
}
