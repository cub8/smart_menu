import prisma from "@/lib/prisma"
import { Factory } from "fishery"
import { Tag, TagSection } from "@/app/generated/prisma/client"

type TagParams = {
  name: string
  section?: TagSection
}

class TagFactory extends Factory<Tag, TagParams> {
  vegetarian() { return this.params({ name: "Wegetariańskie" }) }
  noGluten()   { return this.params({ name: "Bezglutenowe" }) }
  fruits()     { return this.params({ name: "Owoce" }) }
  meat()       { return this.params({ name: "Mięso" }) }
  vegan()      { return this.params({ name: "Wegańskie" }) }
  quick()      { return this.params({ name: "Szybkie" }) }
}

const tagFactory = TagFactory.define(({ sequence, params, onCreate }) => {
  onCreate((tag) => {
    return prisma.tag.create({ data: tag });
  })

  return {
    id: sequence,
    name: params.name!,
    section: params.section || TagSection.UNIVERSAL,
  }
})

export default tagFactory