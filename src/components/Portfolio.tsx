"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    category: "FinTech",
    title: "Global Banking Platform",
    description: "A secure, high-performance dashboard for next-gen financial institutions.",
    gradient: "from-blue-500/20 to-purple-500/20",
    hoverGradient: "group-hover:from-blue-500/40 group-hover:to-purple-500/40",
    size: "large", // spans 2 cols on lg
  },
  {
    category: "E-Commerce",
    title: "Luxury Retail Suite",
    description: "Immersive shopping experience for high-end fashion brands.",
    gradient: "from-amber-500/20 to-orange-500/20",
    hoverGradient: "group-hover:from-amber-500/40 group-hover:to-orange-500/40",
    size: "small", // spans 1 col on lg
  },
  {
    category: "Healthcare",
    title: "MedTech Analytics",
    description: "AI-powered diagnostics dashboard for modern hospitals.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    hoverGradient: "group-hover:from-emerald-500/40 group-hover:to-teal-500/40",
    size: "small",
  },
  {
    category: "Real Estate",
    title: "Urban Living",
    description: "Smart city integration for modern residential complexes.",
    gradient: "from-rose-500/20 to-pink-500/20",
    hoverGradient: "group-hover:from-rose-500/40 group-hover:to-pink-500/40",
    size: "large",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function BentoCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const isLarge = project.size === "large";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10",
        isLarge ? "lg:col-span-2" : "lg:col-span-1"
      )}
    >
        {/* Background Gradient */}
        <div className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-700 opacity-30 group-hover:opacity-60",
            project.gradient,
            project.hoverGradient
        )} />

        {/* Diagonal Stripe Decoration */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rotate-45 bg-white/5 blur-3xl transition-transform duration-700 group-hover:bg-white/10" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
        
        {/* Header */}
        <div className="flex items-start justify-between">
            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md">
                {project.category}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="h-5 w-5" />
            </div>
        </div>

        {/* Main Info */}
        <div className="mt-12 space-y-4">
            <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                {project.title}
            </h3>
            <p className="max-w-md text-base text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                {project.description}
            </p>
        </div>

        {/* Visual Number */}
        <div className="absolute bottom-4 right-4 text-[8rem] font-bold leading-none tracking-tighter text-white/[0.02] transition-all duration-500 group-hover:text-white/[0.05]">
            0{index + 1}
        </div>
      </div>

      <Link href="/portfolio" className="absolute inset-0 z-10">
        <span className="sr-only">View {project.title}</span>
      </Link>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-24 md:py-32">
        {/* Background Elements */}
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute right-0 bottom-0 h-full w-full bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]" />

      <div className="container relative mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-zinc-400"
          >
            Our Masterpieces
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl"
          >
            Selected Works
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
                <BentoCard key={i} project={project} index={i} />
            ))}
        </div>

        {/* View All Button */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
        >
            <Link
                href="/portfolio"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-zinc-200"
            >
                <span className="relative z-10">View All Projects</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
        </motion.div>

      </div>
    </section>
  );
}
