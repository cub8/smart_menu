"use client";

import {  useState } from "react";
import MealCalendar from "./calendar/MealCalendar";
import WeeklyPreferencesModal from "../components/GenerateMeals";
import type { MealPlan, Meal } from "../generated/prisma/client";
import { useFlashStore } from "@/lib/flashStore";
import FlashNotices from "../components/FlashNotices";
import { type FailedToCreate } from '../api/meal-plan-generator/services';

type MealPlanWithMeal = MealPlan & { meal: Meal };

type PlannerClientProps = {
  meals: MealPlanWithMeal[];
};

export default function PlannerClient({ meals }: PlannerClientProps) {
  const [showWeeklyForm, setShowWeeklyForm] = useState(false);
  const { flash } = useFlashStore();

  return (
    <div>
      {
        flash && <FlashNotices flashNotices={flash.payload as FailedToCreate[]} />
      }

      <div className="mt-10 flex flex-col items-center gap-4">
        <h2 className="text-3xl text-purple-500">Twój plan posiłków</h2>
        <button
          type="button"
          onClick={() => setShowWeeklyForm(true)}
          className="rounded-xl border border-purple-500 bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-700 cursor-pointer"
        >
          Generuj plan posiłków
        </button>
      </div>

      <div className="container mx-auto p-10">
        <MealCalendar mealPlan={meals} />
      </div>

      {showWeeklyForm && (
        <WeeklyPreferencesModal onClose={() => setShowWeeklyForm(false)} />
      )}
    </div>
  );
}
