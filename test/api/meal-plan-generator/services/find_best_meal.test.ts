import { describe, it, expect } from "vitest"
import prisma from "@/lib/prisma"
import { toIdsArray } from "@test/helpers/records_creator"
import { findBestMeal } from "@/app/api/meal-plan-generator/services"
import tagFactory from "@/test/factories/tag_factory"

describe("findBestMeal", () => {
  it('finds the meal with the most matched tags', async () => {
    const vegetarianTag = await tagFactory.vegetarian().create()
    const noGlutenTag = await tagFactory.noGluten().create()
    const fruitsTag = await tagFactory.fruits().create()
    const meatTag = await tagFactory.meat().create()
    const veganTag = await tagFactory.vegan().create()
    const fastTag = await tagFactory.quick().create()

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
