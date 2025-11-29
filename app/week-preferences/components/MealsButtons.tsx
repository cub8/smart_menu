"use client";

import type { Day } from "../types";

interface MealButtonsProps {
  meals: string[];
  openMeal: string | null;
  setOpenMeal: (meal: string | null) => void;
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
    <div className="flex items-center gap-3">
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

      <label className="flex cursor-pointer items-center ml-5 gap-1 text-m text-purple-700">
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
