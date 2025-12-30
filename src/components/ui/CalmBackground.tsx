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
    let time = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    // Grid configuration
    const gridSize = 40; // spacing
    const speed = 0.5; // scrolling speed
    
    // Perspective & Wave configuration
    const perspective = 300;
    const orientationY = -100; // Moving camera up/down
    const scale = 1.0;

    const draw = () => {
      // Clear with very slight trailing effect for smoothness if desired, but clearRect is cleaner for this style
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
      
      ctx.lineWidth = 1;
      
      const horizonY = h * 0.4; // Horizon line position
      const bottomY = h;

      // We will draw a "floor" grid
      // Calculate offset based on time for infinite scroll effect
      const zOffset = (time * speed) % gridSize;

      // Draw vertical lines (perspective lines)
      // These appear to radiate from the vanishing point
      for (let x = -w; x <= w * 2; x += gridSize) {
        ctx.beginPath();
        
        // We simulate 3D simply by drawing lines from horizon to bottom
        // But to add "undulation", we need to segment the lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        
        let started = false;
        
        // Iterate "Z" (depth) from far to near
        for (let z = 0; z < h; z += 20) {
            // Apply wave to Y
            // x is the lateral position, z is the depth
            const waveHeight = Math.sin((x / 200) + (time / 50)) * Math.cos((z / 200) + (time / 50)) * 20;
            
            // Simple perspective projection helper (pseudo)
            // The further z is (smaller y on screen), the closer x is to center
            const depthFactor = (z / h); // 0 at horizon, 1 at bottom
            
            // Vanishing point X is roughly center w/2
            const vanishingX = w / 2;
            
            // Interpolate x towards vanishing point
            // currentX = x * depthFactor^power + vanishingX * (1 - depthFactor)
            // But let's stick to a simpler "floor" logic
            
            // Actual screen coordinates
            const screenY = horizonY + z + waveHeight * depthFactor; // add wave scaling with depth
            
            // Perspective spreading for X
            // At horizon (z=0), width is small. At bottom (z=h), width is large.
            // Let's reverse Z for mental model: Z goes from "far" (0) to "near" (h)
            
            const perspectiveFactor = p => {
               // p goes from 0 (horizon) to 1 (screen bottom)
               return 0.1 + Math.pow(p, 2) * 5; // Exponential spread
            };
            
            const spread = perspectiveFactor(z / (h - horizonY));
            const screenX = vanishingX + (x - vanishingX) * spread;

            if (screenY > h) continue; // optimization
            if (screenY < 0) continue;

            if (!started) {
                ctx.moveTo(screenX, screenY);
                started = true;
            } else {
                ctx.lineTo(screenX, screenY);
            }
        }
        ctx.stroke();
      }

      // Draw horizontal lines (lines parallel to horizon)
      // These loop towards the viewer
      const zStart = (time * speed) % 50; 
      
      for (let z = 0; z < h - horizonY; z += 40) {
          // Virtual Z coordinate moving towards viewer
          const currentZ = z + zStart; 
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + (currentZ / h) * 0.05})`; // Fade in as it gets closer
          
          let started = false;
          
          // Draw across the width
          // We need to iterate X to capturing the wave
          for (let x = -w; x <= w * 2; x += 40) {
               
               const waveHeight = Math.sin((x / 200) + (time / 50)) * Math.cos((currentZ / 200) + (time / 50)) * 20;
               
               const vanishingX = w / 2;
               
               // Reuse perspective logic
               const horizonDist = currentZ; 
               const depthFactor = horizonDist / (h - horizonY); // visual depth on screen
               
               const perspectiveFactor = p => {
                   return 0.1 + Math.pow(p, 2) * 5; 
               };
               
               const spread = perspectiveFactor(depthFactor);
               
               const screenY = horizonY + currentZ + waveHeight * depthFactor;
               const screenX = vanishingX + (x - vanishingX) * spread;
               
               if (screenY > h) continue;

               if (!started) {
                   ctx.moveTo(screenX, screenY);
                   started = true;
               } else {
                   ctx.lineTo(screenX, screenY);
               }
          }
          ctx.stroke();
      }
      
      // Upper gradient to fade the horizon
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.4, "rgba(0,0,0,1)"); // Solid black top
      gradient.addColorStop(0.6, "rgba(0,0,0,0)"); // Fade to transparent
      gradient.addColorStop(1, "rgba(0,0,0,0.5)"); // Vignette bottom
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      time += 1;
      frameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full opacity-60" 
        />
    </div>
  );
};
