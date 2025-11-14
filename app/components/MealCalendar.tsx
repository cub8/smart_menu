"use client";
import type { EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { Meal } from '../models/meal';
import MealCardWeek from './MealCardWeek';
import MealCardMonth from './MealCardMonth';


// PRZYKLADY
const sampleMeals: Meal[] = [
  {
    id: "1",
    name: "Owsianka z owocami",
    date: "2025-11-12",
    type: "breakfast",
    ingredients: ["płatki owsiane", "mleko", "maliny"]
  },
  {
    id: "2",
    name: "Kurczak z wymyślnym sosem",
    date: "2025-11-06",
    type: "lunch",
    ingredients: ["pierś z kurczaka", "ryż"]
  },
  {
    id: "3",
    name: "Kanapki z łososiem i awokado",
    date: "2025-11-06",
    type: "dinner",
    ingredients: ["chleb", "awokado", "łosoś"]
  },
  {
    id: "5",
    name: "Tosty z szynka",
    date: "2025-11-10",
    type: "dinner",
    ingredients: ["sałata lodowa", "kurczak"]
  },
    {
    id: "7",
    name: "Kanapka z serem",
    date: "2025-11-09",
    type: "breakfast",
    ingredients: ["sałata lodowa", "kurczak"]
  },
    {
    id: "8",
    name: "Kotlet schabowy",
    date: "2025-11-15",
    type: "lunch",
    ingredients: ["sałata lodowa", "kurczak"]
  },
    {
    id: "9",
    name: "Obiad na miescie",
    date: "2025-11-20",
    type: "lunch",
    ingredients: ["sałata lodowa", "kurczak"]
  },
    {
    id: "11",
    name: "Obiad na miescie",
    date: "2025-11-21",
    type: "lunch",
    ingredients: ["sałata lodowa", "kurczak"]
  },
  
];

const MealCalendar = () => {
    // kolejnosc ulozenia w kalendarzu
    const mealOrder = { breakfast: 1, lunch: 2, dinner: 3 };

    // mapowanie na eventy dla Full Calendar
    const events = sampleMeals.map((m) => ({
        id: m.id,
        title: m.name,
        start: m.date,
        allDay: true,
        extendedProps: m,
        order: mealOrder[m.type],
    }));

    const eventWeekContent = (arg: EventContentArg) => {
        const meal: Meal = arg.event.extendedProps as Meal; //arg.event.extendedProps to obiekt Meal
        // trzeba zwrocic
        return <MealCardWeek meal={meal} />;
    };

    const eventMonthContent = (arg: EventContentArg) => {
        const meal: Meal = arg.event.extendedProps as Meal; //arg.event.extendedProps to obiekt Meal
        return <MealCardMonth meal={meal} />;
    };


  return (

    <div> 
      <div className='mx-auto max-w-5xl h-fit'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridWeek,dayGridMonth" }}
          locales={[plLocale]}
          locale="pl"
          events={events}
          eventOrder={["order"]}
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

    </div>

  )
}

export default MealCalendar
