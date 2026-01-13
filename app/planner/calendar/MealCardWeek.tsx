"use client";

import { Meal } from "@/app/generated/prisma/client";
import { MealType } from "@/app/generated/prisma/enums";

const MealCard = ({ meal, type }: { meal: Meal; type: MealType }) => {
  const mealEmoji: Record<string, string> = {
    BREAKFAST: "Śniadanie ☕🥐",
    LUNCH: "Obiad 🍝🍲",
    DINNER: "Kolacja 🍵🍛",
    DESSERT: "Deser 🍰🍦",
  };

  return (
    <div
      className="
        flex flex-col justify-between
        h-30 w-full px-1.5 py-2
        rounded-2xl shadow-md
        bg-violet-400 text-lg text-center text-neutral-100
      "
    >
      <h2 className="text-lg font-semibold leading-tight mb-1 sm:whitespace-normal">
        {meal.name}
      </h2>
      <p className="text-xs">{mealEmoji[type]}</p>
    </div>
  );
};

export default MealCard;
