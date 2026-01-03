import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

type ShoppingItem = { name: string; amount: number };

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function ShoppingListDetailPage({ params }: Props) {
  const session = await getSession();
  if (!session?.user?.id) return <p className="p-10">Musisz być zalogowany</p>;

  const { id } = await params;
  const listId = parseInt(id, 10);

  const list = await prisma.shoppingList.findUnique({
    where: { id: listId },
  });

  if (!list || list.userId !== session.user.id) {
    return <p className="p-10">Lista zakupów nie znaleziona</p>;
  }

  const items = list.items as ShoppingItem[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
            Lista zakupów
          </h1>
          <p className="mt-1 text-sm text-zinc-300">
            Zakres: {formatDate(list.startDate)} → {formatDate(list.endDate)}
          </p>
        </div>

        <Link
          href="/shopping-list"
          className="rounded-xl border border-purple-300 px-3 py-1 text-sm text-purple-200 hover:bg-purple-100/10 transition"
        >
          ← Wróć
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        {items.length === 0 ? (
          <p className="text-zinc-300">Brak produktów na liście.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
              >
                <span className="text-zinc-100">{item.name}</span>
                <span className="text-sm font-semibold text-violet-200">
                  {item.amount} g
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
