import { describe, it, expect, beforeEach } from "vitest"
import prisma from "@/lib/prisma"
import { generateMealPlan } from "@/app/api/meal-plan-generator/services"
import tagFactory from "@/test/factories/tag_factory"
import mealFactory, { MealWithTags } from "@/test/factories/meal_factory"
import { MealType } from "@/app/generated/prisma/enums"
import userFactory from "@/test/factories/user_factory"
import { type Tag, type User, type MealPlan } from "@/app/generated/prisma/client"

describe("generateMealPlan", () => {
  let user: User
  let noGlutenTag: Tag
  let fruitsTag: Tag
  let meatTag: Tag
  let quickTag: Tag
  let dessert: MealWithTags
  let lunch: MealWithTags

  beforeEach(async() => {
    user = await userFactory.create()
    noGlutenTag = await tagFactory.noGluten().create()
    fruitsTag = await tagFactory.fruits().create()
    meatTag = await tagFactory.meat().create()
    quickTag = await tagFactory.quick().create()
    dessert = await mealFactory.create({
      name: "Deser owocowy",
      suggestedMealType: [MealType.DESSERT],
      tags: [noGlutenTag, fruitsTag]
    })
    lunch = await mealFactory.create({
      name: "Schabowy",
      suggestedMealType: [MealType.LUNCH],
      tags: [meatTag, quickTag]
    })
  })

  it("Generates meal plan with meal with provided meal type and tags", async () => {
    const requestBody = {
      "2025-12-06": {
        "BREAKFAST": [],
        "LUNCH": [meatTag, quickTag].map((tag) => tag.id),
        "DESSERT": [],
        "DINNER": []
      },
    }

    const { count, failedToCreate } = await generateMealPlan(requestBody, user.id)

    expect(count).toEqual(1)
    expect(failedToCreate.length).toEqual(0)

    const mealPlan = await prisma.mealPlan.findFirst() as MealPlan
    expect(mealPlan.type).toEqual(MealType.LUNCH)
    expect(mealPlan.mealId).toEqual(lunch.id)
    expect(mealPlan.date).toEqual(new Date("2025-12-06"))
  })

  it("Generates meal plan with random meal with provided meal type if no meal with type and tags is found", async () => {
    const requestBody = {
      "2025-12-06": {
        "BREAKFAST": [],
        "LUNCH": [],
        "DESSERT": [meatTag, quickTag].map((tag) => tag.id),
        "DINNER": []
      },
    }

    const { count, failedToCreate } = await generateMealPlan(requestBody, user.id)

    expect(count).toEqual(1)
    expect(failedToCreate.length).toEqual(1)

    const mealPlan = await prisma.mealPlan.findFirst() as MealPlan
    expect(mealPlan.type).toEqual(MealType.DESSERT)
    expect(mealPlan.mealId).toEqual(dessert.id)
    expect(mealPlan.date).toEqual(new Date("2025-12-06"))
  })
})
