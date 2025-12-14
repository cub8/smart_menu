import prisma from "@/lib/prisma"

interface prismaObject {
    id: number;
}

export async function createTag(name: string) {
    return prisma.tag.create({ data: { name } })
}

export function toIdsArray(array: prismaObject[]) {
    return array.map((el) => ({ id: el.id }))
}
