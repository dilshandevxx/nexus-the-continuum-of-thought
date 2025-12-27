import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          buzzabout
        </Link>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <button className="rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-300">
          Log in
        </button>
        <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105">
          Try for free
        </button>
        <button className="text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <button className="text-white md:hidden">
        <Menu className="h-6 w-6" />
      </button>
    </nav>
  );
}
