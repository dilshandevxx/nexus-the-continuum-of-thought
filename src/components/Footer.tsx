"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black pb-8 pt-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-12">
        
        <div className="flex flex-col justify-between gap-12 md:flex-row">
            <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
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
                </div>
                <p className="max-w-xs text-sm text-zinc-400">
                    Engineering digital excellence for the world's most ambitious brands.
                </p>
            </div>

            <div className="flex gap-16">
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-white">Company</h4>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-white">About</Link>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-white">Careers</Link>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-white">Contact</Link>
                </div>
                 <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-white">Legal</h4>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-white">Privacy Policy</Link>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-white">Terms of Service</Link>
                </div>
                 <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-white">Social</h4>
                    <div className="flex gap-4">
                        <Link href="#" className="text-zinc-400 hover:text-white transition-transform hover:scale-110">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-zinc-400 hover:text-white transition-transform hover:scale-110">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-zinc-400 hover:text-white transition-transform hover:scale-110">
                            <Github className="h-5 w-5" />
                        </Link>
                         <Link href="#" className="text-zinc-400 hover:text-white transition-transform hover:scale-110">
                            <Instagram className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Nexus Agency. All rights reserved.</p>
            <p>Designed with <span className="text-white">❤</span> in San Francisco.</p>
        </div>

      </div>
    </footer>
  );
}
