import { Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import { getSession } from '@/lib/auth';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function Home() {
  const session = await getSession();


  return (
    <div className="mt-10 flex justify-center items-center min-h-screen">
      <div
        className={`${roboto_mono.className} bg-purple-100 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.15)] p-15 max-w-md text-center`}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-purple-800">
          Witaj, {session?.user?.name ?? 'Guest'}!
        </h1>
        <h2 className="text-gray-400 text-xl font-extrabold">
          Smart Menu - tygodniowy planer posiłków
          <br />
          <Link href="/planner" className="text-amber-800 hover:bg-yellow-200 underline">
            Kliknij, aby zobaczyć planer.
          </Link>
          <br />
          <Link href="/meals" className="text-blue-800 hover:bg-blue-200 underline">
            Zobacz listę posiłków.
          </Link>
          <br />
          <Link href="/profile" className="text-green-800 hover:bg-green-200 underline">
            Ustaw preferencje żywieniowe.
          </Link>
        </h2>
      </div>
    </div>
  );
}
