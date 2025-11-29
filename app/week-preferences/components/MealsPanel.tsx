// panel posilkow do edycji tagow dla wybranego dnia po prawej stronie

"use client";

import { useState } from "react";
import type { Day, Tag } from "../types";
import MealTagsForm from "./MealTagsForm";
import MealButtons from "./MealsButtons";
import LoadingError from "./LoadingError";

interface MealsPanelProps {
  loading: boolean;
  error: string | null;
  selectedDay: Day | null;
  tags: Tag[];
  selectedByDay: Record<Day, Set<number>>;
  toggleTag: (day: Day, id: number) => void;
  removeTag: (day: Day, id: number) => void;
  useTemplateByDay: Record<Day, boolean>;
  handleToggleTemplate: (day: Day) => void;
}

export default function MealsPanel({ 
  loading,
  error,
  selectedDay,
  tags,
  selectedByDay,
  toggleTag,
  removeTag,
  useTemplateByDay,
  handleToggleTemplate,
}: MealsPanelProps) {

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

      {/* komunikaty dla uzytkownika */}
      <LoadingError loading={loading} error={error} />

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