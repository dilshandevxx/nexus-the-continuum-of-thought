"use client";

import { useEffect, useState, useRef, useMemo } from "react";
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

// Consolidated images
const BACKGROUND_IMAGES = [
  "/hero_user_1.jpg", "/hero_user_2.png", "/hero_user_3.jpg",
  "/hero_user_4.png", "/hero_user_5.png", "/hero_user_1.jpg",
  "/hero_user_2.png", "/hero_user_3.jpg", "/hero_user_4.png",
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Generate stable random values for background images once on mount
  const backgroundElements = useMemo(() => {
    return BACKGROUND_IMAGES.map((src, i) => {
      // Random Start Position (Inside Viewport)
      const startLeft = Math.random() * 100; // 0-100%
      const startTop = Math.random() * 100; // 0-100%
      
      // Determine Exit Wall (0: Top, 1: Right, 2: Bottom, 3: Left)
      const exitWall = Math.floor(Math.random() * 4);
      let endLeft = startLeft;
      let endTop = startTop;

      // Calculate Off-Screen Destination
      // We add a large random delta to ensure it crosses the screen or drifts naturally
      switch(exitWall) {
        case 0: // Top
          endTop = -20; // Exit top
          endLeft += (Math.random() * 40 - 20); // Drift X slightly
          break;
        case 1: // Right
          endLeft = 120; // Exit right
          endTop += (Math.random() * 40 - 20); // Drift Y slightly
          break;
        case 2: // Bottom
          endTop = 120; // Exit bottom
          endLeft += (Math.random() * 40 - 20); // Drift X
          break;
        case 3: // Left
          endLeft = -20; // Exit left
          endTop += (Math.random() * 40 - 20); // Drift Y
          break;
      }

      return {
        src,
        id: i,
        startLeft,
        startTop,
        endLeft,
        endTop,
        duration: 20 + Math.random() * 20, // 20-40s duration
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * -30, // Negative delay for instant start scattered
      };
    });
  }, []);

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

      {/* Random Floating Background Images */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        {isMounted && backgroundElements.map((el) => (
            <motion.div
                key={el.id}
                className="absolute aspect-[4/3] w-64 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
                initial={{ 
                    top: `${el.startTop}%`,
                    left: `${el.startLeft}%`,
                    scale: el.scale,
                    opacity: 0,
                }}
                animate={{ 
                    top: `${el.endTop}%`,
                    left: `${el.endLeft}%`,
                    opacity: [0, 0.6, 0.6, 0], // Fade in start, Fade out end
                }}
                transition={{
                    duration: el.duration,
                    ease: "linear",
                    repeat: Infinity,
                    delay: el.delay,
                }}
            >
                <Image
                  src={el.src}
                  alt="Background element"
                  fill
                  className="object-cover opacity-80"
                />
            </motion.div>
        ))}
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
                      {WORDS[index].split(" ").map((word, i) => {
                        // Generate random styles for this specific word instance
                        const weights = ["font-light", "font-normal", "font-medium", "font-bold", "font-black"];
                        const weight = weights[Math.floor(Math.random() * weights.length)];
                        const isItalic = Math.random() > 0.8 ? "italic" : "non-italic";
                        const tracking = Math.random() > 0.5 ? "tracking-tighter" : "tracking-widest";
                        
                        return (
                          <motion.span
                            key={`${word}-${i}`}
                            className={`inline-block bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent ${weight} ${isItalic} ${tracking}`}
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
                                        delay: i * 0.1
                                    }
                                },
                                exit: { 
                                    opacity: 0, 
                                    // Completely random exit direction for EVERY word
                                    y: (Math.random() > 0.5 ? -1 : 1) * (150 + Math.random() * 100), 
                                    x: (Math.random() > 0.5 ? -1 : 1) * (150 + Math.random() * 100), 
                                    rotate: Math.random() * 90 - 45,
                                    scale: 0.5,
                                    filter: "blur(8px)",
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                        delay: i * 0.05
                                    }
                                }
                            }}
                          >
                            {word}
                          </motion.span>
                        );
                      })}
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
