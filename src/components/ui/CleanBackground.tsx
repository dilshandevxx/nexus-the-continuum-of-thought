"use client";

import { cn } from "@/lib/utils";

interface CleanBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function CleanBackground({ children, className }: CleanBackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-black", className)}>
      {/* Subtle Gradient Spotlight */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none"
        style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)"
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
