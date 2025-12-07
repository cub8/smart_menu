import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generateMealPlan } from "./services";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null))

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  
  try {
    const { count, failedToCreate } = await generateMealPlan(body, session.user.id)
    return NextResponse.json({ ok: true, count, failedToCreate }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 422 });
  }
}
