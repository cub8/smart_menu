// panel posilkow do edycji tagow dla wybranego dnia po prawej stronie

"use client";

import { useState } from "react";
import useWeeklyPreferences from "../useWeeklyPreferences";
import type { Day } from "../types";
import MealTagsForm from "./MealTagsForm";
import MealButtons from "./MealsButtons";

interface MealsPanelProps {
  selectedDay: Day | null;
}

export default function MealsPanel({ selectedDay,}: MealsPanelProps) {

  const {
    tags,
    selectedByDay,
    toggleTag,
    removeTag,
    useTemplateByDay,
    handleToggleTemplate,
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
  const usesTemplate = useTemplateByDay[selectedDay] ?? false;

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      {/* przyciski posilkow */}
      <MealButtons
        meals={meals}
        openMeal={openMeal}
        setOpenMeal={setOpenMeal}
        usesTemplate={usesTemplate}
        selectedDay={selectedDay}
        handleToggleTemplate={handleToggleTemplate}
      />

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