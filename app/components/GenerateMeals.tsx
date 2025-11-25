"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Tag = {
  id: number;
  name: string;
};

const DAYS: Array<
  "MONDAY" |
  "TUESDAY" |
  "WEDNESDAY" |
  "THURSDAY" |
  "FRIDAY" |
  "SATURDAY" |
  "SUNDAY"
> = [
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

interface WeeklyPreferencesModalProps {
  onClose: () => void;
}

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); 
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
  });
}

async function submitForm(selectedByDay: Record<string, Set<number>>, weekStart: Date, router: AppRouterInstance, onClose: () => void) {
  const formData: Record<string, Array<number>> = {}
  const currentDate = new Date(weekStart.getTime()) 

  DAYS.forEach((day) => {
    const tagIds = Array.from(selectedByDay[day])
    const dateKey = currentDate.toLocaleDateString()

    formData[dateKey] = tagIds

    currentDate.setDate(currentDate.getDate() + 1);
  })

  const res = await fetch("/api/meal-plan-generator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    console.error("POST /api/meal-plan-generator nieudany", await res.text());
  }

  const weekStartParam = weekStart.toLocaleDateString()
  router.push(`/planner?weekStart=${weekStartParam}`)

  onClose()
}

export default function WeeklyPreferencesModal({ onClose }: WeeklyPreferencesModalProps) {  
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [templatesByDay, setTemplatesByDay] = useState<Record<string, number[]>>(
    () => ({})
  );

  const [weekStart, setWeekStart] = useState<Date>(() => getMonday(new Date()));

  const [selectedByDay, setSelectedByDay] = useState<Record<string, Set<number>>>(
    () => ({})
  );
  const [useTemplateByDay, setUseTemplateByDay] = useState<Record<string, boolean>>(
    () => ({})
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPreferences() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/preferences");
        if (!res.ok) {
          throw new Error("Nie udało się pobrać preferencji.");
        }

        const data = (await res.json()) as {
          tags: Tag[];
          preferencesByDay: Record<string, number[]>;
        };

        if (cancelled) return;

        setTags(data.tags ?? []);

        const initialTemplates: Record<string, number[]> = {};
        for (const day of DAYS) {
          initialTemplates[day] = data.preferencesByDay?.[day] ?? [];
        }
        setTemplatesByDay(initialTemplates);

        const initialSelected: Record<string, Set<number>> = {};
        const initialUse: Record<string, boolean> = {};

        for (const day of DAYS) {
          initialUse[day] = true;
          initialSelected[day] = new Set(initialTemplates[day]);
        }

        setSelectedByDay(initialSelected);
        setUseTemplateByDay(initialUse);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(
            (e as Error | null)?.message ||
              "Wystąpił błąd podczas ładowania preferencji z profilu."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPreferences();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleToggleTemplate(day: (typeof DAYS)[number]) {
    setUseTemplateByDay((prev) => {
      const next = { ...prev };
      const willUse = !next[day];
      next[day] = willUse;

      setSelectedByDay((prevSelected) => {
        const copy: Record<string, Set<number>> = {};
        for (const d of DAYS) {
          copy[d] = new Set(prevSelected[d] ?? []);
        }

        if (willUse) {
          copy[day] = new Set(templatesByDay[day] ?? []);
        } else {
          copy[day] = new Set();
        }

        return copy;
      });

      return next;
    });
  }

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

  function handlePrevWeek() {
    setWeekStart((prev) => addDays(prev, -7));
  }

  function handleNextWeek() {
    setWeekStart((prev) => addDays(prev, 7));
  }

  const weekLabel = useMemo(() => {
    const start = weekStart;
    const end = addDays(weekStart, 6);
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [weekStart]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div>
            <h2 className="text-lg font-semibold text-purple-800">
              Generuj posiiłki na cały tydzień według preferencji.
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between border-b bg-purple-50 px-5 py-2 text-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevWeek}
              className="rounded-full border border-purple-200 px-2 py-1 text-xs text-purple-700 hover:bg-purple-100"
            >
              -1 tydzień
            </button>
            <span className="font-medium text-purple-900">{weekLabel}</span>
            <button
              type="button"
              onClick={handleNextWeek}
              className="rounded-full border border-purple-200 px-2 py-1 text-xs text-purple-700 hover:bg-purple-100"
            >
              +1 tydzień
            </button>
          </div>

          <button
            type="button"
            className="rounded-xl bg-purple-700 text-white hover:bg-purple-800 hover:text-gray-200 px-3 py-1 text-md font-medium cursor-pointer"
            onClick={() => submitForm(selectedByDay, weekStart, router, onClose)}
          >
            Generuj
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {loading ? (
            <p className="text-sm text-gray-600">Ładowanie preferencji...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DAYS.map((day, index) => {
                const selection = selectedByDay[day] ?? new Set<number>();
                const usesTemplate = useTemplateByDay[day] ?? false;
                const dayDate = addDays(weekStart, index);

                return (
                  <div
                    key={day}
                    className="flex flex-col rounded-xl border border-purple-100 bg-purple-50/40 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-purple-800">
                      <div className="flex flex-col">
                        <span className="font-semibold">{DAY_LABELS[day]}</span>
                        <span className="text-[11px] text-purple-500">
                          {formatDate(dayDate)}
                        </span>
                      </div>
                      <label className="flex cursor-pointer items-center gap-1 text-[10px] text-purple-700">
                        <input
                          type="checkbox"
                          className="h-3 w-3 accent-purple-600"
                          checked={usesTemplate}
                          onChange={() => handleToggleTemplate(day)}
                        />
                        <span>Użyj szablonu</span>
                      </label>
                    </div>

                    <div className="flex-1 space-y-2">
                      {Array.from(selection).map((tagId) => {
                        const tag = tags.find((t) => t.id === tagId);
                        if (!tag) return null;
                        return (
                          <div
                            key={tagId}
                            className="flex items-center justify-between rounded-lg bg-white px-3 py-1 text-xs shadow-sm"
                          >
                            <span className="text-purple-900">{tag.name}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(day, tagId)}
                              className="ml-2 text-[10px] text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              Usuń
                            </button>
                          </div>
                        );
                      })}

                      <div className="mt-1">
                        <div className="mb-1 text-[11px] font-medium text-purple-700">
                          Dodaj/edytuj tagi
                        </div>
                        <div className="max-h-28 space-y-1 overflow-y-auto rounded-lg border border-purple-200 bg-white p-1">
                          {tags.map((tag) => {
                            const isSelected = selection.has(tag.id);
                            return (
                              <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(day, tag.id)}
                                className={`flex w-full items-center justify-between rounded px-2 py-1 text-[11px] text-left transition cursor-pointer ${
                                  isSelected
                                    ? "bg-purple-600 text-white"
                                    : "bg-purple-50 hover:bg-purple-100 text-purple-900"
                                }`}
                              >
                                <span>{tag.name}</span>
                                {isSelected && (
                                  <span className="text-[9px]">✓</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end border-t bg-gray-50 px-5 py-3 text-sm">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
