"use client";
import { Meal } from "../generated/prisma/client";
import { MealType } from "../generated/prisma/enums";

type MealCardMonthProps = {
  meal: Meal;
  type: MealType;
  mobile?: boolean;
};

const MealCardMonth = ({ meal, type, mobile = false }: MealCardMonthProps) => {
  const mealEmoji: Record<string, string> = {
    BREAKFAST: "☕🥐",
    LUNCH: "🍝🍲",
    DINNER: "🍵🍛",
  };

  if (mobile) {
    return (
      <div className="text-center text-[10px] bg-violet-600 text-white rounded shadow px-1 py-0.5">
        {mealEmoji[type]}
      </div>
    );
  }

  return (
    <div className="w-full max-w-full rounded-md bg-violet-600 text-white px-1.5 py-1 leading-tight">
      <div className="flex items-start gap-1">
        <span className="shrink-0 text-xs">{mealEmoji[type]}</span>

        <span className="text-[10px] sm:text-xs whitespace-normal break-words text-left">
          {meal.name}
        </span>
      </div>
    </div>
  );
};

export default MealCardMonth;
