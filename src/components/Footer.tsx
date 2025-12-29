"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram, ArrowUpRight, Send, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const SOCIAL_LINKS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const FOOTER_LINKS = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Blog", href: "/blog" },
        ]
    },
    {
        title: "Services",
        links: [
            { label: "Web Development", href: "/services" },
            { label: "App Design", href: "/services" },
            { label: "Cloud Solutions", href: "/services" },
            { label: "Consulting", href: "/services" },
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
        ]
    }
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black border-t border-white/10 text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 blur-[120px] rounded-full pointing-events-auto" />

      <div className="mx-auto flex max-w-7xl flex-col px-4 pt-20 md:px-12">
        
        {/* Top Section: CTA */}
        <div className="mb-20 flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-20 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
                >
                    Ready to build <br />
                    <span className="text-zinc-500">something extraordinary?</span>
                </motion.h2>
            </div>
            
            <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-col gap-4"
            >
                <Link 
                    href="/contact"
                    className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-zinc-200"
                >
                    <span>Start a Project</span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mail className="h-4 w-4" />
                    <span>hello@nexus.agency</span>
                </div>
            </motion.div>
        </div>

        {/* Middle Section: Links & Newsletter */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20 pt-10">
            
            {/* Brand Column */}
            <div className="flex flex-col gap-8 lg:col-span-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <Logo className="h-8 w-8 text-black" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">NEXUS</span>
                </div>
                <p className="max-w-sm text-base text-zinc-400 leading-relaxed font-light">
                    Forging digital products that merge aesthetic perfection with technical brilliance. We are the builders of the future.
                </p>
                <div className="flex gap-4">
                    {SOCIAL_LINKS.map((social, i) => (
                        <Link 
                            key={i} 
                            href={social.href} 
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-white hover:bg-white hover:text-black"
                            aria-label={social.label}
                        >
                            <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-5">
                {FOOTER_LINKS.map((column, i) => (
                    <div key={i} className="flex flex-col gap-6">
                        <h4 className="font-bold text-white tracking-wide">{column.title}</h4>
                        <div className="flex flex-col gap-4">
                            {column.links.map((link, j) => (
                                <Link 
                                    key={j} 
                                    href={link.href} 
                                    className="group text-sm text-zinc-400 transition-all hover:text-white"
                                >
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Newsletter Column */}
            <div className="flex flex-col gap-6 lg:col-span-3">
                <h4 className="font-bold text-white tracking-wide">Stay in the loop</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Subscribe to our newsletter for the latest tech trends and agency updates.
                </p>
                <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1 pl-4 transition-all focus-within:border-white/30 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-white/20">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-600"
                    />
                    <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-black transition-transform hover:scale-105 active:scale-95">
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-zinc-500 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Nexus Agency. All rights reserved.</p>
            <div className="flex items-center gap-6">
                 <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
        </div>

      </div>
    </footer>
  );
}
