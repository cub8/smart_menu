import { PrismaClient, Prisma } from "@/app/generated/prisma/client"

const prisma = new PrismaClient()

const mealsData: Prisma.MealCreateInput[] = [
    {
        name: "Przykładowy posiłek",
        tags: ["Nabiał", "Wegetariańskie"],
        ingredients: ["Ser szwajcarski", "12 jabłek"],
        description: "To jest opis przykładowego posiłku"
    }
]

const tagsData: Prisma.TagCreateInput[] = [
    { name: "Nabiał" },
    { name: "Wegetariańskie" },
    { name: "Owoce" }
]

export async function main() {
    for (const meal of mealsData) {
        await prisma.meal.create({ data: meal })
    }

    for (const tag of tagsData) {
        await prisma.tag.create({ data: tag })
    }
}

main()
