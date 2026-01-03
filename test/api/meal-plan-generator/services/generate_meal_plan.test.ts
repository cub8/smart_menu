import { describe, it, expect } from "vitest"
import prisma from "@/lib/prisma"
import { createTag, toIdsArray } from "@test/helpers/records_creator"
import { generateMealPlan } from "@/app/api/meal-plan-generator/services"

describe("generateMealPlan", () => {
  it("Generates meal plan with random meal with provided meal type if no meal with type and tags is found", async () => {
    
  })

  it("Generates meal plan with meal with provided meal type and tags", async () => {
    
  })
})