import "~/styles/globals.css";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 justify-center">
      {/* top nav */}
      <nav className="flex justify-between items-center p-2 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <Image src="/hp.png" alt="Logo" width={40} height={40} className="mr-2" />
          <Link href="/" className="text-2xl font-bold text-gray-800">Velocity</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/velocity/settings">
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Settings
            </button>
          </Link>
        </div>
      </nav>


      {/* main content */}
      <div className="flex-grow mt-16">{children}</div>
    </div>
  );
}