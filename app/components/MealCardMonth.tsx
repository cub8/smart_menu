"use client";
import { Meal } from '../models/meal';

const MealCardMonth = ({meal}: {meal: Meal}) => {

    const mealEmoji: Record<string, string> = {
    breakfast: "☕🥐",
    lunch: "🍝🍲",
    dinner: "🍵🍛",
    };

  return (

    <div className='
    flex flex-row justify-between center 
    p-2
    shadow-md 
    bg-violet-600 text-lg text-center text-neutral-100'
    >
    
    <h2 className='text-sm font-semibold wrap-break-words text-center leading-tight truncate sm:whitespace-normal'> {meal.name} </h2>
    <p className='text-xs'> {mealEmoji[meal.type]} </p> 


    </div>
  )
}

export default MealCardMonth
