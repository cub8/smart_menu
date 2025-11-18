import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [tags, preferences] = await Promise.all([
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
    prisma.userPreference.findMany({
      where: { userId: session.user.id },
      select: { tagId: true },
    }),
  ]);

  const selectedTagIds = new Set(preferences.map((p) => p.tagId));

  return NextResponse.json({
    tags,
    selectedTagIds: Array.from(selectedTagIds),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as
    | { tagIds: number[] }
    | null;

  if (!body || !Array.isArray(body.tagIds)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const userId = session.user.id;
  const tagIds = [...new Set(body.tagIds.map(Number))];

  await prisma.$transaction([
    prisma.userPreference.deleteMany({ where: { userId } }),
    prisma.userPreference.createMany({
      data: tagIds.map((tagId) => ({ userId, tagId })),
      skipDuplicates: true,
    }),
  ]);

  return NextResponse.json({ ok: true });
}