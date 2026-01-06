import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

type Ctx = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_req: NextRequest, context: Ctx) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const listId = Number(id);

  if (!Number.isFinite(listId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const list = await prisma.shoppingList.findUnique({
    where: { id: listId },
    select: { id: true, userId: true },
  });

  if (!list || list.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.shoppingList.delete({ where: { id: listId } });

  return NextResponse.json({ ok: true }, { status: 200 });
}
