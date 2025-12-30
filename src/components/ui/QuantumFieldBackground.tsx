"use client";

import { useEffect, useRef } from "react";

interface QuantumFieldBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

export function QuantumFieldBackground({ children, className, disableAnimation }: QuantumFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disableAnimation || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    // Config
    const SPACING = 30;
    const MOUSE_RADIUS = 200;
    const DRAG = 0.95;
    const EASE = 0.05;

    class Particle {
      bx: number; // Base positions
      by: number;
      x: number;  // Current positions
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(x: number, y: number) {
        this.bx = x;
        this.by = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = 1.5;
        this.color = "rgba(6, 182, 212, 0.3)"; // Cyan-500 base
      }

      update() {
        // Distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Interaction forces
        if (distance < MOUSE_RADIUS) {
            const angle = Math.atan2(dy, dx);
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS; 
            const push = force * 20; // Power
            
            // Push away
            this.vx -= Math.cos(angle) * push * 0.5;
            this.vy -= Math.sin(angle) * push * 0.5;
            
            this.color = `rgba(255, 255, 255, ${force})`; // Bright white when active
        } else {
             this.color = "rgba(6, 182, 212, 0.3)"; // Return to cyan
        }

        // Spring back to base
        const dxBase = this.bx - this.x;
        const dyBase = this.by - this.y;
        
        this.vx += dxBase * EASE;
        this.vy += dyBase * EASE;

        // Friction
        this.vx *= DRAG;
        this.vy *= DRAG;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Dynamic size based on displacement
        const displacement = Math.abs(this.x - this.bx) + Math.abs(this.y - this.by);
        const radius = this.size + (displacement * 0.05); 
        ctx.arc(this.x, this.y, radius > 3 ? 3 : radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const cols = Math.ceil(canvas.width / SPACING);
      const rows = Math.ceil(canvas.height / SPACING);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            particles.push(new Particle(i * SPACING, j * SPACING));
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      // Trail effect? No, let's keep it crisp
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [disableAnimation]);

  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
        {/* Canvas */}
        {!disableAnimation && (
            <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
        )}

        {/* Content */}
        <div className="relative z-10 h-full w-full">
            {children}
        </div>
        
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black" />
    </div>
  );
}
