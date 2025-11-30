import { PrismaClient, Prisma } from "@/app/generated/prisma/client"
import bcrypt from "bcrypt";
import { MealType } from "@/app/generated/prisma/enums";

const prisma = new PrismaClient()

const tagsData: Prisma.TagCreateInput[] = [
    { name: "Nabiał" },
    { name: "Wegetariańskie" },
    { name: "Owoce" },
    { name: "Mięso" },
    { name: "Deser" },
    { name: "Śniadanie" },
    { name: "Obiad" },
    { name: "Kolacja" },
    { name: "Bezglutenowe" },
    { name: "Wegańskie" },
    { name: "Szybkie" },
    { name: "Przekąska" },
    { name: "Zupy" },
    { name: "Sałatki" },
]

type SeedMeal = {
  name: string;
  tags: string[];
  ingredients: string[];
  description: string;
  suggestedMealType: MealType[];
};

const mealsData: SeedMeal[] = [
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
    {
    name: "Smoothie bowl z jagodami",
    tags: ["Wegetariańskie", "Śniadanie", "Bezglutenowe"],
    ingredients: ["Banany", "Jagody", "Mleko roślinne", "Płatki kokosowe"],
    description: "Kolorowa miska smoothie z owocami i chrupiącymi dodatkami."
    },
    {
        name: "Sałatka grecka",
        tags: ["Wegetariańskie", "Sałatki", "Obiad"],
        ingredients: ["Ogórek", "Pomidor", "Feta", "Oliwki", "Cebula"],
        description: "Klasyczna sałatka z warzyw, sera feta i oliwek."
    },
    {
        name: "Grillowana pierś z kurczaka",
        tags: ["Mięso", "Obiad", "Szybkie"],
        ingredients: ["Pierś z kurczaka", "Przyprawy", "Oliwa z oliwek"],
        description: "Soczysta pierś z kurczaka z aromatycznymi przyprawami."
    },
    {
        name: "Zupa krem z dyni",
        tags: ["Wegetariańskie", "Zupy", "Obiad"],
        ingredients: ["Dynia", "Cebula", "Bulion warzywny", "Śmietanka"],
        description: "Gładka, kremowa zupa z dyni z delikatną nutą przypraw."
    },
    {
        name: "Hummus z warzywami",
        tags: ["Wegańskie", "Przekąska", "Bezglutenowe"],
        ingredients: ["Ciecierzyca", "Tahini", "Oliwa", "Papryka", "Marchewka"],
        description: "Kremowy hummus podawany z chrupiącymi warzywami."
    },
    {
        name: "Naleśniki z dżemem",
        tags: ["Wegetariańskie", "Deser", "Śniadanie"],
        ingredients: ["Mąka", "Jajka", "Mleko", "Dżem"],
        description: "Delikatne naleśniki z ulubionym dżemem owocowym."
    },
    {
        name: "Sałatka z tuńczykiem",
        tags: ["Mięso", "Sałatki", "Obiad"],
        ingredients: ["Tuńczyk", "Sałata", "Pomidor", "Cebula", "Oliwa"],
        description: "Lekka sałatka z tuńczykiem, idealna na szybki lunch."
    },
    {
        name: "Kanapki z awokado",
        tags: ["Wegańskie", "Śniadanie", "Szybkie"],
        ingredients: ["Chleb pełnoziarnisty", "Awokado", "Pomidor", "Rukola"],
        description: "Zdrowe i szybkie kanapki z kremowym awokado."
    },
    {
        name: "Makaron z sosem pomidorowym",
        tags: ["Wegetariańskie", "Obiad", "Szybkie"],
        ingredients: ["Makaron", "Pomidory", "Czosnek", "Bazylia", "Oliwa"],
        description: "Prosty makaron w aromatycznym sosie pomidorowym."
    },
    {
        name: "Koktajl proteinowy",
        tags: ["Wegetariańskie", "Śniadanie", "Szybkie"],
        ingredients: ["Mleko", "Banan", "Białko w proszku", "Masło orzechowe"],
        description: "Energetyczny koktajl idealny na szybkie śniadanie lub przekąskę."
    }
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
        date: "2025-11-11", 
        type: "BREAKFAST",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
        {
        date: "2025-11-10",
        type: "LUNCH",
        meal: "Kurczak curry z ryżem",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-12",
        type: "BREAKFAST",
        meal: "Sałatka grecka",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-13",
        type: "DINNER",
        meal: "Jabłecznik domowy",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-14",
        type: "LUNCH",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-15",
        type: "BREAKFAST",
        meal: "Makaron aglio e olio",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-16",
        type: "DINNER",
        meal: "Sałatka grecka",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-17",
        type: "BREAKFAST",
        meal: "Kurczak curry z ryżem",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-18",
        type: "DESSERT",
        meal: "Jabłecznik domowy",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-20",
        type: "DINNER",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-22",
        type: "BREAKFAST",
        meal: "Makaron aglio e olio",
        user: { connect: { id: "iuasghuii1" } }
    },
        {
        date: "2025-11-10",
        type: "LUNCH",
        meal: "Kurczak curry z ryżem",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-12",
        type: "DESSERT",
        meal: "Smoothie tropikalne",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-13",
        type: "DINNER",
        meal: "Spaghetti bolognese",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-14",
        type: "LUNCH",
        meal: "Sałatka grecka",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-15",
        type: "BREAKFAST",
        meal: "Omlet warzywny",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-16",
        type: "DINNER",
        meal: "Chili con carne",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-17",
        type: "BREAKFAST",
        meal: "Owsianka z owocami",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-20",
        type: "DINNER",
        meal: "Makaron aglio e olio",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-22",
        type: "BREAKFAST",
        meal: "Placuszki bananowe",
        user: { connect: { id: "hjsaj1" } }
    }
]

export async function main() {
    // Seed tags
    await prisma.tag.createMany({ data: tagsData, skipDuplicates: true })

    // Seed meals
    const tagNames = tagsData.map(t => t.name)
    const tagRecords = await prisma.tag.findMany({ where: { name: { in: tagNames } } })
    const tagMap = new Map(tagRecords.map(t => [t.name, t.id]))

    for (const meal of mealsData) {
        const connect = meal.tags
            .map(tagName => tagMap.get(tagName))
            .filter((id): id is number => typeof id === "number")
            .map(id => ({ id }))

        await prisma.meal.create({ data: {
            name: meal.name,
            ingredients: meal.ingredients,
            description: meal.description,
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
  .catch((e) => console.error(e))
