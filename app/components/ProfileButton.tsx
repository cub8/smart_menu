"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProfileButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Link
      href="/profile"
      className="rounded-xl border border-purple-300 px-3 py-1 text-sm text-purple-700 hover:bg-purple-100"
    >
      Profil
    </Link>
  );
}