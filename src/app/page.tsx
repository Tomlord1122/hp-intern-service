import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4f4959] to-[#191923] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Use <span className="text-[hsl(215,100%,70%)]">HP</span> Service
        </h1>
        <div className="grid grid-cols-1 gap-4  md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/velocity"
            
          >
            <h3 className="text-2xl font-bold">Click here →</h3>
            <div className="text-lg">
              Try out the service and see how it works.
            </div>
          </Link>
     
        </div>
      </div>
    </main>
  );
}
