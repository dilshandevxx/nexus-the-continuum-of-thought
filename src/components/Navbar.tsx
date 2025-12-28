import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/50 py-4 backdrop-blur-2xl transition-all">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-12 lg:px-20">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 text-xl font-bold tracking-tighter text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform group-hover:rotate-90">
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            </div>
            NEXUS
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
             <div className="flex items-center gap-8">
                 <Link href="/portfolio" className="group relative text-xs font-medium uppercase tracking-widest text-zinc-400 transition-colors hover:text-white">
                     Our Portfolio
                     <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                 </Link>
                 <Link href="/services" className="group relative text-xs font-medium uppercase tracking-widest text-zinc-400 transition-colors hover:text-white">
                     Services
                     <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                 </Link>
                 <Link href="/tech-expertise" className="group relative text-xs font-medium uppercase tracking-widest text-zinc-400 transition-colors hover:text-white">
                     Tech Expertise
                     <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                 </Link>
                 <Link href="/about" className="group relative text-xs font-medium uppercase tracking-widest text-zinc-400 transition-colors hover:text-white">
                     About Us
                     <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                 </Link>
             </div>
             
             <Link href="/contact" className="group relative overflow-hidden rounded-lg bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white hover:ring-1 hover:ring-white/20">
                 <span className="relative z-10">Contact Us</span>
             </Link>
        </div>
      </div>
    </nav>
  );
}
