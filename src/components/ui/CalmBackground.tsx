"use client";

import { useEffect, useRef } from "react";

export const CalmBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Varying sizes gives depth perception: smaller ones look further away
        this.size = Math.random() * 1.5; 
        // Very slow, drift-like movement
        this.speedX = (Math.random() - 0.5) * 0.2; 
        this.speedY = (Math.random() - 0.5) * 0.2; 
        // Random starting opacity
        this.opacity = Math.random() * 0.5 + 0.1;
        // Twinkle speed
        this.fadeSpeed = (Math.random() - 0.5) * 0.005; 
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Twinkle effect (oscillate opacity)
        this.opacity += this.fadeSpeed;
        if (this.opacity > 0.8 || this.opacity < 0.1) {
            this.fadeSpeed = -this.fadeSpeed;
        }

        // Wrap around screen
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        // Soft white glow
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Sparse count for "calm" feel. Not too crowded.
      // Adjust density: (width * height) / density_factor
      const particleCount = Math.floor((w * h) / 10000); 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      // Clear with slight trail if desired, but clean clear is better for stars
      ctx.clearRect(0, 0, w, h);
      
      // Optional: Very subtle background gradient instead of pure black
      // const grad = ctx.createLinearGradient(0, 0, 0, h);
      // grad.addColorStop(0, "#050505");
      // grad.addColorStop(1, "#000000");
      // ctx.fillStyle = grad;
      // ctx.fillRect(0,0,w,h);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 via-black to-black pointer-events-none">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
        />
        {/* Subtle noise overlay for texture if desired (optional) */}
        {/* <div className="absolute inset-0 bg-transparent opacity-5" style={{backgroundImage: 'url("/noise.png")'}} ></div> */}
    </div>
  );
};
