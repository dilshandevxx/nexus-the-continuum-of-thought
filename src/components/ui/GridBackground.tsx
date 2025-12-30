"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-black", className)}>
      {/* Grid Pattern Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
            backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)", // Gray-600 dots
            backgroundSize: "32px 32px"
        }}
      />
       {/* Fade Overlay to make it subtle */}
       <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
