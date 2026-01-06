import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {start, end} = await request.json();

    if (!start || !end) {
        return NextResponse.json(
        { error: "Brak daty startowej lub końcowej" },
        { status: 400 }
        )
    }

    const startDate = new Date(start)
    const endDate = new Date(end)


    // getting meal plans within date range

    try {
        const mealPlans = await prisma.mealPlan.findMany({
            where: {
                userId: session.user.id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: { meal : true },
        });


    const shoppingListMap = new Map<string, number>()

    for (const plan of mealPlans) {
        const ingredients = plan.meal.ingredients as Record<string, number>
        for (const [name, amount] of Object.entries(ingredients)) {
            shoppingListMap.set(
                name,
                (shoppingListMap.get(name) ?? 0) + amount
            )
        }
    }

    const shoppingListItems = Array.from(shoppingListMap.entries())
    .map(([name, amount]) => ({name,amount,}))
    .sort((a, b) => a.name.localeCompare(b.name))   

    // 

    const shoppingList = await prisma.shoppingList.create({
        data: {
            userId: session.user.id,
            startDate: startDate,
            endDate: endDate,
            items: shoppingListItems,
        },
    });

    return NextResponse.json({ shoppingList }, { status: 201 });


    } catch (error) {
        return NextResponse.json(
            { error: "Błąd podczas tworzenia listy zakupów" },
            { status: 500 }
        );
    }


}