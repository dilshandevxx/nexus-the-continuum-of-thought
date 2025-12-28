"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const WORDS = [
  "Engineering Impact",
  "AI Innovation",
  "AI Automation",
  "Web Design",
  "Web Development",
  "AI Solutions",
];

// User uploaded images
const CARDS_COLUMN_1 = [
  "/hero_user_1.jpg",
  "/hero_user_2.png",
  "/hero_user_3.jpg",
];
const CARDS_COLUMN_2 = [
  "/hero_user_4.png",
  "/hero_user_5.png",
  "/hero_user_1.jpg",
];
const CARDS_COLUMN_3 = [
  "/hero_user_2.png",
  "/hero_user_3.jpg",
  "/hero_user_4.png",
];

function FallingColumn({
  images,
  yOffset = 0,
  duration = 20,
}: {
  images: string[];
  yOffset?: number;
  duration?: number;
}) {
  return (
    <div className="relative flex h-full w-full flex-col gap-8 overflow-hidden">
      <motion.div
        className="flex flex-col gap-12" // Increased gap for better spacing with offsets
        animate={{
          y: ["-50%", "0%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...images, ...images, ...images].map((src, i) => {
            // Deterministic "random" values based on index to avoid hydration mismatch
            const rotation = (i * 17 % 20) - 10; // -10 to 10 degrees
            const xOffset = (i * 23 % 60) - 30; // -30% to 30% horizontal shift
            const scale = 0.9 + (i * 5 % 3) * 0.1; // 0.9, 1.0, 1.1 scale

            return (
              <div
                key={i}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
                style={{
                    transform: `rotate(${rotation}deg) translateX(${xOffset}%) scale(${scale})`,
                    zIndex: i % 10, // localized z-index
                }}
              >
                <Image
                  src={src}
                  alt="Social Media Card"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            );
        })}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0A0A0A] px-4 py-24 text-white md:px-12 lg:px-20">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

      {/* Falling Columns Background */}
      <div className="absolute inset-0 z-0 flex justify-between gap-8 px-4 opacity-20 md:px-20 lg:gap-12">
          {/* Left Column */}
          <div className="hidden h-[150%] w-1/4 -translate-y-[20%] lg:block">
            <FallingColumn images={CARDS_COLUMN_1} duration={35} />
          </div>
          {/* Right Column */}
          <div className="hidden h-[150%] w-1/4 -translate-y-[20%] lg:block">
            <FallingColumn images={CARDS_COLUMN_3} duration={25} />
          </div>
      </div>
      
       {/* Mobile Falling Column */}
       <div className="absolute inset-0 z-0 flex justify-center opacity-10 lg:hidden">
            <div className="h-[150%] w-3/4 -translate-y-[20%]">
                 <FallingColumn images={CARDS_COLUMN_2} duration={40} />
            </div>
       </div>


      {/* Main Content Container - Z-Index to sit above background */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        
        {/* Top Badges */}
        <div className="flex w-full items-start justify-between">
            <div className="rounded-r-xl rounded-bl-xl border-l-4 border-t border-b border-r border-white/10 border-l-white bg-white/5 px-6 py-3 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase leading-tight tracking-widest text-zinc-400">
                    Innovative <br /> IT-Solutions
                </p>
            </div>

            <div className="hidden rounded-l-xl rounded-br-xl border-r-4 border-t border-b border-l border-white/10 border-r-white bg-white/5 px-6 py-3 backdrop-blur-sm md:block">
                <p className="text-xs font-bold uppercase leading-tight tracking-widest text-right text-zinc-400">
                    Program <br /> Products
                </p>
            </div>
        </div>

        {/* Center Massive Text */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <h1 className="text-[12vw] font-bold leading-none tracking-tighter text-white mix-blend-overlay md:text-[15vw]">
                  NEXUS
              </h1>
              
              {/* Advanced Floating Text */}
              <div className="relative flex h-24 w-full items-center justify-center overflow-visible text-2xl font-medium tracking-widest md:text-4xl">
                {isMounted && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      className="absolute flex gap-4 whitespace-nowrap"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {WORDS[index].split(" ").map((word, i) => (
                        <motion.span
                          key={`${word}-${i}`}
                          className="inline-block bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
                          custom={i}
                          variants={{
                              hidden: { 
                                  opacity: 0, 
                                  y: Math.random() * 100 - 50, 
                                  x: Math.random() * 100 - 50,
                                  rotate: Math.random() * 30 - 15,
                                  scale: 0.5,
                                  filter: "blur(10px)"
                              },
                              visible: { 
                                  opacity: 1, 
                                  y: 0, 
                                  x: 0, 
                                  rotate: 0,
                                  scale: 1,
                                  filter: "blur(0px)",
                                  transition: {
                                      type: "spring",
                                      damping: 25,
                                      stiffness: 120,
                                      duration: 1.2,
                                      delay: i * 0.1 // Staggered entry
                                  }
                              },
                              exit: { 
                                  opacity: 0, 
                                  y: 100 + Math.random() * 100, // Fall towards bottom
                                  x: Math.random() * 400 - 200, // Wide spread to separate words
                                  rotate: Math.random() * 90 - 45, // Chaotic rotation
                                  scale: 0.5,
                                  filter: "blur(8px)",
                                  transition: {
                                      duration: 1.0,
                                      ease: "easeIn",
                                      delay: i * 0.05 // Slight stagger
                                  }
                              }
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

            </div>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-12 border-t border-white/10 pt-12 md:grid-cols-3 md:gap-4">
            
            {/* Left: Rating */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                     <span className="text-4xl font-bold text-white">4.9/5</span>
                </div>
                <p className="max-w-[200px] text-xs text-zinc-500">
                    The average rating of our quality and efficiency based on 1000+ completed projects
                </p>
            </div>

             {/* Center: Buttons */}
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:justify-center">
                 <button className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white hover:ring-1 hover:ring-white/20">
                    <span className="relative z-10">Require a Call</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                 </button>
                 <button className="whitespace-nowrap rounded-lg border border-white/20 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black">
                    See All Services
                 </button>
            </div>

            {/* Right: Description */}
            <div className="flex items-end justify-end">
                <p className="max-w-xs text-right text-sm text-zinc-500">
                    We build powerful software that simplifies your work and helps your business grow.
                </p>
            </div>

        </div>

      </div>
    </section>
  );
}
