import prisma from "@/lib/prisma";
import Link from "next/link";
import { MealType } from "@/app/generated/prisma/enums";

const mealTypeLabels: Record<MealType, string> = {
  BREAKFAST: "Śniadanie",
  LUNCH: "Obiad",
  DINNER: "Kolacja",
  DESSERT: "Deser",
};

export default async function MealsPage() {
  const meals = await prisma.meal.findMany({
    orderBy: { id: "asc" },
    include: { tags: true },
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-purple-600/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
            Lista posiłków
          </h1>
          <Link
            href="/"
            className="text-sm text-zinc-300 hover:text-white underline underline-offset-4"
          >
            Powrót do strony głównej
          </Link>
        </div>

        {meals.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-zinc-300">
            Brak posiłków w bazie. Uruchom seeding, aby załadować przykładowe dane.
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal) => (
              <li
                key={meal.id}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm transition-colors hover:bg-zinc-900"
              >
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {meal.name}
                  </h2>

                  {/* SUGEROWANY TYP POSIŁKU */}
                  {meal.suggestedMealType && meal.suggestedMealType.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">
                        Sugerowany typ posiłku:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {meal.suggestedMealType.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase tracking-wide bg-emerald-900/40 text-emerald-200 px-2 py-1 rounded-full border border-emerald-700/60"
                          >
                            {mealTypeLabels[t]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {meal.description ? (
                    <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                      {meal.description}
                    </p>
                  ) : null}

                  {meal.tags?.length ? (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {meal.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="text-[10px] uppercase tracking-wide bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full border border-purple-800/50"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {meal.ingredients?.length ? (
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        Składniki:
                      </p>
                      <ul className="mt-1 list-disc list-inside text-sm text-zinc-400 space-y-0.5">
                        {meal.ingredients.map((ing, idx) => (
                          <li key={idx}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
