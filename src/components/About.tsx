"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, ShieldCheck, Users } from "lucide-react";

const VALUES = [
  {
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible with technology.",
    icon: Lightbulb,
  },
  {
    title: "Excellence",
    description: "We deliver nothing short of enterprise-grade quality and performance.",
    icon: Target,
  },
  {
    title: "Integrity",
    description: "Transparency and trust are the foundation of our client partnerships.",
    icon: ShieldCheck,
  },
  {
    title: "Client-Centric",
    description: "Your success is our success. We build solutions that solve your real problems.",
    icon: Users,
  },
];

export function About() {
  return (
    <section className="relative w-full bg-[#0A0A0A] px-4 py-24 text-white md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-8 md:px-12">
        
        {/* Story Section */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold uppercase tracking-widest text-zinc-500"
          >
            Our Story
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
          >
            <p className="text-zinc-400">
              At <span className="font-bold text-white">NEXUS</span>, we started with a simple belief: <span className="text-white">technology should be an enabler, not a hurdle.</span>
            </p>
            <p className="mt-6 text-xl text-zinc-500 md:text-2xl">
              For over a decade, we've partnered with global enterprises to engineer software that scales, systems that secure, and strategies that transform businesses for the digital age.
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-xl"
          >
            <h3 className="mb-4 text-3xl font-bold">Our Mission</h3>
            <p className="text-lg text-zinc-400">
              To bridge the gap between complex business problems and elegant digital solutions, empowering organizations to thrive in a connected world.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-xl"
          >
            <h3 className="mb-4 text-3xl font-bold">Our Vision</h3>
            <p className="text-lg text-zinc-400">
              A future where technology serves humanity effortlessly—where every digital interaction is intuitive, secure, and impactful.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="flex flex-col gap-10">
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-center text-4xl font-bold md:text-left"
          >
            Our Core Values
          </motion.h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <val.icon className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="mb-3 text-2xl font-bold text-white">{val.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-zinc-500 group-hover:text-zinc-300">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
