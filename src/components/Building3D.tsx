import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function BuildingTower({ position, height, width, depth, color, delay = 0 }: {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.02;
    }
  });

  // Generate window grid
  const windows = useMemo(() => {
    const wins: [number, number, number][] = [];
    const floors = Math.floor(height / 0.35);
    const cols = Math.floor(width / 0.25);
    for (let floor = 1; floor < floors; floor++) {
      for (let col = 0; col < cols; col++) {
        wins.push([
          -width / 2 + 0.15 + col * 0.25,
          -height / 2 + 0.25 + floor * 0.35,
          depth / 2 + 0.001,
        ]);
      }
    }
    return wins;
  }, [height, width, depth]);

  return (
    <group>
      {/* Building body */}
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Front windows */}
      <group position={position}>
        {windows.map((pos, i) => (
          <mesh key={i} position={pos}>
            <planeGeometry args={[0.15, 0.22]} />
            <meshStandardMaterial
              color="#88ccff"
              emissive="#4488cc"
              emissiveIntensity={0.3 + Math.sin(i * 1.5) * 0.3}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}

        {/* Back windows */}
        {windows.map((pos, i) => (
          <mesh key={`b-${i}`} position={[pos[0], pos[1], -depth / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.15, 0.22]} />
            <meshStandardMaterial
              color="#88ccff"
              emissive="#4488cc"
              emissiveIntensity={0.2 + Math.sin(i * 2) * 0.2}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Roof cap */}
      <mesh position={[position[0], position[1] + height / 2 + 0.02, position[2]]}>
        <boxGeometry args={[width + 0.05, 0.04, depth + 0.05]} />
        <meshStandardMaterial color="#1a3a5c" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function GlassTower({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.6, 3.5, 0.6]} />
      <meshStandardMaterial
        color="#aaddff"
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.5}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a2a3a" metalness={0.2} roughness={0.8} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#fff5e6"
      />
      <directionalLight position={[-3, 4, -5]} intensity={0.4} color="#88aaff" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#aaddff" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={groupRef}>
          {/* Main tall tower */}
          <BuildingTower
            position={[0, 0.5, 0]}
            height={3.2}
            width={0.9}
            depth={0.7}
            color="#2a4a6a"
          />
          {/* Medium tower left */}
          <BuildingTower
            position={[-1.1, -0.1, 0.2]}
            height={2.0}
            width={0.7}
            depth={0.6}
            color="#3a5a7a"
            delay={1}
          />
          {/* Short tower right */}
          <BuildingTower
            position={[1.0, -0.4, 0.1]}
            height={1.4}
            width={0.8}
            depth={0.5}
            color="#2a5a6a"
            delay={2}
          />
          {/* Glass tower back-right */}
          <GlassTower position={[0.8, 0.3, -0.6]} />
          {/* Small accent building */}
          <BuildingTower
            position={[-0.5, -0.7, 0.6]}
            height={0.8}
            width={0.5}
            depth={0.4}
            color="#4a6a8a"
            delay={3}
          />
        </group>
      </Float>

      <Ground />
      <Environment preset="city" />
    </>
  );
}

export default function Building3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [3, 2, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
