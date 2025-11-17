import MealCalendar from '../components/MealCalendar'
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

const PlannerPage = async () => {
  const session = await getSession();


  const meals = session?.user ? await prisma.mealPlan.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "asc" },
    include: { meal: true }
  }) : [];

  console.log("MEALS IN PLANNER PAGE:", meals);


  return (

    <div> 
      <h2 className='mt-10 flex justify-center text-3xl text-purple-500'> Twój plan posiłków </h2> 
      <div className='container mx-auto p-10'> 
        <MealCalendar mealPlan={meals}/>
      </div>
    </div>

  )
}

export default PlannerPage
