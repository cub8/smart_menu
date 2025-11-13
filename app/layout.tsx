import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import LogoutButton from "./components/LogoutButton";

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
              <span className="font-semibold tracking-tight text-violet-700">SmartMenu</span>
              <LogoutButton />
            </div>
          </header>


          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
