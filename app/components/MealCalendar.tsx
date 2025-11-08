"use client";
import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { Meal } from '../models/meal';
import MealCard from './MealCard';


// PRZYKLADY
const sampleMeals: Meal[] = [
  {
    id: "1",
    name: "Owsianka z owocami",
    date: "2025-11-06",
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
    name: "Risotto z krewetkami",
    date: "2025-11-07",
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

    const eventContent = (arg: any) => {
        const meal: Meal = arg.event.extendedProps; //arg.event.extendedProps to obiekt Meal

        // trzeba zwrocic
        return <MealCard meal={meal} />;
    };




  return (

    <div> 
    <div className='mx-auto'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridWeek,dayGridMonth" }}
        locales={[plLocale]}
        locale="pl"
        height="70vh"
        contentHeight="600vh"
        events={events}
        eventContent={eventContent}
        eventOrder={["order"]}

      />
    </div>
    </div>

  )
}

export default MealCalendar