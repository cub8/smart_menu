import { describe, it, expect } from "vitest"
import prisma from "@/lib/prisma"
import { createTag, toIdsArray } from "../helpers/records_creator"
import { findBestMeal } from "@/app/api/meal-plan-generator/services"

describe("findBestMeal", () => {
  it('finds the meal with the most matched tags', async () => {
    const vegetarianTag = await createTag("Wegetariańskie")
    const noGlutenTag = await createTag("Bezglutenowe")
    const fruitsTag = await createTag("Owoce")
    const meatTag = await createTag("Mięso")
    const veganTag = await createTag("Wegańskie")
    const fastTag = await createTag("Szybkie")

    const meal1 = await prisma.meal.create({
      data: { 
        name: "Owsianka z Owocami", 
        ingredients: {}, 
        tags: { 
          connect: toIdsArray([vegetarianTag, fruitsTag, fastTag, noGlutenTag])
        }
       },
       include: { tags: true }
    })
    const meal2 = await prisma.meal.create({
      data: { 
        name: "Kotlet schabowy", 
        ingredients: {}, 
        tags: { 
          connect: toIdsArray([meatTag])
        }
       },
       include: { tags: true }
    })
    const meal3 = await prisma.meal.create({
      data: { 
        name: "Makaron bez niczego", 
        ingredients: {}, 
        tags: { 
          connect: toIdsArray([veganTag])
        }
       },
       include: { tags: true }
    })

    const meals = [meal1, meal2, meal3]
    const searchedTags = [vegetarianTag.id, fastTag.id, veganTag.id]
    const bestMeal = findBestMeal(meals, searchedTags)

    expect(bestMeal.name).toBe("Owsianka z Owocami")
  })
})
