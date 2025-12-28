"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PROJECTS = [
  {
    category: "FinTech",
    title: "Global Banking Platform",
    description: "A secure, high-performance dashboard for next-gen financial institutions.",
    gradient: "from-zinc-100 to-zinc-500",
  },
  {
    category: "E-Commerce",
    title: "Luxury Retail Suite",
    description: "Immersive shopping experience for high-end fashion brands.",
    gradient: "from-white to-neutral-400",
  },
  {
    category: "Healthcare",
    title: "MedTech Analytics",
    description: "AI-powered diagnostics dashboard for modern hospitals.",
    gradient: "from-zinc-200 to-zinc-600",
  },
];

export function Portfolio() {
  return (
    <section className="relative w-full bg-[#050505] px-4 py-24 text-white md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-8 md:px-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
             <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
              Selected Works
            </h2>
            <h3 className="text-3xl font-bold md:text-5xl">
              Featured Projects
            </h3>
          </div>
          <Link 
            href="#" 
            className="group flex items-center gap-2 border-b border-white/20 pb-1 text-sm font-medium transition-colors hover:border-white hover:text-white"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative grid gap-8 overflow-hidden rounded-3xl bg-white/5 border border-white/10 md:grid-cols-2"
            >
                {/* Image Placeholder with Gradient */}
              <div className={`relative h-64 w-full bg-gradient-to-br ${project.gradient} opacity-80 transition-all duration-500 group-hover:opacity-100 md:h-full`}>
                <div className="absolute inset-0 bg-black/20" />
                {/* We would use <Image /> here with real assets */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/50 text-6xl font-black mix-blend-overlay opacity-0 transition-opacity group-hover:opacity-20">
                        {i + 1}
                    </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                    {project.category}
                </span>
                <h4 className="mb-4 text-3xl font-bold md:text-4xl">{project.title}</h4>
                <p className="mb-8 text-lg text-gray-400">
                    {project.description}
                </p>
                <div className="flex items-center gap-4">
                     <button className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105">
                        View Case Study
                     </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
