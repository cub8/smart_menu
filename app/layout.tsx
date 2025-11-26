import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import LogoutButton from "./components/LogoutButton";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartMenu",
  description: "Planner posiłków",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <header className="sticky top-0 z-50 w-full border-b border-violet-300 bg-[#EDE4FF]">
            <div className="w-full h-14 px-4 flex items-center justify-between">
              <Link href="/" className="font-semibold tracking-tight text-violet-700">
                SmartMenu
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="rounded-xl border border-purple-300 px-3 py-1 text-sm text-purple-700 hover:bg-purple-100"
                >
                  Profil
                </Link>
                <LogoutButton />
              </div>
            </div>
          </header>

          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
