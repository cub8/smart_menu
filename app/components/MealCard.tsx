"use client";
import React from 'react'
import { Meal } from '../models/meal';

const MealCard = ({meal}: {meal: Meal}) => {

    const mealEmoji: Record<string, string> = {
    breakfast: "Śniadanie ☕🥐",
    lunch: "Obiad 🍝🍲",
    dinner: "Kolacja 🍵🍛",
    };

  return (

    <div className='
    flex flex-col justify-between center 
    h-30 w-full p-2
    rounded-2xl shadow-md 
    bg-violet-400 text-lg text-center text-neutral-100'
    >
    
    <h2 className='text-xl font-semibold wrap-break-words text-center leading-tight truncate sm:whitespace-normal'> {meal.name} </h2>
    <p className='text-xs text-neutral-50'> {mealEmoji[meal.type]} </p> 


    </div>
  )
}

export default MealCard