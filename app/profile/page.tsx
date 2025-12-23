import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ProfilePreferences from "./ProfilePreferences";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.user?.id) {
    return (
      <div className="mt-10 flex justify-center">
        <p>Musisz być zalogowany, aby edytować preferencje.</p>
      </div>
    );
  }

  const [tags, preferences] = await Promise.all([
    prisma.tag.findMany({ where: { section: "UNIVERSAL" }, orderBy: { name: "asc" } }),
    prisma.userPreference.findMany({
      where: { userId: session.user.id },
      select: { tagId: true, dayOfWeek: true },
    }),
  ]);

  const days: Array<"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"> = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const preferencesByDay: Record<string, number[]> = {};
  for (const day of days) {
    preferencesByDay[day] = [];
  }

  for (const pref of preferences) {
    const day = pref.dayOfWeek as keyof typeof preferencesByDay;
    if (!preferencesByDay[day]) {
      preferencesByDay[day] = [];
    }
    preferencesByDay[day].push(pref.tagId);
  }

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-purple-800">
          Witaj, {session.user.name}!
        </h1>
        <h1 className="text-2xl font-bold mb-4 text-purple-800">
          Szablony preferencji na dni tygodnia
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Dla każdego dnia tygodnia możesz ustawić osobny szablon preferencji.
        </p>

        <ProfilePreferences tags={tags} initialByDay={preferencesByDay} />
      </div>
    </div>
  );
}
