"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  mealId: number;
  mealName: string;
}

export default function DeleteMealButton({ mealId, mealName }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/meals/${mealId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Nie udało się usunąć posiłku");
      }
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Wystąpił błąd podczas usuwania posiłku");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (!showConfirm) {
    return (
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="text-[10px] uppercase tracking-wide bg-red-900/40 text-red-200 px-2 py-1 rounded-full border border-red-700/60 hover:bg-red-900/60 transition-colors ml-2"
        title="Usuń posiłek"
      >
        Usuń
      </button>
    );
  }

  return (
    <div className="flex gap-1 ml-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="text-[10px] uppercase tracking-wide bg-red-600 text-white px-2 py-1 rounded-full border border-red-500 hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Tak"}
      </button>
      <button
        type="button"
        onClick={() => setShowConfirm(false)}
        disabled={loading}
        className="text-[10px] uppercase tracking-wide bg-zinc-700 text-zinc-300 px-2 py-1 rounded-full border border-zinc-600 hover:bg-zinc-600 transition-colors disabled:opacity-50"
      >
        Nie
      </button>
    </div>
  );
}
