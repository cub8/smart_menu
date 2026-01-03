"use client";

import { useRouter } from "next/navigation";

export default function DeleteShoppingListButton({ id }: { id: number }) {
  const router = useRouter();

  async function onDelete() {
    const ok = confirm("Na pewno usunąć tę listę zakupów?");
    if (!ok) return;

    const res = await fetch(`/api/shopping-list/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("DELETE /api/shopping-list/[id] nieudany", txt);
      alert("Nie udało się usunąć listy.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={onDelete}
      className="inline-flex items-center rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-200 hover:bg-red-500/20 transition"
      type="button"
    >
      Usuń
    </button>
  );
}
