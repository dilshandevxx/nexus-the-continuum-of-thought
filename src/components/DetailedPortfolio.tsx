"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ALL_PROJECTS } from "@/lib/portfolio-data";

// --- DATA ---
const CATEGORIES = [
  "All",
  "Web Development",
  "Landing Page",
  "AI Automation",
  "Agentic AI",
  "System Design",
];

const METRICS = [
    { label: "Client Valuation Generated", value: "$500M+" },
    { label: "Successful Launches", value: "100+" },
    { label: "User Interaction", value: "10M+" },
];

const TESTIMONIALS = [
    {
        quote: "Nexus didn't just build an app; they engineered a scalable business foundation.",
        author: "Sarah Jenkins",
        role: "CTO, FinEdge",
        avatar: "S"
    },
    {
        quote: "The visual attention to detail is unmatched. Feels like science fiction.",
        author: "Marcus Thorne",
        role: "Founder, LuxeRetail",
        avatar: "M"
    },
    {
        quote: "Reliability was our #1 concern. Nexus delivered zero downtime.",
        author: "Dr. Aris Vane",
        role: "Director, VitalHealth",
        avatar: "A"
    }
];

export function DetailedPortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-32 pb-32">
        
      {/* 1. Header & Metrics */}
      <section className="relative w-full px-4 pt-12 text-white md:px-12 lg:px-20">
         <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-20 text-center">
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

      {/* 2. Filterable Gallery */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
            
            {/* Filter Tabs */}
            <div className="mb-16 flex flex-wrap justify-center gap-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                            activeCategory === cat ? "text-black" : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-full bg-white"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{cat}</span>
                    </button>
                ))}
            </div>

            {/* Project Grid */}
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-white/30 hover:bg-white/10"
                        >
                            {/* Gradient Header */}
                            <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} p-8`}>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/20 text-white backdrop-blur-md">
                                    <project.icon className="h-6 w-6" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-8">
                                <span className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    {project.category}
                                </span>
                                <h4 className="mb-3 text-2xl font-bold">{project.title}</h4>
                                <p className="mb-8 flex-1 text-sm text-zinc-400">
                                    {project.shortDescription}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white opacity-60 transition-opacity group-hover:opacity-100">
                                    <Link href={`/portfolio/${project.id}`} className="flex items-center gap-2">
                                        View Details <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

        </div>
      </section>

      {/* 3. Testimonials (Simplified) */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
         <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h2 className="mb-12 text-center text-sm font-bold uppercase tracking-widest text-zinc-500">What Clients Say</h2>
            <div className="grid gap-8 md:grid-cols-3">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8"
                    >
                        <Quote className="mb-6 h-6 w-6 text-zinc-600" />
                        <p className="mb-6 text-zinc-300">"{t.quote}"</p>
                        <div className="flex items-center gap-3">
                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-bold text-white">
                                {t.avatar}
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
             <h2 className="text-3xl font-bold md:text-5xl">Start Your Project</h2>
             <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105">
                 Get in Touch
                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Link>
         </div>
      </section>

    </div>
  );
}
