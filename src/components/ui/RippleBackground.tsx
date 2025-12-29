"use client";

import { useEffect, useRef } from "react";
import $ from "jquery";

interface RippleBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function RippleBackground({ children, className }: RippleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Dynamically import jquery.ripples to avoid SSR issues
    import("jquery.ripples").then(() => {
        try {
            const $el = $(containerRef.current as any);
            ($el as any).ripples({
                resolution: 512,
                dropRadius: 20,
                perturbance: 0.04,
                imageUrl: null, // Uses the background-image by default, or just ripples the surface
            });
        } catch (e) {
            console.error("Failed to initialize ripples", e);
        }
    });

    return () => {
        // Cleanup if possible
        if (containerRef.current) {
            const $el = $(containerRef.current as any);
            if (($el as any).ripples) {
                ($el as any).ripples("destroy");
            }
        }
    };
  }, []);

  return (
    <div 
        ref={containerRef} 
        className={className}
        style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')", // Deep tech background so ripples are visible
             backgroundSize: "cover",
             backgroundPosition: "center",
        }}
    >
      <div className="bg-black/80 w-full h-full">
         {children}
      </div>
    </div>
  );
}
