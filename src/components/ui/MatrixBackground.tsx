"use client";

import { useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

export function MatrixBackground({ children, className, disableAnimation }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disableAnimation || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters (Binary + Hex + some tech symbols) - Cleaner set
    const chars = "01"; // Pure binary for "Hardcore Tech" feel, or "0123456789ABCDEF" for hex
    const charArray = chars.split("");
    
    // Configuration
    const fontSize = 12; // Smaller font for "fine data" look
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Very transparent black for longer, smoother trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Courier New", monospace`; // Crisp font
      
      for (let i = 0; i < drops.length; i++) {
        // Cyber Colors: Predominantly Cyan/Teal, occasional White highlight
        const random = Math.random();
        if (random > 0.98) {
             ctx.fillStyle = "#ffffff"; // Bright head
        } else if (random > 0.8) {
             ctx.fillStyle = "#22d3ee"; // Light Cyan
        } else {
             ctx.fillStyle = "#0e7490"; // Darker Cyan/Teal
        }
        
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33); // ~30FPS

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [disableAnimation]);

  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
        {/* Canvas Layer */}
        {!disableAnimation && (
             <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0 opacity-20" 
             />
        )}
        
        {/* Content Layer */}
        <div className="relative z-10">
            {children}
        </div>

        {/* Gradient Overlays for integration */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black" />
    </div>
  );
}
