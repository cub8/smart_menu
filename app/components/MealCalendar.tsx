"use client";
import type { EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import MealCardWeek from './MealCardWeek';
import MealCardMonth from './MealCardMonth';
import { MealPlan, Meal } from "../generated/prisma/client";
import React from 'react'


// potrzebne bo VSCode bardzo krzyczal
type MealPlanWithMeal = MealPlan & { meal: Meal };

type MealCalendarProps = {
  mealPlan: MealPlanWithMeal[]; 
};


const MealCalendar = ({mealPlan}: MealCalendarProps) => {
    // wykrywanie czy mobilne

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
      const checkSize = () => setIsMobile(window.innerWidth < 1050);
      checkSize();
      window.addEventListener("resize", checkSize);
      return () => window.removeEventListener("resize", checkSize);
    }, []);


    // kolejnosc ulozenia w kalendarzu
    const mealOrder = { BREAKFAST: 1, LUNCH: 2, DINNER: 3 };

    // mapowanie na eventy dla Full Calendar
    const events = mealPlan.map((m: MealPlanWithMeal) => ({
        id: String(m.id),
        title: m.meal.name,
        start: m.date,
        allDay: true,
        extendedProps: m
    }));


    const eventWeekContent = (arg: EventContentArg) => {
        const mealPlan = arg.event.extendedProps as MealPlanWithMeal; //arg.event.extendedProps to obiekt Meal
        return <MealCardWeek meal={mealPlan.meal} type={mealPlan.type}/>;
    };


    const eventMonthContent = (arg: EventContentArg) => {
        const mealPlan = arg.event.extendedProps as MealPlanWithMeal; //arg.event.extendedProps to obiekt Meal
        return <MealCardMonth meal={mealPlan.meal} type={mealPlan.type} mobile={isMobile}/>;
    }; 


  return (
    

    <div> 
      <div className='mx-auto max-w-5xl h-fit'>
        <FullCalendar
        key={isMobile? "mobile" : "desktop"}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={isMobile ? "dayGridDay" : "dayGridWeek"}

          headerToolbar={
            isMobile
              ? { left: "prev,next", center: "title", right: "dayGridDay,dayGridMonth" }
              : { left: "prev,next today", center: "title", right: "dayGridWeek,dayGridMonth" }
          }

          contentHeight={isMobile ? "auto" : "auto"}
          expandRows={!isMobile ? true : false}
          locales={[plLocale]}
          locale="pl"
          events={events}
          eventOrder={["order"]}
          views={{
            dayGridDay: { eventContent: eventWeekContent, },
            dayGridWeek: { eventContent: eventWeekContent,},
            dayGridMonth: {eventContent: eventMonthContent, },
          }}
        />
      </div>

    </div>

  )
}

export default MealCalendar
