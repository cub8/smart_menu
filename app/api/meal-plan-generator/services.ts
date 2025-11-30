import prisma from "@/lib/prisma"
import { Prisma, MealType } from "@/app/generated/prisma/client";

interface MealWithTags {
  id: number;
  name: string;
  ingredients: string[];
  description: string;
  tags: {
    id: number;
    name: string;
  }[];
}

type PlanGeneratorFormInput = Record<string, Record<MealType, number[]>>

function validateBody(body: PlanGeneratorFormInput) {
  const dates = Object.keys(body)

  const isDateNaN = dates.map((date) => isNaN((new Date(date)).getTime()))
  if (isDateNaN.some((val) => val === true)) {
    throw new Error("Invalid date")
  }

  const allMealTypes = Object.entries(body)
                             .map(([, mealTypesWithTags]) => mealTypesWithTags)
                             .map((record => Object.keys(record)))
                             .flat()
  const uniqueMealTypes = [...new Set(allMealTypes)] as unknown as string[]
  const allowedMealTypes = Object.values(MealType) as string[]

  const isMealTypeAllowed = uniqueMealTypes.map((mealType) => allowedMealTypes.includes(mealType))

  if (isMealTypeAllowed.some((val) => val === false)) {
    throw new Error(`Invalid meal type. Provided MealTypes: ${uniqueMealTypes.toString()}. Expected: ${allowedMealTypes.toString()}`)
  }
}

function findBestMeal(meals: MealWithTags[], tagIds: number[]) {
  const scored = meals.map(m => ({
    ...m,
    score: m.tags.filter(t => tagIds.includes(t.id)).length
  }));
  const bestScore = Math.max(...scored.map(m => m.score));
  const bestMeals = scored.filter(m => m.score === bestScore);
  const randomIndex = Math.floor(Math.random() * bestMeals.length)
  const bestMeal = bestMeals[randomIndex];

  return bestMeal
}

export async function generateMealPlan(body: PlanGeneratorFormInput, userId: string) {
  validateBody(body)

  const mealPlans: Prisma.MealPlanCreateManyInput[] = []

  for (const [date, mealTypes] of Object.entries(body)) {
    for (const mealType of Object.keys(mealTypes) as MealType[]) {
      const tagIds = mealTypes[mealType];
      if (!tagIds || tagIds.length === 0) continue;

      const meals = await prisma.meal.findMany({
        where: { 
          tags: { some: { id: { in: tagIds } } },
          suggestedMealType: { has: mealType }
        },
        include: { tags: true }
      });

      if (!meals.length) continue;

      const bestMeal = findBestMeal(meals, tagIds);
      const parsedDate = new Date(Date.parse(date));

      const mealPlan = {
        date: parsedDate,
        type: mealType, 
        mealId: bestMeal.id,
        userId
      };

      console.log("Generated meal plan:", mealPlan);

      mealPlans.push(mealPlan);
    }
  }

  return await prisma.mealPlan.createMany({ data: mealPlans });
}
