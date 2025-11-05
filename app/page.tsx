import { Roboto_Mono } from 'next/font/google';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className={`${roboto_mono.className} bg-white rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.15)] p-10 max-w-md text-center`}
      >
        <h1 className="text-black text-xl font-semibold">
          If you see this, everything&apos;s working fine.
        </h1>
      </div>
    </div>
  );
}
