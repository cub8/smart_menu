import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import NewMealForm from "./NewMealForm";

export default async function NewMealPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    return (
      <div className="mx-auto max-w-4xl p-10">
        <p className="text-zinc-300">
          Musisz być zalogowany, aby dodać posiłek.
        </p>
      </div>
    );
  }

  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl font-semibold text-violet-600 mb-6">
        Dodaj posiłek
      </h1>
      <p className="text-zinc-400 mb-8">
        Wypełnij formularz, aby dodać własny posiłek do bazy.
      </p>
      <NewMealForm tags={tags} />
    </div>
  );
}
