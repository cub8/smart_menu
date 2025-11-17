"use client";
import {  Meal} from "../generated/prisma/client";
import { MealType } from "../generated/prisma/enums";

const MealCard = ({meal, type}: {meal: Meal, type: MealType}) => {

    const mealEmoji: Record<string, string> = {
    BREAKFAST: "Śniadanie ☕🥐",
    LUNCH: "Obiad 🍝🍲",
    DINNER: "Kolacja 🍵🍛",
    };

  return (

    <div className='
    flex flex-col justify-between center 
    h-30 w-full p-2
    rounded-2xl shadow-md 
    bg-violet-400 text-lg text-center text-neutral-100'
    >
    
    <h2 className='text-xl font-semibold wrap-break-words text-center leading-tight truncate sm:whitespace-normal'> {meal.name} </h2>
    <p className='text-xs'> {mealEmoji[type]} </p> 

    </div>
  )
}

export default MealCard
