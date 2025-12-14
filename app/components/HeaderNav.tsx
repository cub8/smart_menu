"use client";

import { useSession } from "next-auth/react";
import NavButton from "./NavButton";

export default function HeaderNav() {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) return null;

  return (
    <nav className="flex flex-wrap items-center gap-2">
      <NavButton href="/">Planer</NavButton>
      <NavButton href="/meals">Lista posiłków</NavButton>
      <NavButton href="/meals/new">Dodaj posiłek</NavButton>
      <NavButton href="/shopping-list">Lista zakupów</NavButton>
    </nav>
  );
}
