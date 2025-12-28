"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Cloud, Cpu, Shield, Zap, TrendingUp, Code2 } from "lucide-react";
import { TechExpertise } from "@/components/TechExpertise"; // Reusing the marquee

const DOMAINS = [
  {
    title: "Frontend Engineering",
    icon: Monitor,
    description: "Building immersive, responsive, and performant user interfaces.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Redux"]
  },
  {
    title: "Backend Systems",
    icon: Server,
    description: "Robust APIs and microservices that power your business logic.",
    stack: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    description: "Scalable infrastructure with automated CI/CD pipelines.",
    stack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Vercel", "GitHub Actions"]
  },
  {
    title: "AI & Data",
    icon: Cpu,
    description: "Intelligent solutions driven by machine learning and data analytics.",
    stack: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Pandas", "Pinecone"]
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

export function DetailedTechExpertise() {
  return (
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
            <TechExpertise />
         </div>
      </section>

      {/* 2. Domains Grid */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
             <div className="grid gap-6 md:grid-cols-2">
                {DOMAINS.map((domain, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                                <domain.icon size={24} />
                            </div>
                            <h4 className="text-2xl font-bold">{domain.title}</h4>
                        </div>
                        <p className="text-zinc-400">{domain.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {domain.stack.map((tech, j) => (
                                <span key={j} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-zinc-300">
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
                    <div key={i} className="flex flex-col gap-4 rounded-xl p-6">
                        <item.icon className="mb-4 h-10 w-10 text-white" />
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-zinc-400">{item.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

    </div>
  );
}
