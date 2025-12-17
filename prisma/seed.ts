import { PrismaClient, Prisma } from "@/app/generated/prisma/client"
import bcrypt from "bcrypt";
import { mealsData} from "../app/meals/meals.config";

const prisma = new PrismaClient()

const UNIVERSAL_TAG_NAMES = [
    "Wegetariańskie",
    "Bezglutenowe",
    "Wegańskie",
    "Szybkie",
    "Przekąska",
] as const

const tagsData: Prisma.TagCreateInput[] = [
    { name: "Nabiał" },
    { name: "Wegetariańskie" },
    { name: "Owoce" },
    { name: "Mięso" },
    { name: "Bezglutenowe" },
    { name: "Wegańskie" },
    { name: "Szybkie" },
    { name: "Przekąska" },
    { name: "Zupa" },
    { name: "Sałatki" },
    { name: "Warzywa" },
    { name: "Ryba" },
    { name: "Tortilla" },
    { name: "Włoskie" },
    { name: "Azjatyckie" },
    { name: "Meksykańskie" },
    { name: "Czekolada" },
    { name: "Grzyby" },
    { name: "Polskie" },
    { name: "Kurczak" },
    { name: "Ryż" },
    { name: "Makaron" },
    { name: "Ciasto" },
    { name: "Jajka" },
    { name: "Kanapka" },
]


const userData: Prisma.UserCreateInput[] = [
    { id: "iuasghuii1",
        name: "Igor Dev",
        email: "igor.dev@gmail.com",
        password: "test123" 
     },
    { id: "hjsaj1",
        name: "Piotrek Tester",
        email: "piter.zalin@wp.pl",
        password: "test123" 
     },
]

type SeedMealPlan = {
    date: string,
    type: "BREAKFAST" | "LUNCH" | "DINNER" | "DESSERT",
    meal: string,
    user: { 
        connect: { 
            id: string 
        } 
    }
}


const mealPlanData: SeedMealPlan[] = [
    {
        date: "2025-12-04", 
        type: "BREAKFAST",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-12-03", 
        type: "DINNER",
        meal: "Sałatka grecka",
        user: { connect: { id: "iuasghuii1" } }
    },
]

export async function main() {
    // Seed tags
    await prisma.tag.createMany({ data: tagsData, skipDuplicates: true })

    await prisma.tag.updateMany({
        where: { name: { in: Array.from(UNIVERSAL_TAG_NAMES) } },
        data: { section: "UNIVERSAL" },
    })

    await prisma.tag.updateMany({
        where: { name: { notIn: Array.from(UNIVERSAL_TAG_NAMES) } },
        data: { section: "SPECIFIC" },
    })

    // Seed meals
    const tagNames = tagsData.map(t => t.name)
    const tagRecords = await prisma.tag.findMany({ where: { name: { in: tagNames } } })
    const tagMap = new Map(tagRecords.map(t => [t.name, t.id]))

    for (const meal of mealsData) {
        const connect = meal.tags.map(tagName => { 
          const id = tagMap.get(tagName)
          
          if (typeof id !== "number") {
            throw new Error(`Tag not found: "${tagName}"`)
          }

          return { id }
        })

        await prisma.meal.create({ data: {
            name: meal.name,
            ingredients: meal.ingredients,
            userId: null,
            description: meal.description,
            recipe: meal.recipe ?? undefined, // moze nie byc przepisu
            suggestedMealType: meal.suggestedMealType,
            tags: {
                connect
            }
        } })
    }
    
    // Seed users
    for (const user of userData) {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        await prisma.user.create({ 
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: hashedPassword
            }
        })
    }
    
    // Seed mealPlans
    const mealNames = mealsData.map(t => t.name)
    const mealRecords = await prisma.meal.findMany({ where: { name: { in: mealNames } } })
    const mealMap = new Map(mealRecords.map(t => [t.name, t.id]))

    for (const plan of mealPlanData) {
        const connect = { id: mealMap.get(plan.meal) }

        await prisma.mealPlan.create({ data: {
            date: new Date(plan.date),
            type: plan.type,
            user: plan.user,
            meal: {
                connect
            }
        } })
    }
}

main()
