"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { createNoise2D } from "simplex-noise";
import { Color } from "three";

interface HolographicBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

const WaveMesh = () => {
    const meshRef = useRef<any>(null);
    const noise2D = useMemo(() => createNoise2D(), []);

    // Grid settings
    const cols = 50;
    const rows = 50;
    
    useFrame((state) => {
        if (!meshRef.current) return;
        
        const time = state.clock.getElapsedTime() * 0.5; // Speed of flow
        const positions = meshRef.current.geometry.attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // Create wave-like noise flow
            // Combine multiple noise layers for "ocean" feel
            const wave1 = noise2D(x * 0.15 + time, y * 0.15 + time) * 1.5;
            const wave2 = noise2D(x * 0.3 - time, y * 0.3 + time) * 0.5;
            
            positions.setZ(i, wave1 + wave2);
        }
        
        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, -15]}>
            {/* Plane with high segment count for smooth waves */}
            <planeGeometry args={[100, 50, cols, rows]} />
            <meshBasicMaterial 
                color={new Color("#22d3ee")} // Cyan-400 (Brighter)
                wireframe={true}
                transparent={true}
                opacity={0.4}
                side={2} // DoubleSide
            />
        </mesh>
    );
};

export function HolographicBackground({ children, className, disableAnimation }: HolographicBackgroundProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
        {/* 3D Background Layer */}
        {!disableAnimation && (
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
                     {/* Reduced fog density */}
                    <fog attach="fog" args={["black", 20, 70]} />
                    <WaveMesh />
                </Canvas>
            </div>
        )}
        
        {/* Content Layer */}
        <div className="relative z-10">
            {children}
        </div>

        {/* Gradient Overlays for smooth fading */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-0" />
    </div>
  );
}
