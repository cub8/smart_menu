import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export default async function ShoppingListPage() {
  const session = await getSession();
  if (!session?.user?.id) return <p>Musisz być zalogowany</p>;

  const lists = await prisma.shoppingList.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });


  return (
    <div className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl font-semibold text-violet-600 mb-4">
        Listy zakupowe
      </h1>

      {lists.length === 0 ? (
        <p>Brak list zakupów. Wygeneruj nową listę zakupów.</p>
      ) : (

        // bardzo proste przekierowanie do list
        <ul className="space-y-2 text-xl text-violet-800">
          {lists.map(list => (
            <li key={list.id} className="hover:text-violet-950 hover:underline">
              <a href={`/shopping-list/${list.id}`}>
                ▫︎ {list.startDate.toISOString().slice(0, 10)} → {list.endDate.toISOString().slice(0, 10)}
              </a>
            </li>
          ))}
        </ul>

      )}    
    </div>
  );
}
