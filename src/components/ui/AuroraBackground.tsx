"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-black", className)}>
      {/* Aurora Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
          <motion.div 
            animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%] origin-center blur-[120px]"
            style={{
                background: "conic-gradient(from 0deg, #000000 0deg, #0e7490 60deg, #000000 120deg, #1e3a8a 180deg, #000000 240deg, #0e7490 300deg, #000000 360deg)"
            }}
          />
          {/* Secondary drifting blobs for more "flow" */}
          <motion.div 
             animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-teal-600/20 blur-[100px]" 
          />
          <motion.div 
             animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
             transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[100px]" 
          />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
