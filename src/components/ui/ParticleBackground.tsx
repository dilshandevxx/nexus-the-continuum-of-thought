"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false);

  // Generate stable random lines
  const lines = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% width
      height: Math.random() * 40 + 20, // 20-60vh length (Longer)
      opacity: Math.random() * 0.5 + 0.2, // 0.2 - 0.7 opacity (Much brighter)
      duration: Math.random() * 3 + 4, // 4-7s duration (Faster)
      delay: Math.random() * -10,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Background Gradient to fade tops/bottoms */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black z-10" />

      {/* Moving Data Lines */}
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          style={{
            left: `${line.left}%`,
            height: `${line.height}vh`,
            opacity: line.opacity,
          }}
          initial={{ y: "-100%" }}
          animate={{
            y: "110vh", // Fall through the entire height
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "linear",
            delay: line.delay,
          }}
        />
      ))}
      
      {/* Ambient Glows to keep it from feeling too cold */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-[100px]" />

    </div>
  );
}
