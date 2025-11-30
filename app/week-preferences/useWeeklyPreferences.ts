// hook zarządzający stanem preferencji tygodniowych

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { addDays, formatDate, getMonday } from "../week-preferences/date";
import { MEALS, type MealType, DAYS, Day, Tag } from "../week-preferences/types";
import { submitForm } from "./services";


export default function useWeeklyPreferences( onClose: () => void ) {  
  const router = useRouter()

  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [templatesByDay, setTemplatesByDay] = useState<Record<string, number[]>>( () => ({}));
  const [weekStart, setWeekStart] = useState<Date>(() => getMonday(new Date()));
  
  const [selectedByMeal, setSelectedByMeal] = useState<
    Record<string, Record<MealType, Set<number>>>
  >(() => {
    const initial: Record<string, Record<MealType, Set<number>>> = {};
    for (const day of DAYS) {
      initial[day] = {} as Record<MealType, Set<number>>;
      for (const meal of MEALS) {
        initial[day][meal] = new Set<number>();
      }
    }
    return initial;
  });

  const [useTemplateByDay, setUseTemplateByDay] = useState<Record<string, boolean>>( () => ({}));
  const [error, setError] = useState<string | null>(null);


// pobieranie preferencji z profilu
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

        const initialSelected: Record<string, Record<MealType, Set<number>>> = {};
        const initialUse: Record<string, boolean> = {};

        for (const day of DAYS) {
          initialUse[day] = true;

          initialSelected[day] = {} as Record<MealType, Set<number>>;
          for (const meal of MEALS) {
            // kopiujemy szablon dnia do każdego posiłku
            initialSelected[day][meal] = new Set(initialTemplates[day] ?? []);
          }
        }

        setSelectedByMeal(initialSelected);
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



  function handleToggleTemplate(day: Day) {
    setUseTemplateByDay((prev) => {
      const next = { ...prev };
      const willUse = !next[day];
      next[day] = willUse;

      setSelectedByMeal((prevSelected) => {
        const copy = { ...prevSelected } as Record<Day, Record<MealType, Set<number>>>;

        if (!copy[day]) {
          copy[day] = {} as Record<MealType, Set<number>>;
        }

        for (const meal of MEALS) {
          copy[day][meal] = willUse
            ? new Set(templatesByDay[day] ?? [])
            : new Set();
        }

        return copy;
      });

      return next;
    });
  }


  function toggleTag(day: Day, meal: MealType, id: number) {
    setSelectedByMeal((prev) => {
        const next = { ...prev };

        next[day] = { ...(prev[day] ?? {}) };

      
        const mealSet = new Set(next[day][meal] ?? []);
        if (mealSet.has(id)) mealSet.delete(id);
        else mealSet.add(id);

        next[day][meal] = mealSet;

        return next;
    });
  }

  function removeTag(day: Day, meal: MealType, id: number) {
    setSelectedByMeal((prev) => {
        if (!prev[day]?.[meal]) return prev;

        const next = { ...prev };
        next[day] = { ...(prev[day] ?? {}) };

        const mealSet = new Set(next[day][meal]);
        mealSet.delete(id);

        next[day][meal] = mealSet;
        return next;
      });
  }

  function handlePrevWeek() { setWeekStart((prev) => addDays(prev, -7));}
  function handleNextWeek() { setWeekStart((prev) => addDays(prev, 7)); }

  const weekLabel = useMemo(() => {
    const start = weekStart;
    const end = addDays(weekStart, 6);
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [weekStart])

  function handleSubmit() {
    submitForm(selectedByMeal, weekStart, router, onClose)
  }


  return {
    loading,
    error,
    tags,
    selectedByMeal,
    useTemplateByDay,
    templatesByDay,
    weekLabel,
    weekStart,
    toggleTag,
    removeTag,
    handlePrevWeek,
    handleNextWeek,
    handleToggleTemplate,
    setSelectedByMeal,
    handleSubmit
  };
}
