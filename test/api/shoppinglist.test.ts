import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest } from "next/server";

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
}));

describe("POST /api/shopping-list", () => {
  beforeEach(async () => {
    vi.resetAllMocks();
    vi.resetModules();

    await prisma.shoppingList.deleteMany();
    await prisma.mealPlan.deleteMany();
    await prisma.meal.deleteMany();
    await prisma.user.deleteMany();
  });

  // test dla sumowania skladnikow listy

  it("tworzy liste zakupow z poprawnie zsumowanymi skladnikami", async () => {

    const userId = "user_test_shop";
    await prisma.user.create({
      data: {
        id: userId,
        email: "liketoshop@gmail.com",
        password: "hashed-password",
        name: "Shopper",
      },
    });

    const meal1 = await prisma.meal.create({
        data: {
            name: "Kanapki z serem i ogórkiem",
            ingredients: { "chleb": 100, "ser": 40, "ogórek": 20 },
            recipe: ["Posmaruj chleb", "Dodaj ser i ogórek"],
            userId: userId,
            suggestedMealType: ["BREAKFAST"],
        },
    });

        const meal2 = await prisma.meal.create({
        data: {
            name: "Tosty ala pizza",
            ingredients: { "chleb": 140, "ser": 60, "szynka": 50, "pieczarki": 30, "ketchup": 10 },
            recipe: ["Ułóż składniki na chlebie", "Podpiecz w tosterze"],
            userId: userId,
            suggestedMealType: ["DINNER"],
        },
    });

        const meal3 = await prisma.meal.create({
        data: {
            name: "Makaron mac and cheese",
            ingredients: { "makaron": 150, "ser": 200, "przyprawy": 10 },
            recipe: ["Ugotuj makaron", "Dodaj ser i przyprawy"],
            userId: userId,
            suggestedMealType: ["LUNCH"],
        },
    });

    await prisma.mealPlan.create({
    data: { date: new Date("2025-12-22"), type: "BREAKFAST", mealId: meal1.id, userId }
    });
    await prisma.mealPlan.create({
    data: { date: new Date("2025-12-22"), type: "DINNER", mealId: meal2.id, userId }
    });
    await prisma.mealPlan.create({
    data: { date: new Date("2025-12-22"), type: "LUNCH", mealId: meal3.id, userId }
    });

    // mokowanie zalogowanego uzytkownika
    vi.mocked(getSession).mockResolvedValue({ user: { id: userId } } as any);

    // import funkcji POST z api
    const { POST } = await import("@/app/api/shopping-list/route");

    const req = new NextRequest("http://localhost/api/shopping-list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        start: "2025-12-21",
        end: "2025-12-23",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);

    const payload = await res.json();
    expect(payload.shoppingList.userId).toBe(userId);

    const savedList = await prisma.shoppingList.findFirst({
      where: { userId },
    });

    const expectedItems = [
    { name: "chleb", amount: 240 },
    { name: "ser", amount: 300 },
    { name: "ketchup", amount: 10 },
    { name: "makaron", amount: 150 },
    { name: "ogórek", amount: 20 },
    { name: "pieczarki", amount: 30 },
    { name: "przyprawy", amount: 10 },
    { name: "szynka", amount: 50 },
    ];

    // sortujemy po nazwie
    const sortByName = (a: any, b: any) => a.name.localeCompare(b.name);

    expect(payload.shoppingList.items.sort(sortByName)).toEqual(
    expectedItems.sort(sortByName)
    );

  });

    it("zwraca 401 jeśli użytkownik niezalogowany", async () => {
    vi.mocked(getSession).mockResolvedValue(null as any);

    const { POST } = await import("@/app/api/shopping-list/route");

    const req = new NextRequest("http://localhost/api/shopping-list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ start: "2025-12-22", end: "2025-12-22" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);

    const payload = await res.json();
    expect(payload.error).toBe("Unauthorized");
  });

});