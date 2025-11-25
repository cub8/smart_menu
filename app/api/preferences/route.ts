import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Prisma, DayOfWeek } from "@/app/generated/prisma/client";

const DAYS: Array<"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"> = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [tags, preferences] = await Promise.all([
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
    prisma.userPreference.findMany({
      where: { userId: session.user.id },
      select: { tagId: true, dayOfWeek: true },
    }),
  ]);

  const preferencesByDay: Record<string, number[]> = {};
  for (const day of DAYS) {
    preferencesByDay[day] = [];
  }

  for (const pref of preferences) {
    const day = pref.dayOfWeek as keyof typeof preferencesByDay;
    if (!preferencesByDay[day]) {
      preferencesByDay[day] = [];
    }
    preferencesByDay[day].push(pref.tagId);
  }

  return NextResponse.json({
    tags,
    preferencesByDay,
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { preferencesByDay: Record<string, number[]> }
    | null;

  if (!body || typeof body.preferencesByDay !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const userId = session.user.id;

  const data: Prisma.UserPreferenceCreateManyInput[] = [];

  for (const day of DAYS) {
    const tagIds = body.preferencesByDay[day] ?? [];
    if (!Array.isArray(tagIds)) continue;

    const uniqueTagIds = [...new Set(tagIds.map(Number))];
    for (const tagId of uniqueTagIds) {
      if (Number.isNaN(tagId)) continue;
      data.push({ userId, dayOfWeek: day, tagId });
    }
  }

  await prisma.$transaction([
    prisma.userPreference.deleteMany({ where: { userId } }),
    data.length
      ? prisma.userPreference.createMany({
          data,
          skipDuplicates: true,
        })
      : prisma.userPreference.deleteMany({ where: { userId } }),
  ]);

  return NextResponse.json({ ok: true });
}
