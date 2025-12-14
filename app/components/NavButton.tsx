"use client";

import Link from "next/link";

export default function NavButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-purple-300 px-3 py-1 text-sm text-purple-700 hover:bg-purple-100 transition"
    >
      {children}
    </Link>
  );
}
