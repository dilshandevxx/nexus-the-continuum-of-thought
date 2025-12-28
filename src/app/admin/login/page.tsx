"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary Hardcoded Auth for demonstration
    // In real app, verify against DB Admin table with proper hashing
    if (email === "admin@nexus.com" && password === "admin123") {
      document.cookie = "admin_session=true; path=/";
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-12 backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-zinc-500">Enter your secure credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <input 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                />
            </div>
            <div>
                 <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                />
            </div>
            
            {error && <p className="text-center text-sm text-red-400">{error}</p>}

            <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-black transition-transform hover:scale-[1.02]"
            >
                Login to Dashboard
                <ArrowRight size={18} />
            </button>
        </form>
      </motion.div>
    </div>
  );
}
