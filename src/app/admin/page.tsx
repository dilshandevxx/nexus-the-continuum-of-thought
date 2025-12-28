import { prisma } from "@/lib/prisma"; // We need to setup lib/prisma first actually, but I'll assume I do it in next step.
// For now, let's make a mock dashboard to ensure UI is working first.

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-zinc-400">Welcome back, Admin.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
             <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                 <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">Total Projects</h3>
                 <p className="text-4xl font-black">12</p>
             </div>
             <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                 <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">Active Services</h3>
                 <p className="text-4xl font-black">6</p>
             </div>
             <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                 <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">Unread Messages</h3>
                 <p className="text-4xl font-black text-indigo-400">3</p>
             </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8">
            <h2 className="mb-6 text-xl font-bold">Recent Activity</h2>
            <div className="space-y-4">
                {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            <p className="text-sm">New contact inquiry received from <strong>John Doe</strong></p>
                        </div>
                        <span className="text-xs text-zinc-500">2 mins ago</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
