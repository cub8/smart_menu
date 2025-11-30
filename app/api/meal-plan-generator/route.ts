import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
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

async function findBestMeal(meals: MealWithTags[], tagIds: number[]) {
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

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, Record<MealType, number[]>> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const mealPlans: Prisma.MealPlanCreateManyInput[] = []

  for (const [date, mealsByType] of Object.entries(body)) {
    for (const mealType of Object.keys(mealsByType) as MealType[]) {
      const tagIds = mealsByType[mealType];
      if (!tagIds || tagIds.length === 0) continue;

      const meals = await prisma.meal.findMany({
        where: { tags: { some: { id: { in: tagIds } } } },
        include: { tags: true }
      });

      if (!meals.length) continue;

      const bestMeal = await findBestMeal(meals, tagIds);
      const parsedDate = new Date(Date.parse(date));

      const mealPlan = {
        date: parsedDate,
        type: mealType, 
        mealId: bestMeal.id,
        userId: session.user.id
      };

      console.log("Generated meal plan:", mealPlan);

      mealPlans.push(mealPlan);
    }
  }

  try {
    const result = await prisma.mealPlan.createMany({ data: mealPlans });
    return NextResponse.json({ ok: true, count: result.count }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 422 });
  }
}
