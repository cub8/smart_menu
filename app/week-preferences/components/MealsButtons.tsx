"use client";

import { MEAL_LABELS, type MealType, type Day } from "../types";


interface MealButtonsProps {
  meals: MealType[];
  openMeal: MealType | null;
  setOpenMeal: (meal: MealType | null) => void;
  usesTemplate: boolean;
  selectedDay: Day;
  handleToggleTemplate: (day: Day) => void;
}

export default function MealButtons({
  meals,
  openMeal,
  setOpenMeal,
  usesTemplate,
  selectedDay,
  handleToggleTemplate,
}: MealButtonsProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      {meals.map((meal) => (
        <button
          key={meal}
          onClick={() =>
            setOpenMeal(openMeal === meal ? null : meal)
          }
          className={`w-full md:w-auto px-4 py-2 rounded-3xl text-white ${
            openMeal === meal
              ? "bg-purple-600"
              : "bg-purple-200 text-purple-900 hover:bg-purple-100"
          }`}
        >
          {MEAL_LABELS[meal]}
        </button>
      ))}

      <label className="flex cursor-pointer items-center gap-2 md:ml-5 text-m text-purple-700">
        <input
          type="checkbox"
          className="h-3 w-3 accent-purple-600"
          checked={usesTemplate}
          onChange={() => handleToggleTemplate(selectedDay)}
        />
        <span>Użyj szablonu</span>
      </label>
    </div>
  );
}
