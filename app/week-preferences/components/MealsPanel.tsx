// panel posilkow do edycji tagow dla wybranego dnia po prawej stronie

"use client";

import { useState } from "react";
import useWeeklyPreferences from "../useWeeklyPreferences";
import type { Day } from "../types";
import MealTagsForm from "./MealTagsForm";

interface MealsPanelProps {
  selectedDay: Day | null;
}

export default function MealsPanel({ selectedDay,}: MealsPanelProps) {

  const {
    tags,
    selectedByDay,
    toggleTag,
    removeTag,
  } = useWeeklyPreferences(() => {});

  const [openMeal, setOpenMeal] = useState<string | null>(null);


  if (!selectedDay) {
    return (
      <div className="flex flex-1 justify-center items-center p-4">
        <p className="text-gray-500 text-m">
          Wybierz dzień, aby przypisać preferencje.
        </p>
      </div>
    );
  }

  const meals = ["Śniadanie", "Obiad", "Kolacja", "Deser"];

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      {/* przyciski posilkow */}
      <div className="flex gap-3">
        {meals.map((meal) => (
          <button
            key={meal}
            onClick={() =>
              setOpenMeal(openMeal === meal ? null : meal)
            }
            className={`px-4 py-2 rounded-3xl text-white ${
              openMeal === meal
                ? "bg-purple-600"
                : "bg-purple-200 text-purple-900 hover:bg-purple-100"
            }`}
          >
            {meal}
          </button>
        ))}
      </div>

      {/* formularz tagow dla wybranego posilku */}
      {openMeal && (
        <MealTagsForm
          day={selectedDay}
          tags={tags}
          selectedTags={selectedByDay[selectedDay] || new Set()}
          toggleTag={toggleTag}
          removeTag={removeTag}
        />
      )}


    </div>
  );

}