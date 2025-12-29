import prisma from "@/lib/prisma";
import { logout } from "@/app/actions/auth";
import { LogOut } from "lucide-react";
// If not available, I will just format date manually to keep it simple without installing more deps.

export default async function AdminDashboard() {
  const [projectCount, serviceCount, messageCount, unreadCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-zinc-400">Welcome back, Admin.</p>
            </div>
            <form action={logout}>
                <button className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300">
                    <LogOut size={16} /> Logout
                </button>
            </form>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
             <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                 <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">Total Projects</h3>
                 <p className="text-4xl font-black">{projectCount}</p>
             </div>
             <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                 <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">Active Services</h3>
                 <p className="text-4xl font-black">{serviceCount}</p>
             </div>
             <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                 <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">Unread Messages</h3>
                 <p className="text-4xl font-black text-indigo-400">{unreadCount}</p>
             </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8">
            <h2 className="mb-6 text-xl font-bold">Recent Activity</h2>
            <div className="space-y-4">
                {recentMessages.length === 0 ? (
                    <p className="text-zinc-500">No recent messages found.</p>
                ) : (
                    recentMessages.map((msg) => (
                        <div key={msg.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className={`h-2 w-2 rounded-full ${msg.read ? 'bg-zinc-600' : 'bg-emerald-500 animate-pulse'}`} />
                                <p className="text-sm">Inquiry from <strong className="text-white">{msg.name}</strong>: <span className="text-zinc-400 truncate max-w-xs inline-block align-bottom">{msg.message.substring(0, 50)}...</span></p>
                            </div>
                            <span className="text-xs text-zinc-500">
                                {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
}
