"use client";

import { useState } from "react";
import type { EventContentArg, EventClickArg, EventDropArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import MealCardWeek from "./MealCardWeek";
import MealCardMonth from "./MealCardMonth";
import { MealPlan, Meal } from "../generated/prisma/client";

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

  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

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

  const handleEventClick = (arg: EventClickArg) => {
    const mealPlan = arg.event.extendedProps as MealPlanWithMeal;
    setSelectedMeal(mealPlan.meal);
  };

  const eventWeekContent = (arg: EventContentArg) => {
    const mealPlan = arg.event.extendedProps as MealPlanWithMeal;
    return <MealCardWeek meal={mealPlan.meal} type={mealPlan.type} />;
  };

  const eventMonthContent = (arg: EventContentArg) => {
    const mealPlan = arg.event.extendedProps as MealPlanWithMeal;
    return <MealCardMonth meal={mealPlan.meal} type={mealPlan.type} />;
  };

  return (
    <div>
      <div className="mx-auto max-w-5xl h-fit">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridWeek,dayGridMonth",
          }}
          locales={[plLocale]}
          locale="pl"
          events={events}
          eventOrder={["order"]}
          editable={true}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          contentHeight="auto"
          views={{
            dayGridWeek: {
              eventContent: eventWeekContent,
            },
            dayGridMonth: {
              eventContent: eventMonthContent,
            },
          }}
        />
      </div>

      {selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-[90%] p-6">
            <h2 className="text-xl font-semibold mb-3 text-violet-700">
              {selectedMeal.name}
            </h2>

            <p className="text-sm text-gray-700 whitespace-pre-line">
              {selectedMeal.description}
            </p>

            {selectedMeal.ingredients && selectedMeal.ingredients.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Składniki:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                  {selectedMeal.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedMeal(null)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCalendar;
