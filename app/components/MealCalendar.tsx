"use client";
import type { EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import MealCardWeek from './MealCardWeek';
import MealCardMonth from './MealCardMonth';
import { MealPlan, Meal } from "../generated/prisma/client";


// potrzebne bo VSCode bardzo krzyczal
type MealPlanWithMeal = MealPlan & { meal: Meal };

type MealCalendarProps = {
  mealPlan: any[]; 
};

const MealCalendar = ({mealPlan}: MealCalendarProps) => {

    // kolejnosc ulozenia w kalendarzu
    const mealOrder = { BREAKFAST: 1, LUNCH: 2, DINNER: 3 };

    // mapowanie na eventy dla Full Calendar
    const events = mealPlan.map((m) => ({
        id: String(m.id),
        title: m.meal.name,
        start: m.date,
        allDay: true,
        extendedProps: m
    }));


    const eventWeekContent = (arg: EventContentArg) => {
        const mealPlan = arg.event.extendedProps as MealPlanWithMeal; //arg.event.extendedProps to obiekt Meal
        // trzeba zwrocic
        return <MealCardWeek meal={mealPlan.meal} type={mealPlan.type}/>;
    };

    const eventMonthContent = (arg: EventContentArg) => {
        const mealPlan = arg.event.extendedProps as MealPlanWithMeal; //arg.event.extendedProps to obiekt Meal
        return <MealCardMonth meal={mealPlan.meal} type={mealPlan.type} />;
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
