import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import DeleteShoppingListButton from "@/app/components/DeleteShoppingListButton";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function ShoppingListPage() {
  const session = await getSession();
  if (!session?.user?.id) return <p className="p-10">Musisz być zalogowany</p>;

  const lists = await prisma.shoppingList.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
            Listy zakupowe
          </h1>
          <p className="text-sm text-zinc-300 mt-1">
            Wybierz listę, aby zobaczyć szczegóły.
          </p>
        </div>

        <Link
          href="/shopping-list/new"
          className="inline-flex w-fit items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition"
        >
          + Wygeneruj nową listę
        </Link>
      </div>

      {lists.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-zinc-300">
          Brak list zakupów. Kliknij <span className="font-semibold">“Wygeneruj nową listę”</span>.
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <li
              key={list.id}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm transition hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    Zakres dat
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white group-hover:text-violet-300 transition">
                    {formatDate(list.startDate)} → {formatDate(list.endDate)}
                  </h2>
                </div>

              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-zinc-400">
                  Utworzono: {formatDate(list.createdAt)}
                </p>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/shopping-list/${list.id}`}
                    className="inline-flex items-center rounded-xl border border-violet-400/40 bg-violet-600/10 px-3 py-1.5 text-sm font-medium text-violet-200 hover:bg-violet-600/20 transition"
                  >
                    Zobacz →
                  </Link>

                  <DeleteShoppingListButton id={list.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
