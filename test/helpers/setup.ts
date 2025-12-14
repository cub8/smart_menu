import resetDB from "./reset-db"
import { beforeEach, afterAll } from "vitest"
import prisma from "@/lib/prisma"

beforeEach(async () => {
    await resetDB()
})

afterAll(async () => {
  await prisma.$disconnect()
})
