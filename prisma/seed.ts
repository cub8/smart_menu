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
    },
        {
        name: "Smoothie tropikalne",
        tags: ["Wegetariańskie", "Owoce", "Śniadanie"],
        ingredients: ["Mango", "Ananas", "Banan", "Jogurt naturalny"],
        description: "Orzeźwiające smoothie z tropikalnych owoców."
    },
    {
        name: "Omlet warzywny",
        tags: ["Wegetariańskie", "Śniadanie"],
        ingredients: ["Jajka", "Papryka", "Szpinak", "Cebula", "Ser żółty"],
        description: "Puszysty omlet z warzywami i serem."
    },
    {
        name: "Spaghetti bolognese",
        tags: ["Mięso"],
        ingredients: ["Makaron spaghetti", "Mięso mielone", "Pomidory", "Cebula", "Czosnek"],
        description: "Klasyczne włoskie danie z sosem mięsnym."
    },
    {
        name: "Chili con carne",
        tags: ["Mięso"],
        ingredients: ["Mięso mielone", "Fasola czerwona", "Pomidory", "Papryka", "Przyprawy"],
        description: "Ostre danie meksykańskie z mięsem i fasolą."
    },
    {
        name: "Placuszki bananowe",
        tags: ["Wegetariańskie", "Deser", "Śniadanie", "Owoce"],
        ingredients: ["Banany", "Mąka", "Jajka", "Mleko", "Cynamon"],
        description: "Słodkie i puszyste placuszki bananowe."
    },
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
        email: "piter.zalin@wp.pl",
        password: "$2a$12$1dIbLh4yv4F2yoNfpjCcuey0XPgLKS3U2HCSa6Sd5MWxR1FDVacL6" 
     },
]

const mealPlanData: Prisma.MealPlanCreateInput[] = [
    {
        date: new Date("2025-11-11"), 
        type: "BREAKFAST",
        meal: { connect: { id: 1 } },
        user: { connect: { id: "iuasghuii1" } }
    },
        {
        date: new Date("2025-11-10"),
        type: "LUNCH",
        meal: { connect: { id: 3 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-12"),
        type: "BREAKFAST",
        meal: { connect: { id: 2 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-13"),
        type: "DINNER",
        meal: { connect: { id: 5 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-14"),
        type: "LUNCH",
        meal: { connect: { id: 1 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-15"),
        type: "BREAKFAST",
        meal: { connect: { id: 4 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-16"),
        type: "DINNER",
        meal: { connect: { id: 2 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-17"),
        type: "BREAKFAST",
        meal: { connect: { id: 3 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-18"),
        type: "LUNCH",
        meal: { connect: { id: 5 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-20"),
        type: "DINNER",
        meal: { connect: { id: 1 } },
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: new Date("2025-11-22"),
        type: "BREAKFAST",
        meal: { connect: { id: 4 } },
        user: { connect: { id: "iuasghuii1" } }
    },
        {
        date: new Date("2025-11-10"),
        type: "LUNCH",
        meal: { connect: { id: 3 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-12"),
        type: "BREAKFAST",
        meal: { connect: { id: 6 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-13"),
        type: "DINNER",
        meal: { connect: { id: 8 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-14"),
        type: "LUNCH",
        meal: { connect: { id: 2 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-15"),
        type: "BREAKFAST",
        meal: { connect: { id: 7 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-16"),
        type: "DINNER",
        meal: { connect: { id: 9 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-17"),
        type: "BREAKFAST",
        meal: { connect: { id: 1 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-18"),
        type: "LUNCH",
        meal: { connect: { id: 11 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-20"),
        type: "DINNER",
        meal: { connect: { id: 4 } },
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: new Date("2025-11-22"),
        type: "BREAKFAST",
        meal: { connect: { id: 10 } },
        user: { connect: { id: "hjsaj1" } }
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
