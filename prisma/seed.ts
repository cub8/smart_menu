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

const userData: Prisma.UserCreateInput[] = [
    { id: "iuasghuii1",
        name: "Igor Dev",
        email: "igor.dev@gmail.com",
        password: "$2a$12$1dIbLh4yv4F2yoNfpjCcuey0XPgLKS3U2HCSa6Sd5MWxR1FDVacL6" // hash dla test123
     },
    { id: "hjsaj1",
        name: "Piotrek Tester",
        email: "piter.zalin@wp",
        password: "$2a$12$1dIbLh4yv4F2yoNfpjCcuey0XPgLKS3U2HCSa6Sd5MWxR1FDVacL6" 
     },
]

const mealPlanData: Prisma.MealPlanCreateInput[] = [
    {
        date: new Date("2025-11-11"), 
        type: "BREAKFAST",
        meal: { connect: { id: 1 } },
        user: { connect: { id: "iuasghuii1" } }
    }
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
    
    for (const user of userData) {
        await prisma.user.create({ data: user })
    }
    
    for (const plan of mealPlanData) {
        await prisma.mealPlan.create({ data: plan })
    }
}

main()
