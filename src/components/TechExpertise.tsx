"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "GraphQL", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "Figma", "Prisma", "Supabase", "OpenAI", "LangChain", "Stable Diffusion", "ArgoCD", "Turborepo"
];

// --- MAGNETIC TAG COMPONENT ---
function MagneticTag({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouse = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX, y: middleY });
    };
  
    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };
  
    const { x, y } = position;
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

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

      <div className="flex flex-wrap justify-center gap-6 px-4 md:px-20">
        {TECH_STACK.map((tech, i) => (
            <MagneticTag key={i}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                        opacity: { duration: 0.5, delay: i * 0.05 },
                        scale: { duration: 0.5, delay: i * 0.05 },
                        y: {
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }
                    }}
                    className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                    {tech}
                </motion.div>
            </MagneticTag>
        ))}
      </div>
      </div>
          
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

    </section>
  );
}
