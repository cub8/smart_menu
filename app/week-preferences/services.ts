// zapis formularza
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DAYS, type Day, type MealType } from "../week-preferences/types";
import { formatDateYMD } from "./date";
import { useFlashStore } from "@/lib/flashStore";

export async function submitForm(
  selectedByMeal: Record<Day, Record<MealType, Set<number>>>, 
  weekStart: Date, 
  router: AppRouterInstance, 
  onClose: () => void
) {
  const formData: Record<string, Record<MealType, number[]>> = {};
  const currentDate = new Date(weekStart.getTime()) 

  DAYS.forEach((day) => {
    const mealTags = selectedByMeal[day] ?? {};
    const tagIdsByMeal: Record<MealType, number[]> = {} as Record<MealType, number[]>;

    for (const meal in mealTags) {
      tagIdsByMeal[meal as MealType] = Array.from(mealTags[meal as MealType]);
    }

    const dateKey = formatDateYMD(currentDate);
    formData[dateKey] = tagIdsByMeal;

    currentDate.setDate(currentDate.getDate() + 1);
  });

  const res = await fetch("/api/meal-plan-generator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    return console.error("POST /api/meal-plan-generator nieudany", await res.text());
  }

  const responseBody = await res.json()
  const failedToCreate = responseBody.failedToCreate 
  const weekStartParam = weekStart.toLocaleDateString()

  useFlashStore.getState().setFlash({
    type: "error",
    payload: failedToCreate
  })
  
  router.push(`/planner?weekStart=${weekStartParam}`)

  onClose()
}