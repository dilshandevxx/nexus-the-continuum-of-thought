"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Lightbulb, Target, ShieldCheck, Users, Rocket, Award, Globe, Zap, Cpu, Layers, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
    { label: "Years of Excellence", value: 12, suffix: "+" },
    { label: "Projects Delivered", value: 150, suffix: "+" },
    { label: "Global Partners", value: 40, suffix: "" },
    { label: "Industry Awards", value: 15, suffix: "+" },
];

const VALUES = [
  {
    title: "Innovation",
    description: "Pushing boundaries with bleeding-edge technology to solve complex problems.",
    icon: Lightbulb,
    class: "md:col-span-2",
  },
  {
    title: "Excellence",
    description: " delivering enterprise-grade quality and performance in every line of code.",
    icon: Target,
    class: "md:col-span-1",
  },
  {
    title: "Integrity",
    description: "Building trust through radical transparency and honest partnerships.",
    icon: ShieldCheck,
    class: "md:col-span-1",
  },
  {
    title: "Client-Centric",
    description: "Your business goals are our north star. We succeed only when you do.",
    icon: Users,
    class: "md:col-span-2",
  },
];

function CountingNumber({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(progressRatio * value));

      if (progress < duration * 1000) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{count}</span>;
}

export function About() {
  return (
    <section className="relative w-full overflow-hidden bg-black/40 py-32 text-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-32 px-6 md:px-12">
        
        {/* 1. Hero / Story - Visionary Blue Design */}
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:justify-between lg:items-center">
            {/* Text Side */}
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center gap-3"
              >
                  <div className="h-px w-12 bg-white" />
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Who We Are</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              >
                We are the architects of <br />
                <span className="text-white">
                    digital transformation.
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-lg text-zinc-400 leading-relaxed font-light md:text-xl"
              >
                At <span className="font-bold text-white">NEXUS</span>, we believe that technology should be a limitless enabler. For over a decade, we have partnered with visionaries to engineer software that not only solves today's problems but anticipates tomorrow's opportunities.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex gap-4"
              >
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-zinc-300">
                      <Globe size={14} /> Global Reach
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-zinc-300">
                      <Zap size={14} /> High Velocity
                  </div>
              </motion.div>
            </div>

             {/* Graphic Side - Precision Gyroscope */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative hidden h-96 w-96 lg:flex items-center justify-center"
             >
                <div className="absolute inset-0 -z-10 bg-white/5 blur-[80px] rounded-full" />
                
                {/* Gyroscope Container */}
                <div className="relative flex h-full w-full items-center justify-center perspective-[1000px]">
                    
                    {/* Outer Ring */}
                    <motion.div
                        animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute h-80 w-80 rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                        style={{ transformStyle: "preserve-3d" }}
                    />

                    {/* Middle Ring */}
                    <motion.div
                        animate={{ rotateX: 360, rotateY: -360, rotateZ: 180 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute h-64 w-64 rounded-full border border-dashed border-white/30"
                        style={{ transformStyle: "preserve-3d" }}
                    />
                    
                     {/* Inner Ring */}
                    <motion.div
                        animate={{ rotateX: -360, rotateY: 360, rotateZ: -90 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute h-48 w-48 rounded-full border-2 border-white/10"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                         <div className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_white]" />
                    </motion.div>

                    {/* Central Core */}
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                        <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                        <Target className="h-10 w-10 text-white" strokeWidth={1} />
                    </motion.div>

                </div>
             </motion.div>
        </div>

        {/* 2. Stats Section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-y border-white/5 py-12">
            {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-5xl font-black tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                        <CountingNumber value={stat.value} />{stat.suffix}
                    </span>
                    <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">{stat.label}</span>
                </div>
            ))}
        </div>

        {/* 3. Core Values Bento Grid */}
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center md:text-left">
                <h3 className="text-3xl font-bold md:text-4xl">Our Core DNA</h3>
                <p className="max-w-xl text-zinc-400">The principles that guide every commit, every design, and every decision we make.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {VALUES.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                            "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-white/20",
                            val.class
                        )}
                    >
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-white shadow-inner">
                            <val.icon className="h-6 w-6" />
                        </div>
                        <h4 className="mb-3 text-2xl font-bold text-white group-hover:text-white transition-colors">{val.title}</h4>
                        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{val.description}</p>
                        
                        {/* Decorative glow */}
                        <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors" />
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
