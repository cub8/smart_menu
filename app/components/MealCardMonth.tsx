"use client";
import {  Meal} from "../generated/prisma/client";
import { MealType } from "../generated/prisma/enums";

const MealCardMonth = ({meal, type}: {meal: Meal, type: MealType}) => {

    const mealEmoji: Record<string, string> = {
    BREAKFAST: "☕🥐",
    LUNCH: "🍝🍲",
    DINNER: "🍵🍛",
    };

  return (

    <div className='
    flex flex-row justify-between center 
    p-2
    shadow-md 
    bg-violet-600 text-lg text-center text-neutral-100'
    >
    
    <h2 className='text-sm font-semibold wrap-break-words text-center leading-tight truncate sm:whitespace-normal'> {meal.name} </h2>
    <p className='text-xs'> {mealEmoji[type]} </p> 


    </div>
  )
}

export default MealCardMonth
