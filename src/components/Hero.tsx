"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter, MessageCircle, Play } from "lucide-react"; // Using similar icons
import { FloatingCard } from "./ui/FloatingCard";

const WORDS = ["emotion", "needs", "trends", "impact"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000); // Wait before deleting
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Blinking cursor
  useEffect(() => {
    const timeout = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-20 text-center text-white">
      {/* Background Gradients/Glows (Optional, to add depth) */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]" />

      {/* Floating Badges (Top Center) */}
      <FloatingCard className="absolute top-24 md:left-[30%] lg:left-[35%]" delay={0} yOffset={5}>
        <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-[#111] px-4 py-2 text-xs font-medium text-gray-300 shadow-md">
           <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 font-bold text-white">P</span>
           Product Hunt #1 Product of the Day
        </div>
      </FloatingCard>
      
      <FloatingCard className="absolute top-24 md:right-[30%] lg:right-[35%]" delay={1.5} yOffset={-5}>
         <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-[#111] px-4 py-2 text-xs font-medium text-gray-300 shadow-md">
           Google for Startups
        </div>
      </FloatingCard>


      {/* Main Content */}
      <div className="z-10 mt-20 max-w-4xl">
        <h1 className="flex flex-wrap items-center justify-center gap-2 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <span className="bg-blue-700 px-2 text-white">Research</span>
          <span>Social Media</span>
          <span>Conversations for</span>
          <span className="min-w-[4ch] text-left">
            {WORDS[index].substring(0, subIndex)}
            <span
              className={`ml-1 inline-block h-[0.8em] w-[2px] bg-white align-baseline ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 md:text-xl">
          Get AI-driven insights from billions of discussions on social media.
        </p>

        <div className="mt-10">
          <button className="rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 active:scale-95">
            Try for free
          </button>
        </div>
      </div>

      {/* Floating Elements / Icons */}
      
      {/* Reddit (Left) */}
      <FloatingCard className="absolute left-[5%] top-1/2 hidden -translate-y-1/2 md:block" yOffset={15} duration={4}>
         <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A1A1B] text-white shadow-xl shadow-black/50 border border-gray-800">
            {/* Reddit Icon Placeholder */}
            <MessageCircle className="h-8 w-8 text-orange-500 fill-current" />
         </div>
      </FloatingCard>

      {/* Social Video Card (Center Left) */}
      <FloatingCard className="absolute left-[15%] bottom-20 hidden lg:block" yOffset={-20} delay={0.5} duration={5}>
          <div className="relative h-48 w-36 overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <span className="text-xs">Video Preview</span>
              </div>
              <div className="absolute top-2 left-2 z-20 rounded bg-black/50 p-1">
                 <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-white/20 p-2 backdrop-blur-md">
                 <Play className="h-4 w-4 fill-white text-white" />
              </div>
          </div>
      </FloatingCard>

      {/* Social Video Card (Center Right - Instagram) */}
      <FloatingCard className="absolute right-[20%] top-32 hidden lg:block" yOffset={25} delay={1} duration={4.5}>
         <div className="relative h-40 w-40 overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-400 opacity-20" />
             <div className="absolute top-2 right-2 z-20 rounded bg-transparent">
                 <Instagram className="h-6 w-6 text-white" />
             </div>
         </div>
      </FloatingCard>

       {/* YouTube (Right) */}
       <FloatingCard className="absolute right-[5%] top-1/2 hidden -translate-y-1/2 md:block" yOffset={-15} duration={4}>
         <div className="relative h-40 w-40 overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 opacity-20" />
             <div className="absolute top-2 left-2 z-20">
                 <Youtube className="h-6 w-6 text-red-600 fill-current" />
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="rounded-full bg-black/40 p-3 backdrop-blur-sm">
                   <Play className="h-6 w-6 fill-white text-white" />
                 </div>
             </div>
         </div>
      </FloatingCard>

      {/* X/Twitter (Floating somewhere) */}
      <FloatingCard className="absolute left-[25%] top-32 hidden md:block" yOffset={10} delay={2}>
         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111] text-white border border-gray-800">
            <span className="text-xl font-bold">X</span>
         </div>
      </FloatingCard>

    </section>
  );
}
