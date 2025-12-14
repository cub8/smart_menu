import prisma from "@/lib/prisma"
import { Prisma, MealType, TagSection } from "@/app/generated/prisma/client";
import strftime from "strftime"
import { JsonValue } from "@prisma/client/runtime/library";

interface MealWithTags {
  id: number;
  name: string;
  ingredients: JsonValue;
  recipe?: JsonValue;
  description: string | null;
  tags: {
    id: number;
    name: string;
    section: TagSection;
  }[];
}

export interface FailedToCreate {
  weekday: string;
  date: string;
  mealType: string;
  tags: string[];
}

type PlanGeneratorFormInput = Record<string, Record<MealType, number[]>>

const weekDayLocaleMap: Record<string, string> = {
  Monday: "Poniedziałek",
  Tuesday: "Wtorek",
  Wednesday: "Środa",
  Thursday: "Czwartek",
  Friday: "Piątek",
  Saturday: "Sobota",
  Sunday: "Niedziela"
}

const mealTypeLocaleMap: Record<string, string> = {
  BREAKFAST: "Śniadanie",
  LUNCH: "Obiad",
  DINNER: "Kolacja",
  DESSERT: "Deser"
}

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

async function mealsByMealTypeAndTagIds(mealType: MealType, tagIds: number[]) {
  return await prisma.meal.findMany({
        where: { 
          tags: { some: { id: { in: tagIds } } },
          suggestedMealType: { has: mealType }
        },
        include: { tags: true }
      });
}

async function mealsByTagIds(tagIds: number[]) {
  return await prisma.meal.findMany({
        where: { 
          tags: { some: { id: { in: tagIds } } }
        },
        include: { tags: true }
      });
}

async function buildFailedToCreateObject(tagIds: number[], parsedDate: Date, mealType: MealType) {
  const formattedDate = strftime("%d.%m.%Y", parsedDate)
  const weekday = weekDayLocaleMap[strftime("%A", parsedDate)]
  const tags = (await prisma.tag.findMany({ where: { id: { in: tagIds}}})).map((tag) => tag.name)
  const mealTypePolish = mealTypeLocaleMap[mealType]

  return {
    weekday,
    date: formattedDate,
    mealType: mealTypePolish,
    tags,
  }
}

export function findBestMeal(meals: MealWithTags[], tagIds: number[]) {
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
  const failedToCreate: FailedToCreate[] = []

  for (const [date, mealTypes] of Object.entries(body)) {
    for (const mealType of Object.keys(mealTypes) as MealType[]) {
      const tagIds = mealTypes[mealType];
      if (!tagIds || tagIds.length === 0) continue;

      const parsedDate = new Date(Date.parse(date))
      const mealsWithMealType = await mealsByMealTypeAndTagIds(mealType, tagIds)

      const meal = await (async () => {
        if (mealsWithMealType.length == 0) {
          const failedToCreateObject = await buildFailedToCreateObject(tagIds, parsedDate, mealType)
          failedToCreate.push(failedToCreateObject)

          const mealsByTags = await mealsByTagIds(tagIds)

          return findBestMeal(mealsByTags, tagIds)
        }
        else {
          return findBestMeal(mealsWithMealType, tagIds)
        }
      })()

      if (meal === undefined) {
        continue 
      }

      const mealPlan = {
        date: parsedDate,
        type: mealType, 
        mealId: meal.id,
        userId
      };

      mealPlans.push(mealPlan);
    }
  }

  const result = await prisma.mealPlan.createMany({ data: mealPlans })
  const count = result.count

  return { count, failedToCreate };
}
