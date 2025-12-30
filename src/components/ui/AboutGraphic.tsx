"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Environment, ContactShadows, OrthographicCamera } from "@react-three/drei";

function IsometricBlocks() {
  const materialProps = {
    color: "#ffffff",
    roughness: 0.1,
    metalness: 0.8,
  };

  const accentMaterialProps = {
    color: "#3b82f6", // Blue
    roughness: 0.1,
    metalness: 0.8,
  };

  return (
    <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        {/* Base Platform */}
        <mesh position={[0, -1, 0]}>
            <boxGeometry args={[4, 0.5, 4]} />
            <meshStandardMaterial {...materialProps} color="#1f2937" />
        </mesh>

        {/* Main Stack */}
        <mesh position={[-0.5, 0, -0.5]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial {...materialProps} />
        </mesh>

        <mesh position={[1, -0.25, -0.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial {...materialProps} color="#9ca3af" />
        </mesh>

        {/* Accent Block */}
        <mesh position={[-0.5, 1.25, -0.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial {...accentMaterialProps} />
        </mesh>
        
        {/* Floating bit */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[1.5, 1.5, 1.5]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial {...accentMaterialProps} />
            </mesh>
        </Float>
    </group>
  );
}

function GridScene() {
    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <IsometricBlocks />
            </Float>
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000000" />
            <Environment preset="city" />
            {/* Structured Lighting */}
            <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
            <ambientLight intensity={0.5} />
        </group>
    );
}

export function AboutGraphic() {
  return (
    <div className="relative h-full w-full min-h-[400px]">
        {/* Subtle Structural Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-zinc-800/50 blur-[80px] rounded-full" />
        
        <Canvas>
            {/* Orthographic Camera for true Isometric look */}
            <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={60} near={-100} far={100} />
            <GridScene />
        </Canvas>
    </div>
  );
}
