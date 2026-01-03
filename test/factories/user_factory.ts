import prisma from "@/lib/prisma"
import { Factory } from "fishery"
import { User } from "@/app/generated/prisma/client"

type UserParams = {
  name?: string
  email?: string
  password?: string
}

class UserFactory extends Factory<User, UserParams> {}

const userFactory = UserFactory.define(({ sequence, params, onCreate }) => {
  onCreate((user) => {
    return prisma.user.create({ data: user });
  })

  return {
    id: `user_${sequence}`,
    name: params.name || `User ${sequence}`,
    email: params.email || `user_${sequence}@example.com`,
    password: params.password || "hashes-password",
    createdAt: new Date()
  }
})

export default userFactory
