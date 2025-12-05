"use client";

import React, { useEffect, useState } from "react";
import type {
  EventContentArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import MealCardWeek from "./MealCardWeek";
import MealCardMonth from "./MealCardMonth";
import { MealPlan, Meal } from "../../generated/prisma/client";

type MealPlanWithMeal = MealPlan & { meal: Meal };

type MealCalendarProps = {
  mealPlan: MealPlanWithMeal[];
};

type CalendarEvent = {
  id: string;
  title: string;
  start: Date | string;
  allDay: boolean;
  extendedProps: MealPlanWithMeal;
  order: number;
};

const mealOrder: Record<string, number> = {
  BREAKFAST: 1,
  LUNCH: 2,
  DINNER: 3,
};

const MealCalendar = ({ mealPlan }: MealCalendarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1050);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    mealPlan.map((m) => ({
      id: String(m.id),
      title: m.meal.name,
      start: m.date,
      allDay: true,
      extendedProps: m,
      order: mealOrder[m.type as keyof typeof mealOrder] ?? 99,
    }))
  );

  useEffect(() => {
    setEvents(
      mealPlan.map((m) => ({
        id: String(m.id),
        title: m.meal.name,
        start: m.date,
        allDay: true,
        extendedProps: m,
        order: mealOrder[m.type as keyof typeof mealOrder] ?? 99,
      }))
    );
  }, [mealPlan]);

  const [selectedMeal, setSelectedMeal] = useState<MealPlanWithMeal | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEventClick = (arg: EventClickArg) => {
    const mealPlan = arg.event.extendedProps as MealPlanWithMeal;
    setSelectedMeal(mealPlan);
    setShowModal(true);
  };

  const handleEventDrop = async (arg: EventDropArg) => {
    const { event } = arg;
    const id = event.id;
    const newDateStr = event.startStr;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              start: newDateStr,
              extendedProps: {
                ...ev.extendedProps,
                date: new Date(newDateStr),
              },
            }
          : ev
      )
    );

    try {
      const res = await fetch(`/api/meal-plan/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDateStr }),
      });

      if (!res.ok) {
        console.error("PATCH /api/meal-plan nieudany", await res.text());
        arg.revert();
      }
    } catch (e) {
      console.error("Błąd sieci przy PATCH /api/meal-plan", e);
      arg.revert();
    }
  };

  const eventWeekContent = (arg: EventContentArg) => {
    const mealPlan = arg.event.extendedProps as MealPlanWithMeal;
    return <MealCardWeek meal={mealPlan.meal} type={mealPlan.type} />;
  };

  const eventMonthContent = (arg: EventContentArg) => {
    const mealPlan = arg.event.extendedProps as MealPlanWithMeal;
    return (
      <MealCardMonth
        meal={mealPlan.meal}
        type={mealPlan.type}
        mobile={isMobile}
      />
    );
  };

  const parseRecipe = (recipe?: string[] | null): string | null => {
    if (!recipe || recipe.length === 0) return null;

    try {
      return recipe
        .map((step, i) => `${i + 1}. ${step?.toString().trim()}`) 
        .join("\n");
    } catch (error) {
      console.error("Błąd przy formatowaniu przepisu:", error);
      return null;
    }
  };

  const recipeArray = Array.isArray(selectedMeal?.meal.recipe)
  ? (selectedMeal.meal.recipe as string[])
  : null;

  const formattedRecipe = parseRecipe(recipeArray);


  return (
    <>
      {showModal && selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-xl font-semibold text-purple-700">
              {selectedMeal.meal.name}
            </h2>

            {formattedRecipe && (
              <>
                <h2 className="mb-2 text-m font-bold text-gray-800">Przepis:</h2>
                <pre className="mb-4 text-sm text-gray-800">
                  {formattedRecipe}
                </pre>
              </>
            )}

            {selectedMeal.meal.ingredients && Object.keys(selectedMeal.meal.ingredients).length > 0 && (
              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  Składniki:
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
                  {Object.entries(selectedMeal.meal.ingredients).map(([ing, amount], i) => (
                    <li key={i}>{ing}: {amount} g</li>
                  ))}
                </ul>
              </div>
            )}

            { /* Przyciski na dole */}
            <div className="flex justify-between"> 

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600"
              >
                Zamknij
              </button>

                <button 
                onClick={async () => {
                  if (!selectedMeal) return;

                  if (!confirm("Czy na pewno chcesz usunąć ten posiłek z planu?")) return;

                  try { 
                    const res = await fetch(`/api/meal-plan/${selectedMeal.id}`, {method: "DELETE", });
                    if (!res.ok) throw new Error("Nieudane usunięcie posiłku z planu");

                    setEvents(prev => prev.filter(ev => ev.id !== String(selectedMeal.id)));
                    setShowModal(false);

                  } catch (error) {
                    console.error("Błąd przy usuwaniu posiłku z planu:", error);
                    alert("Nie udało się usunąć posiłku");
                  }

                }}
                className="rounded-lg bg-red-400 px-4 py-2 text-sm font-sans text-white hover:bg-red-700"
                > 
                Usuń posiłek
                </button>
            </div>

          </div>
        </div>
      )}

      <div className="mx-auto h-fit max-w-5xl">
        <FullCalendar
          key={isMobile ? "mobile" : "desktop"}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={isMobile ? "dayGridDay" : "dayGridWeek"}
          headerToolbar={
            isMobile
              ? {
                  left: "prev,next",
                  center: "title",
                  right: "dayGridDay,dayGridMonth",
                }
              : {
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridWeek,dayGridMonth",
                }
          }
          locales={[plLocale]}
          locale="pl"
          events={events}
          eventOrder={["order"]}
          editable={true}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          contentHeight="auto"
          expandRows={!isMobile}
          views={{
            dayGridDay: { eventContent: eventWeekContent },
            dayGridWeek: { eventContent: eventWeekContent },
            dayGridMonth: { eventContent: eventMonthContent },
          }}
        />
      </div>
    </>
  );
};

export default MealCalendar;
