"use client";

import { motion } from "framer-motion";
import { Portfolio } from "@/components/Portfolio"; // Reusing the gallery
import { Quote, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const METRICS = [
    { label: "Client Valuation Generated", value: "$500M+" },
    { label: "Successful Launches", value: "100+" },
    { label: "User Interaction", value: "10M+" },
];

const TESTIMONIALS = [
    {
        quote: "Nexus didn't just build an app; they engineered a scalable business foundation. Their architectural decisions saved us millions in the long run.",
        author: "Sarah Jenkins",
        role: "CTO, FinEdge",
        avatar: "/avatars/sarah.jpg" // Placeholder
    },
    {
        quote: "The visual attention to detail is unmatched. We wanted 'premium' and they delivered something that feels like science fiction.",
        author: "Marcus Thorne",
        role: "Founder, LuxeRetail",
        avatar: "/avatars/marcus.jpg"
    },
    {
        quote: "Reliability was our #1 concern. Nexus delivered a system that hasn't had a single second of downtime in two years.",
        author: "Dr. Aris Vane",
        role: "Director, VitalHealth",
        avatar: "/avatars/aris.jpg"
    }
];

export function DetailedPortfolio() {
  return (
    <div className="flex flex-col gap-32 pb-32">
        
      {/* 1. Impact Metrics */}
      <section className="relative w-full px-4 pt-12 text-white md:px-12 lg:px-20">
         <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Our Impact</h2>
                <h3 className="text-4xl font-bold md:text-6xl">Results That Speak</h3>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
                {METRICS.map((metric, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm"
                    >
                        <div className="text-5xl font-black text-white">{metric.value}</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-zinc-500">{metric.label}</div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* 2. Project Gallery (Reused) */}
      <Portfolio />

      {/* 3. Testimonials */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
         <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-16 text-center">
                 <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Client Stories</h2>
                 <h3 className="text-3xl font-bold md:text-5xl">Trusted by Visionaries</h3>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-zinc-900/50 p-8 hover:bg-zinc-800/80"
                    >
                        <div>
                            <Quote className="mb-6 h-8 w-8 text-zinc-600" />
                            <p className="text-lg leading-relaxed text-zinc-300">"{t.quote}"</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 overflow-hidden rounded-full bg-zinc-700">
                                {/* Placeholder Avatar */}
                                <div className="flex h-full w-full items-center justify-center bg-white/10 text-xs text-zinc-500">
                                    {t.author[0]}
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-white">{t.author}</div>
                                <div className="text-xs text-zinc-500">{t.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>
      
      {/* 4. CTA */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
         <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md md:p-24">
             <h2 className="text-3xl font-bold md:text-5xl">Have a Project in Mind?</h2>
             <p className="max-w-xl text-lg text-zinc-400">
                 We accept a limited number of new clients per quarter to ensure focused excellence.
             </p>
             <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105">
                 Apply for Discovery
                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Link>
         </div>
      </section>

    </div>
  );
}
