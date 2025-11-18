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
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
    prisma.userPreference.findMany({
      where: { userId: session.user.id },
      select: { tagId: true },
    }),
  ]);

  const selectedTagIds = preferences.map((p) => p.tagId);

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-800">
          Twoje preferencje żywieniowe
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Wybierz tagi, które najlepiej opisują Twoje preferencje. 
          Zostaną one użyte później do generowania posiłków.
        </p>

        <ProfilePreferences tags={tags} initialSelected={selectedTagIds} />
      </div>
    </div>
  );
}