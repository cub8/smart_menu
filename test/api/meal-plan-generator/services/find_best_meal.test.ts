import { describe, it, expect } from "vitest"
import { findBestMeal } from "@/app/api/meal-plan-generator/services"
import tagFactory from "@/test/factories/tag_factory"
import mealFactory from "@/test/factories/meal_factory"

describe("findBestMeal", () => {
  it('finds the meal with the most matched tags', async () => {
    const vegetarianTag = await tagFactory.vegetarian().create()
    const noGlutenTag = await tagFactory.noGluten().create()
    const fruitsTag = await tagFactory.fruits().create()
    const meatTag = await tagFactory.meat().create()
    const veganTag = await tagFactory.vegan().create()
    const fastTag = await tagFactory.quick().create()

    const meal1 = await mealFactory.create({
      name: "Owsianka z Owocami",
      tags: [vegetarianTag, fruitsTag, fastTag, noGlutenTag]
    })
    const meal2 = await mealFactory.create({
      name: "Kotlet schabowy",
      tags: [meatTag]
    })
    const meal3 = await mealFactory.create({
      name: "Makaron bez niczego",
      tags: [veganTag]
    })

    const meals = [meal1, meal2, meal3]
    const searchedTags = [vegetarianTag.id, fastTag.id, veganTag.id]
    const bestMeal = findBestMeal(meals, searchedTags)

    expect(bestMeal.name).toBe("Owsianka z Owocami")
  })
})
