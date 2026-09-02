'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   PULSING AI CORE SPHERE
───────────────────────────────────────────── */
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere ref={meshRef} args={[1.1, 64, 64]}>
        <MeshDistortMaterial
          color="#a0c4ff"
          attach="material"
          distort={0.38}
          speed={2.2}
          roughness={0.05}
          metalness={0.9}
          emissive="#1a3a6e"
          emissiveIntensity={0.6}
          transparent
          opacity={0.92}
        />
      </Sphere>
    </Float>
  );
}

/* ─────────────────────────────────────────────
   INNER GLOW SPHERE
───────────────────────────────────────────── */
function GlowSphere() {
  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <Sphere args={[0.82, 32, 32]}>
        <meshStandardMaterial
          color="#4a90d9"
          emissive="#1e5799"
          emissiveIntensity={2.5}
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

/* ─────────────────────────────────────────────
   ORBITING RING
───────────────────────────────────────────── */
function OrbitRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.z = t;
    }
    if (dotRef.current) {
      dotRef.current.position.x = radius;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      {/* Ring line */}
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 120]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Orbiting dot */}
      <group ref={groupRef}>
        <Trail width={0.04} length={6} color={color} attenuation={(t) => t * t}>
          <mesh ref={dotRef} position={[radius, 0, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={3}
            />
          </mesh>
        </Trail>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLE FIELD
───────────────────────────────────────────── */
function Particles({ count = 320 }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Colour range: icy-blue to violet
      color.setHSL(0.58 + Math.random() * 0.12, 0.9, 0.7);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.04;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────
   HEX GRID PLANE (subtle floor)
───────────────────────────────────────────── */
function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
      <planeGeometry args={[18, 18, 22, 22]} />
      <meshStandardMaterial
        color="#0d1b2e"
        wireframe
        transparent
        opacity={0.18}
        emissive="#1a3a6e"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   SCAN LINE RING (horizontal)
───────────────────────────────────────────── */
function ScanRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 1.6;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.35, 0.004, 4, 80]} />
      <meshStandardMaterial
        color="#7ecfff"
        emissive="#7ecfff"
        emissiveIntensity={2.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   SCENE
───────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#6eb3ff" />
      <pointLight position={[-4, -2, -4]} intensity={2} color="#a78bfa" />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />

      {/* Stars background */}
      <Stars
        radius={22}
        depth={50}
        count={2800}
        factor={3}
        saturation={0.6}
        fade
        speed={0.6}
      />

      {/* Grid floor */}
      <GridPlane />

      {/* Orbiting rings */}
      <OrbitRing radius={1.7} speed={0.6} tilt={Math.PI / 3} color="#7ecfff" />
      <OrbitRing radius={2.1} speed={-0.4} tilt={Math.PI / 5} color="#a78bfa" />
      <OrbitRing radius={1.4} speed={0.9} tilt={-Math.PI / 4} color="#38bdf8" />

      {/* Scan line */}
      <ScanRing />

      {/* Particle cloud */}
      <Particles count={340} />

      {/* Inner glow */}
      <GlowSphere />

      {/* Core AI sphere */}
      <CoreSphere />
    </>
  );
}

/* ─────────────────────────────────────────────
   EXPORTED CANVAS COMPONENT
───────────────────────────────────────────── */
export default function AIBotCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
