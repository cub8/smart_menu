// src/tests/helpers/reset-db.ts

import prisma from "@/lib/prisma"

export default async function resetDB() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "MealPlan",
      "UserPreference",
      "Meal",
      "User",
      "Tag"
    RESTART IDENTITY CASCADE;
  `)
}
