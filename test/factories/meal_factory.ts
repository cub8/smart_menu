import prisma from "@/lib/prisma"
import { Factory } from "fishery"
import { Prisma, type Meal, type Tag} from "@/app/generated/prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"

interface MealWithTags extends Meal {
  tags: Tag[];
}

class MealFactory extends Factory<MealWithTags> { }

const mealFactory = MealFactory.define(({ sequence, params, onCreate }) => {
  onCreate((meal) => {
    const tags = meal.tags || []

    return prisma.meal.create({
      data: {
        ...meal,
        id: undefined,
        ingredients: (meal.ingredients ?? {}) as Prisma.InputJsonValue,
        recipe: (meal.recipe ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        tags: {
          connect: tags.map(tag => ({ id: tag.id }))
        }
      },
      include: { tags: true }
    })
  })

  return {
    id: sequence,
    name: params.name!,
    ingredients: (params.ingredients || {}) as JsonValue,
    description: params.description ?? null,
    recipe: (params.recipe || []) as JsonValue,
    suggestedMealType: params.suggestedMealType || [],
    userId: params.userId ?? null,
    tags: params.tags || []
  }
})

export default mealFactory
