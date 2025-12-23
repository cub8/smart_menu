import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    

}