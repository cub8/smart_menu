// hook zarządzający stanem preferencji tygodniowych

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { addDays, formatDate, getMonday } from "../week-preferences/date";
import { DAYS, Tag } from "../week-preferences/types";
import { submitForm } from "./services";


export default function useWeeklyPreferences( onClose: () => void ) {  
  const router = useRouter()

  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [templatesByDay, setTemplatesByDay] = useState<Record<string, number[]>>( () => ({}));
  const [weekStart, setWeekStart] = useState<Date>(() => getMonday(new Date()));
  const [selectedByDay, setSelectedByDay] = useState<Record<string, Set<number>>>( () => ({}) );
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

  function handlePrevWeek() { setWeekStart((prev) => addDays(prev, -7));}
  function handleNextWeek() { setWeekStart((prev) => addDays(prev, 7)); }

  const weekLabel = useMemo(() => {
    const start = weekStart;
    const end = addDays(weekStart, 6);
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [weekStart])

  function handleSubmit() {
    submitForm(selectedByDay, weekStart, router, onClose)
  }


  return {
    loading,
    error,
    tags,
    selectedByDay,
    useTemplateByDay,
    templatesByDay,
    weekLabel,
    weekStart,
    toggleTag,
    removeTag,
    handlePrevWeek,
    handleNextWeek,
    handleToggleTemplate,
    setSelectedByDay,
    handleSubmit
  };
}
