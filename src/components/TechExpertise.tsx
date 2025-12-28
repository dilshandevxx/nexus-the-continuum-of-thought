"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "GraphQL", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "Figma"
];

const ROWS = [
    [...TECH_STACK],
    [...TECH_STACK].reverse()
];

export function TechExpertise() {
  return (
        <section className="relative w-full overflow-hidden bg-transparent py-24 text-white">
      <div className="mx-auto max-w-7xl py-16">
        <div className="mb-16 px-8 text-center md:px-12">
             <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
              Our Arsenal
            </h2>
            <h3 className="text-3xl font-bold md:text-5xl">
              Tech Expertise
            </h3>
        </div>

      <div className="flex flex-col gap-8">
        {ROWS.map((row, i) => (
            <div key={i} className="flex overflow-hidden">
                <motion.div
                className="flex gap-8 px-4"
                animate={{
                    x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                >
                {[...row, ...row, ...row].map((tech, index) => (
                    <div
                    key={index}
                    className="flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-xl font-semibold backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                    {tech}
                    </div>
                ))}
                </motion.div>
            </div>
        ))}
      </div>
      </div>
          
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

    </section>
  );
}
