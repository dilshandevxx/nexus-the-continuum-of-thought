"use client";

import { useEffect, useRef } from "react";

interface NetworkBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

export function NetworkBackground({ children, className, disableAnimation }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disableAnimation || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Configuration
    const particleCount = 60; // Adjust density
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    // Particle Class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            
            // Pushing away gently or attracting? Let's attract slightly for "synapse" feel
            // Actually, let's just make them move slightly faster near mouse or drift towards it
            // Simple gentle attraction
            this.vx += forceDirectionX * force * 0.05;
            this.vy += forceDirectionY * force * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)"; // Cyan-500
        ctx.fill();
      }
    }

    // Init
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Check connections
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                // Opacity based on distance
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.4})`; // Cyan lines
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [disableAnimation]);

  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
        {/* Canvas Layer */}
        {!disableAnimation && (
             <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0" 
             />
        )}
        
        {/* Content Layer */}
        <div className="relative z-10">
            {children}
        </div>

        {/* Gradient Overlays for depth */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/40" />
    </div>
  );
}
