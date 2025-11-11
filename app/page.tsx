import { Roboto_Mono } from 'next/font/google';
import Link from 'next/link'

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className={`${roboto_mono.className} bg-purple-100 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.15)] p-10 max-w-md text-center`}
      >
        <h1 className="text-gray-400 text-xl font-extrabold">
          Smart Menu - tygodniowy planer posiłków
          <br/>
          <Link href='/planner' className='text-amber-800 hover:bg-yellow-200 underline'> Kliknij, aby zobaczyć planer. </Link>
          <br/>
          <Link href='/meals' className='text-blue-800 hover:bg-blue-200 underline'> Zobacz listę posiłków. </Link>
        </h1>
      </div>
    </div>
  );
}
