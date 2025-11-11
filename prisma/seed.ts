import { PrismaClient, Prisma } from "@/app/generated/prisma/client"

const prisma = new PrismaClient()

const mealsData: Prisma.MealCreateInput[] = [
    {
        name: "Owsianka z owocami",
        tags: ["Wegetariańskie", "Nabiał", "Śniadanie"],
        ingredients: ["Płatki owsiane", "Jogurt naturalny", "Banany", "Truskawki"],
        description: "Kremowa owsianka na jogurcie z sezonowymi owocami."
    },
    {
        name: "Sałatka grecka",
        tags: ["Wegetariańskie"],
        ingredients: ["Sałata", "Pomidor", "Ogórek", "Ser feta", "Oliwki", "Oliwa"],
        description: "Klasyczna sałatka z fetą i oliwkami."
    },
    {
        name: "Kurczak curry z ryżem",
        tags: ["Mięso"],
        ingredients: ["Pierś z kurczaka", "Mleko kokosowe", "Pasta curry", "Ryż basmati"],
        description: "Aromatyczne curry na mleku kokosowym podawane z ryżem."
    },
    {
        name: "Makaron aglio e olio",
        tags: ["Wegetariańskie"],
        ingredients: ["Spaghetti", "Czosnek", "Oliwa", "Papryczka chilli", "Pietruszka"],
        description: "Szybki makaron z czosnkiem, oliwą i chilli."
    },
    {
        name: "Jabłecznik domowy",
        tags: ["Deser", "Owoce"],
        ingredients: ["Jabłka", "Mąka", "Masło", "Cukier", "Cynamon"],
        description: "Klasyczne ciasto z dużą ilością jabłek i cynamonu."
    }
]

const tagsData: Prisma.TagCreateInput[] = [
    { name: "Nabiał" },
    { name: "Wegetariańskie" },
    { name: "Owoce" },
    { name: "Mięso" },
    { name: "Deser" },
    { name: "Śniadanie" }
]

export async function main() {
    //await prisma.meal.deleteMany()
    //await prisma.tag.deleteMany()

    for (const meal of mealsData) {
        await prisma.meal.create({ data: meal })
    }

    for (const tag of tagsData) {
        await prisma.tag.create({ data: tag })
    }
}

main()
