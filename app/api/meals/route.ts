import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { MealType } from "@/app/generated/prisma/enums";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        name: string;
        description?: string;
        ingredients: Record<string, number>;
        recipe?: string[];
        suggestedMealType: MealType[];
        tagIds: number[];
      }
    | null;

  if (!body || !body.name || !body.ingredients || !body.suggestedMealType) {
    return NextResponse.json(
      { error: "Missing required fields: name, ingredients, suggestedMealType" },
      { status: 400 }
    );
  }

  try {
    const meal = await prisma.meal.create({
      data: {
        name: body.name,
        description: body.description || null,
        ingredients: body.ingredients,
        recipe: body.recipe || [],
        suggestedMealType: body.suggestedMealType,
        userId: session.user.id,
        tags: {
          connect: body.tagIds.map((id) => ({ id })),
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json({ ok: true, meal }, { status: 201 });
  } catch (error) {
    console.error("Error creating meal:", error);
    return NextResponse.json(
      { error: "Failed to create meal" },
      { status: 500 }
    );
  }
}
