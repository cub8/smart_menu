"use client";
import { Meal } from "../generated/prisma/client";
import { MealType } from "../generated/prisma/enums";

type MealCardMonthProps = {
  meal: Meal;
  type: MealType;
  mobile?: boolean; // opcjonalny flag, czy renderujemy mobilnie
};

const MealCardMonth = ({ meal, type, mobile = false }: MealCardMonthProps) => {
  const mealEmoji: Record<string, string> = {
    BREAKFAST: "☕🥐",
    LUNCH: "🍝🍲",
    DINNER: "🍵🍛",
    DESSERT: "🍰🍦",
  };

  if (mobile) {
    // mobile: tylko emoji
    return (
      <div className="text-center text-xs bg-violet-600 text-white rounded shadow p-1">
        {mealEmoji[type]}
      </div>
    );
  }

  // desktop: pełna karta
  return (
    <div className="flex flex-row justify-between items-center p-2 shadow-md bg-violet-600 text-sm text-white rounded">
      <h2 className="font-semibold leading-tight">{meal.name}</h2>
      <p className="text-xs">{mealEmoji[type]}</p>
    </div>
  );
};

export default MealCardMonth;
