"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three";

interface StarFieldProps {
  children?: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

function StarField({ count = 1500 }) {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }));

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);
  
  // Random starting position and velocity
  const reset = () => {
    const x = (Math.random() - 0.5) * 4;
    const y = (Math.random() - 0.5) * 4;
    const z = -2 + Math.random() * 4;
    if (ref.current) {
        ref.current.position.set(x, y, z);
        ref.current.scale.set(1, 1, 1);
    }
    setActive(true);
  };

  useFrame((_, delta) => {
    if (!active) {
       if (Math.random() < 0.003) reset(); // Lower chance to spawn
       return;
    }

    if (ref.current) {
        ref.current.position.z += delta * 4; // Slightly slower
        ref.current.position.x += delta * 0.5;
        
        // Scale down tail effect
        ref.current.scale.z = 1 + delta * 20;

        if (ref.current.position.z > 2) {
            setActive(false);
        }
    }
  });

  return (
      <mesh ref={ref} visible={active}>
          <boxGeometry args={[0.005, 0.005, 0.4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
  );
}

function WarpStars({ count = 100 }) {
    // Stars that move towards camera
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    // Initial positions
    const particles = useMemo(() => {
        const temp = [];
        for(let i=0; i<count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push({ x, y, z, speed: 0.1 + Math.random() * 0.5 });
        }
        return temp;
    }, [count]);

    useFrame((_, delta) => {
        if (!mesh.current) return;
        
        particles.forEach((particle, i) => {
            // Move particle towards camera (z-axis)
            particle.z += particle.speed * 3 * delta; // Slower warp speed
            
            // Reset if passed camera
            if (particle.z > 5) {
                particle.z = -10;
                particle.x = (Math.random() - 0.5) * 10;
                particle.y = (Math.random() - 0.5) * 10;
            }

            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} >
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </instancedMesh>
    );
}

export function StarFieldBackground({ children, className, disableAnimation }: StarFieldProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
        {/* Canvas */}
        {!disableAnimation && (
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <group dispose={null}>
                         <StarField />
                         <WarpStars count={100} />
                         <ShootingStar />
                         <ShootingStar />
                    </group>
                </Canvas>
            </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full w-full">
            {children}
        </div>
        
        {/* Gradient Overlay for legibility or cinematic feel */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
    </div>
  );
}
