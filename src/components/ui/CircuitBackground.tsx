"use client";

import { useEffect, useRef } from "react";

interface CircuitBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

export function CircuitBackground({ children, className, disableAnimation }: CircuitBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disableAnimation || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Grid configuration
    const gridSize = 40; // spacing between grid lines
    const pulses: Pulse[] = [];
    const pulseCount = 30;
    
    // Pulse Class
    class Pulse {
      x: number;
      y: number;
      dx: number;
      dy: number;
      life: number;
      history: {x: number, y: number}[];
      color: string;
      speed: number;

      constructor() {
        // Snap start position to grid
        this.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        this.dx = 0;
        this.dy = 0;
        this.life = Math.random() * 100 + 50;
        this.history = [];
        this.speed = gridSize / 10; // Move 1 grid unit every 10 frames approx
        this.color = Math.random() > 0.5 ? "#06b6d4" : "#ffffff"; // Cyan or White
        
        this.pickDirection();
      }

      pickDirection() {
        // 0: right, 1: down, 2: left, 3: up
        const dirs = [
            { dx: this.speed, dy: 0 },
            { dx: 0, dy: this.speed },
            { dx: -this.speed, dy: 0 },
            { dx: 0, dy: -this.speed }
        ];
        
        // Don't reverse direction immediately
        let availableDirs = dirs;
        if (this.dx !== 0) {
             // If moving horizontal, can only go vertical or continue
             // But let's simplify: randomly turn 90 degrees or straight
             availableDirs = this.dx > 0 
                ? [{dx:this.speed, dy:0}, {dx:0, dy:this.speed}, {dx:0, dy:-this.speed}] // Right, Down, Up
                : [{dx:-this.speed, dy:0}, {dx:0, dy:this.speed}, {dx:0, dy:-this.speed}]; // Left, Down, Up
        } else if (this.dy !== 0) {
             availableDirs = this.dy > 0
                ? [{dx:0, dy:this.speed}, {dx:this.speed, dy:0}, {dx:-this.speed, dy:0}] // Down, Right, Left
                : [{dx:0, dy:-this.speed}, {dx:this.speed, dy:0}, {dx:-this.speed, dy:0}]; // Up, Right, Left
        }

        const choice = availableDirs[Math.floor(Math.random() * availableDirs.length)];
        this.dx = choice.dx;
        this.dy = choice.dy;
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 20) this.history.shift(); // Trail length

        this.x += this.dx;
        this.y += this.dy;
        this.life--;

        // Chance to turn at grid intersections
        // We are moving by fractions, so we need to check if we are "close enough" to a grid point
        // But since speed is constant, let's just turn randomly every X frames or check modulo
        // Simpler implementation: Pulse moves exactly along grid.
        
        // Let's retry movement logic for cleaner 90 deg turns
        // If we crossed a grid line...
        if (Math.abs(this.x % gridSize) < this.speed && Math.abs(this.y % gridSize) < this.speed) {
            if (Math.random() < 0.2) this.pickDirection();
            
            // Re-snap to exact line to prevent drift
            this.x = Math.round(this.x / gridSize) * gridSize;
            this.y = Math.round(this.y / gridSize) * gridSize;
        }

        // Reset if dead or off screen
        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
             this.reset();
        }
      }

      reset() {
        this.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        this.life = Math.random() * 100 + 50;
        this.history = [];
        this.pickDirection();
      }

      draw() {
        if (!ctx) return;
        
        // Draw head
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        // Glowing head
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw trail
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        for (let i = this.history.length - 1; i >= 0; i--) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.stroke();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPulses();
    };

    const initPulses = () => {
      pulses.length = 0;
      for (let i = 0; i < pulseCount; i++) {
        pulses.push(new Pulse());
      }
    };

    const drawGrid = () => {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        
        // Vertical lines
        for(let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for(let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();

      pulses.forEach(pulse => {
        pulse.update();
        pulse.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/60" /> 
    </div>
  );
}
