"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Cloud, Cpu, Shield, Zap, TrendingUp, Sparkles, Workflow, Brain } from "lucide-react";
import { TechExpertise } from "@/components/TechExpertise"; // Reusing the marquee

const DOMAINS = [
  {
    title: "Generative AI & Automation",
    icon: Sparkles,
    description: "Leveraging cutting-edge LLMs and automation workflows to revolutionize business efficiency.",
    stack: ["OpenAI GPT-4", "LangChain", "Stable Diffusion", "Python", "AutoGPT", "Zapier", "Pinecone"]
  },
  {
    title: "Frontend Engineering",
    icon: Monitor,
    description: "Building immersive, high-fidelity user interfaces that captivate and convert.",
    stack: ["React", "Next.js 14", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Zustand"]
  },
  {
    title: "Backend Systems",
    icon: Server,
    description: "Architecting robust, scalable APIs and microservices for enterprise-grade performance.",
    stack: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "NestJS"]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    description: "Seamless deployment and orchestration with military-grade security and reliability.",
    stack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD"]
  }
];

const PHILOSOPHY = [
  {
    title: "Performance First",
    desc: "We optimize every byte. Fast load times and smooth interactions are non-negotiable for modern digital experiences.",
    icon: Zap
  },
  {
    title: "Scalable by Default",
    desc: "Architected to handle growth. From 100 to 100 million users, your system will remain stable and responsive.",
    icon: TrendingUp
  },
  {
    title: "Secure at Core",
    desc: "Security isn't an afterthought. We implement industry-leading standards to protect your data and reputation.",
    icon: Shield
  }
];

import { StarFieldBackground } from "@/components/ui/StarFieldBackground";

export function DetailedTechExpertise() {
  return (
    <StarFieldBackground className="w-full min-h-screen text-white">
    <div className="flex flex-col gap-32 pb-32">
      
      {/* 1. Hero / Intro */}
      <section className="relative w-full px-4 pt-12 text-white md:px-12 lg:px-20">
         <div className="mx-auto max-w-7xl px-8 text-center md:px-12">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Our Stack</h2>
            <h3 className="mb-8 text-4xl font-bold md:text-6xl">
                Engineering <br/> <span className="text-zinc-500">Excellence</span>
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                We select the best tools for the job, favoring technologies that offer the perfect balance of performance, developer experience, and long-term stability.
            </p>
         </div>
         {/* Reuse the marquee for visual impact */}
         <div className="mt-16">
            <TechExpertise disableRipple={true} />
         </div>
      </section>

      {/* 2. Domains Grid */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
             <div className="grid gap-8 md:grid-cols-2">
                {DOMAINS.map((domain, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-zinc-400 text-black shadow-lg">
                                <domain.icon size={28} />
                            </div>
                            <h4 className="text-2xl font-bold">{domain.title}</h4>
                        </div>
                        <p className="text-lg text-zinc-400 leading-relaxed">{domain.description}</p>
                        
                        <div className="pt-4 flex flex-wrap gap-2">
                            {domain.stack.map((tech, j) => (
                                <span key={j} className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
             </div>
        </div>
      </section>

      {/* 3. Engineering Philosophy */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
         <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-16 md:text-center">
                 <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Our Philosophy</h2>
                 <h3 className="text-3xl font-bold md:text-5xl">Why We Code</h3>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
                {PHILOSOPHY.map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/20"
                    >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        <div className="relative mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500 shadow-inner ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black">
                            <item.icon className="h-8 w-8" />
                        </div>
                        
                        <div className="relative">
                            <h4 className="mb-3 text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                            <p className="text-lg leading-relaxed text-zinc-400 group-hover:text-zinc-300">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

    </div>
    </StarFieldBackground>
  );
}
