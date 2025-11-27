// zapis formularza
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DAYS } from "../week-preferences/types";


export async function submitForm(selectedByDay: Record<string, Set<number>>, weekStart: Date, router: AppRouterInstance, onClose: () => void) {
  const formData: Record<string, Array<number>> = {}
  const currentDate = new Date(weekStart.getTime()) 

  DAYS.forEach((day) => {
    const tagIds = Array.from(selectedByDay[day])
    const dateKey = currentDate.toISOString().split('T')[0]

    formData[dateKey] = tagIds

    currentDate.setDate(currentDate.getDate() + 1);
  })

  const res = await fetch("/api/meal-plan-generator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    console.error("POST /api/meal-plan-generator nieudany", await res.text());
  }

  const weekStartParam = weekStart.toLocaleDateString()
  router.push(`/planner?weekStart=${weekStartParam}`)

  onClose()
}