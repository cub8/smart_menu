import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";
import { createTag } from "../helpers/records_creator";

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
}));

import { getSession } from "@/lib/auth";

describe("POST /api/meals", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.resetModules();
  });

  it("creates a meal owned by the current user and connects tags", async () => {
    const userId = "user_1";

    await prisma.user.create({
      data: {
        id: userId,
        email: "user_1@example.com",
        password: "hashed-password",
        name: "User 1",
      },
    });

    const tag1 = await createTag("Wegetariańskie");
    const tag2 = await createTag("Szybkie");

    vi.mocked(getSession).mockResolvedValue({
      user: { id: userId },
    } as any);

    const { POST } = await import("@/app/api/meals/route");

    const req = new Request("http://localhost/api/meals", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Owsianka",
        description: "Prosta owsianka",
        ingredients: { oats: 80, milk: 200 },
        recipe: ["Wymieszaj", "Gotuj"],
        suggestedMealType: ["BREAKFAST"],
        tagIds: [tag1.id, tag2.id],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);

    const payload = await res.json();
    expect(payload.ok).toBe(true);
    expect(payload.meal.name).toBe("Owsianka");
    expect(payload.meal.userId).toBe(userId);
    expect(payload.meal.tags.map((t: any) => t.id).sort()).toEqual(
      [tag1.id, tag2.id].sort()
    );

    const created = await prisma.meal.findFirst({
      where: { name: "Owsianka", userId },
      include: { tags: true },
    });

    expect(created).not.toBeNull();
    expect(created!.tags.map((t) => t.id).sort()).toEqual(
      [tag1.id, tag2.id].sort()
    );
  });

  it("returns 401 when there is no authenticated user", async () => {
    vi.mocked(getSession).mockResolvedValue(null as any);

    const { POST } = await import("@/app/api/meals/route");

    const req = new Request("http://localhost/api/meals", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Owsianka",
        ingredients: { oats: 80 },
        suggestedMealType: ["BREAKFAST"],
        tagIds: [],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);

    const payload = await res.json();
    expect(payload.error).toBe("Unauthorized");
  });
});
