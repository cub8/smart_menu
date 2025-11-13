"use client";

import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex items-center rounded-xl bg-[#D8CCFF] px-4 py-2 text-sm font-semibold
                 text-black hover:bg-[#C9BBFF] active:bg-[#BFAFFF]
                 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
      title={`Zalogowany jako ${session.user?.email ?? "użytkownik"}`}
    >
      Wyloguj
    </button>
  );
}
