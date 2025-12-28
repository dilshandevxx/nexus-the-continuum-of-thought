"use client";

import { motion } from "framer-motion";
import { Services } from "@/components/Services";
import { CheckCircle2, ArrowRight, Layers, Zap, Shield, Trophy } from "lucide-react";
import Link from "next/link";

export function DetailedServices() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* 1. Services Grid (Reused) */}
      <Services />

      {/* 2. Our Process */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">How We Work</h2>
                <h3 className="text-3xl font-bold md:text-5xl">Our Process</h3>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
                {[
                    { step: "01", title: "Discovery", desc: "We analyze your requirements and understand your business goals." },
                    { step: "02", title: "Strategy", desc: "We architect a scalable solution tailored to your specific needs." },
                    { step: "03", title: "Development", desc: "Our experts build your product using cutting-edge technologies." },
                    { step: "04", title: "Launch", desc: "We deploy, monitor, and optimize for peak performance." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                    >
                        <div className="text-5xl font-black text-white/10">{item.step}</div>
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-sm text-zinc-400">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
             <div className="mb-16 grid gap-8 md:grid-cols-2 lg:items-center">
                <div>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Why Choose Us</h2>
                    <h3 className="text-3xl font-bold leading-tight md:text-5xl">
                        Built for <br/> <span className="text-zinc-500">Excellence</span>
                    </h3>
                </div>
                <p className="text-lg text-zinc-400">
                    We don't just write code; we build digital assets that drive growth. Our commitment to quality and innovation sets us apart.
                </p>
             </div>

             <div className="grid gap-6 md:grid-cols-3">
                {[
                    { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to grow with your business without performance bottlenecks." },
                    { icon: Shield, title: "Enterprise Security", desc: "Best-in-class security practices to protect your data and users." },
                    { icon: Trophy, title: "Award Winning", desc: "Recognized for our design and development standards across the industry." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="group flex flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-900/50 p-8 transition-colors hover:border-white/30 hover:bg-zinc-800/80"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-black">
                            <item.icon size={24} />
                        </div>
                        <div>
                             <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
                             <p className="text-sm text-zinc-400">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Our Arsenals</h2>
                <h3 className="text-3xl font-bold md:text-5xl">Technologies We Use</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
                {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "TensorFlow", "PostgreSQL", "GraphQL"].map((tech, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                    >
                        {tech}
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl px-8 md:px-12">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Common Questions</h2>
                <h3 className="text-3xl font-bold md:text-5xl">Frequently Asked</h3>
            </div>

            <div className="flex flex-col gap-6">
                {[
                    { q: "How long does a typical project take?", a: "Timeline varies by complexity. A simple website might take 2-4 weeks, while a complex SaaS platform could take 3-6 months. We provide detailed scheduls during the Discovery phase." },
                    { q: "Do you provide post-launch support?", a: "Absolutely. We offer various maintenance packages to ensure your software remains secure, up-to-date, and performant after deployment." },
                    { q: "What is your pricing model?", a: "We work on both fixed-price contracts for well-defined scopes and time-and-materials for evolving projects. We're transparent about costs from day one." },
                    { q: "Can you work with our existing team?", a: "Yes, we often co-develop with internal teams, filling skill gaps or accelerating development velocity as an extended arm of your workforce." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
                    >
                        <h4 className="mb-4 text-xl font-bold text-white">{item.q}</h4>
                        <p className="text-zinc-400">{item.a}</p>
                    </motion.div>
                ))}
            </div>
          </div>
      </section>

      {/* 6. CTA */}
      <section className="relative w-full px-4 text-white md:px-12 lg:px-20">
         <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md md:p-24">
             <h2 className="text-3xl font-bold md:text-5xl">Ready to Transform Your Business?</h2>
             <p className="max-w-xl text-lg text-zinc-400">
                 Let's discuss how we can bring your vision to life with our comprehensive IT solutions.
             </p>
             <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105">
                 Start a Project
                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Link>
         </div>
      </section>
    </div>
  );
}
