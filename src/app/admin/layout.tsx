"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Code2, Briefcase, MessageSquare, LogOut, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const MENU = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { label: "Projects", icon: Briefcase, href: "/admin/projects" },
  { label: "Services", icon: Code2, href: "/admin/services" },
  { label: "Messages", icon: MessageSquare, href: "/admin/messages" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Basic protection check
    if (!document.cookie.includes("admin_session=true") && !pathname.includes("/login")) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname.includes("/login")) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 w-64 border-r border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl">
        <div className="mb-12 flex items-center gap-2">
           <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black hover:bg-zinc-200">
             <ArrowLeft size={16} />
           </Link>
           <span className="font-bold tracking-tight">NEXUS Admin</span>
        </div>

        <nav className="flex flex-col gap-2">
            {MENU.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link 
                        key={item.href} 
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                            isActive ? "bg-white text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
             <button 
                onClick={() => {
                    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    router.push("/admin/login");
                }}
                className="flex w-full items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
             >
                 <LogOut size={18} />
                 Sign Out
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-6xl">
            {children}
        </div>
      </main>
    </div>
  );
}
