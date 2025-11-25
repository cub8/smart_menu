"use client";

import { useState } from "react";

type Tag = {
  id: number;
  name: string;
};

const DAYS: Array<"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"> = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const DAY_LABELS: Record<(typeof DAYS)[number], string> = {
  MONDAY: "Poniedziałek",
  TUESDAY: "Wtorek",
  WEDNESDAY: "Środa",
  THURSDAY: "Czwartek",
  FRIDAY: "Piątek",
  SATURDAY: "Sobota",
  SUNDAY: "Niedziela",
};

interface Props {
  tags: Tag[];
  initialByDay: Record<string, number[]>;
}

export default function ProfilePreferences({ tags, initialByDay }: Props) {
  const [selectedByDay, setSelectedByDay] = useState<
    Record<string, Set<number>>
  >(() => {
    const result: Record<string, Set<number>> = {};
    for (const day of DAYS) {
      result[day] = new Set(initialByDay?.[day] ?? []);
    }
    return result;
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [openDay, setOpenDay] = useState<(typeof DAYS)[number] | null>(null);

  function toggleTag(day: (typeof DAYS)[number], id: number) {
    setSelectedByDay((prev) => {
      const next: Record<string, Set<number>> = {};
      for (const d of DAYS) {
        next[d] = new Set(prev[d] ?? []);
      }

      const daySet = next[day] ?? new Set<number>();
      if (daySet.has(id)) {
        daySet.delete(id);
      } else {
        daySet.add(id);
      }
      next[day] = daySet;

      return next;
    });
  }

  function removeTag(day: (typeof DAYS)[number], id: number) {
    setSelectedByDay((prev) => {
      const next: Record<string, Set<number>> = {};
      for (const d of DAYS) {
        next[d] = new Set(prev[d] ?? []);
      }
      const daySet = next[day] ?? new Set<number>();
      daySet.delete(id);
      next[day] = daySet;
      return next;
    });
  }

  async function savePreferences() {
    setSaving(true);
    setMessage(null);
    try {
      const preferencesByDay: Record<string, number[]> = {};
      for (const day of DAYS) {
        preferencesByDay[day] = Array.from(selectedByDay[day] ?? []);
      }

      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferencesByDay }),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      setMessage("Preferencje zapisane.");
    } catch (e) {
      setMessage("Nie udało się zapisać preferencji. Spróbuj ponownie.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DAYS.map((day) => {
          const selection = selectedByDay[day] ?? new Set<number>();

          return (
            <div
              key={day}
              className="border border-purple-100 rounded-xl p-3 bg-purple-50/40 flex flex-col"
            >
              <div className="font-semibold text-purple-800 mb-2 text-sm uppercase tracking-wide">
                {DAY_LABELS[day]}
              </div>

              <div className="flex-1 space-y-2">
                {Array.from(selection).map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <div
                      key={tagId}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-1 text-sm shadow-sm"
                    >
                      <span className="text-purple-900">{tag.name}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(day, tagId)}
                        className="ml-2 text-xs text-red-500 hover:text-red-700"
                      >
                        Usuń
                      </button>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setOpenDay(openDay === day ? null : day)}
                  className="w-full flex items-center justify-center gap-1 rounded-lg border border-dashed border-purple-300 px-3 py-1 text-sm text-purple-700 hover:bg-purple-100/60 bg-white/70"
                >
                  <span className="text-lg leading-none">+</span>
                  <span>Dodaj tag</span>
                </button>

                {openDay === day && (
                  <div className="mt-2 border border-purple-200 rounded-lg bg-white max-h-40 overflow-y-auto p-2 space-y-1 shadow-sm">
                    {tags.map((tag) => {
                      const isSelected = selection.has(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(day, tag.id)}
                          className={`w-full flex items-center justify-between rounded px-2 py-1 text-xs text-left transition ${
                            isSelected
                              ? "bg-purple-600 text-white"
                              : "bg-purple-50 hover:bg-purple-100 text-purple-900"
                          }`}
                        >
                          <span>{tag.name}</span>
                          {isSelected && <span className="text-[10px]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={savePreferences}
        disabled={saving}
        className="mt-4 rounded-xl border px-4 py-2 font-medium bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
      >
        {saving ? "Zapisywanie..." : "Zapisz szablony"}
      </button>

      {message && (
        <p className="text-sm text-gray-700 mt-2">
          {message}
        </p>
      )}
    </div>
  );
}
