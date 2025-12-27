"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingCardProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  // Amplitude for the floating animation
  yOffset?: number; 
  duration?: number;
}

export function FloatingCard({
  children,
  className,
  delay = 0,
  yOffset = 10,
  duration = 3,
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{
        y: [0, yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
