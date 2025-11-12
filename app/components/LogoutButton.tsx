"use client";

import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
      title={`Zalogowany jako ${session.user?.email ?? "użytkownik"}`}
    >
      Wyloguj
    </button>
  );
}
