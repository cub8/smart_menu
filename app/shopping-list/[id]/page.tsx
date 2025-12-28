import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

type Props = {
  params : Promise<{ id: string }>
}

export default async function ShoppingListDetailPage({ params }: Props) {
  const session = await getSession()
  if (!session?.user?.id) return <p> Musisz być zalogowany</p>

  const corParams = await params
  const id = parseInt(corParams.id, 10)
  console.log("ID listy zakupów:", id)

  const list = await prisma.shoppingList.findUnique({
    where: { id },
  })

  if (!list || list.userId !== session.user.id) {
    return <p>Lista zakupów nie znaleziona</p>
  }

  const shoppingListItems = (list.items as { name: string; amount: number }[])

  return (
    <div className="flex items-center min-h-screen py-12 px-40">
        <div>
            <h1 className="text-m text-violet-400 font-semibold mb-6">
                Lista zakupów: od {list.startDate.toISOString().slice(0,10)} do {list.endDate.toISOString().slice(0,10)}
            </h1>

            <ul className="space-y-2">
                {shoppingListItems.map((item: any) => (
                <li key={item.name}>
                    {item.name}: {item.amount}g
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
