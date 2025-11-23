import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();
    const { date } = body as { date?: string };

    console.log("PATCH /api/meal-plan/[id]", { id, date });

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Nieprawidłowe id", details: id },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "Brak pola 'date' w body" },
        { status: 400 }
      );
    }

    const jsDate = new Date(date);
    if (isNaN(jsDate.getTime())) {
      return NextResponse.json(
        { error: "Nieprawidłowy format daty", details: date },
        { status: 400 }
      );
    }

    const updated = await prisma.mealPlan.update({
      where: { id: Number(id) },
      data: { date: jsDate },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Błąd aktualizacji mealPlan:", err);

    if (err?.code === "P2025") {
      return NextResponse.json(
        { error: "MealPlan o takim id nie istnieje", code: "P2025" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Błąd serwera przy aktualizacji meal planu",
        code: err?.code,
        details: err?.message,
      },
      { status: 500 }
    );
  }
}
