import "~/styles/globals.css";
import Link from "next/link";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="top-nav flex justify-between items-center p-2  bg-slate-100">
        <div className="text-2xl font-bold">
          <Link href="/">Velocity</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/velocity/settings">
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Settings
            </button>
          </Link>
        </div>
      </nav>


      <div className="flex-grow">{children}</div>
      
    </div>
  );
}
