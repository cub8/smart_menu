import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import PlannerClient from "./PlannerClient";

const PlannerPage = async () => {
  const session = await getSession();

  const meals = session?.user
    ? await prisma.mealPlan.findMany({
        where: { userId: session.user.id },
        orderBy: { id: "asc" },
        include: { meal: true },
      })
    : [];

  return <PlannerClient meals={meals} />;
};

export default PlannerPage;
