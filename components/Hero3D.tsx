'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Scroll-reactive 3D sculpture component with ultra-smooth lerping
function SculpturalEnvironment() {
  const meshRef = useRef<THREE.Mesh>(null);
  const secondaryMeshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 6;

  // Responsive scale and position offset
  const baseScale = isMobile ? 1.6 : 2.5;
  const targetX = isMobile ? 0.3 : 1.6;
  const targetY = isMobile ? -0.3 : -0.2;

  // Passive smooth scroll tracking without layout thrashing
  const scrollProgressRef = useRef(0);
  const currentScrollRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || 0;
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          scrollProgressRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Frame-rate independent smooth damping for scroll interpolation
    currentScrollRef.current = THREE.MathUtils.damp(
      currentScrollRef.current,
      scrollProgressRef.current,
      4,
      delta
    );

    const p = currentScrollRef.current;

    // Continuous ultra-smooth ambient rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.12) * 0.15 + p * 1.2;
      meshRef.current.rotation.y = time * 0.08 + p * 1.8;
      meshRef.current.rotation.z = Math.cos(time * 0.08) * 0.1;
    }

    if (secondaryMeshRef.current) {
      secondaryMeshRef.current.rotation.x = -time * 0.1 - p * 1.0;
      secondaryMeshRef.current.rotation.y = time * 0.06 + p * 1.4;
    }

    // Smooth group position damping
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetY - p * 2.2,
        3,
        delta
      );
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        targetX + p * 1.0,
        3,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[targetX, targetY, 0]}>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.0}>
        {/* Primary TEDx Metallic Red Twisted Ribbon / Torus Knot */}
        <mesh ref={meshRef} scale={baseScale}>
          <torusKnotGeometry args={[1.2, 0.36, 160, 32, 2, 3]} />
          <MeshDistortMaterial
            color="#EB0028"
            roughness={0.18}
            metalness={0.82}
            distort={0.2}
            speed={1.2}
            clearcoat={0.7}
            clearcoatRoughness={0.25}
          />
        </mesh>

        {/* Secondary Background Dark Metallic Accent Ring */}
        <mesh ref={secondaryMeshRef} scale={baseScale * 1.35} position={[-0.4, 0.2, -1.5]}>
          <torusGeometry args={[1.8, 0.07, 24, 80]} />
          <meshStandardMaterial
            color="#1E293B"
            roughness={0.3}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating Particles */}
      <Sparkles
        count={isMobile ? 30 : 60}
        scale={[12, 12, 12]}
        size={THREE.MathUtils.randFloat(2, 4)}
        speed={0.3}
        color="#EB0028"
        opacity={0.5}
      />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'highp',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Cinematic Ambient Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 8]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#EB0028" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#FF2A5F" />
      <spotLight position={[5, 8, 5]} angle={0.4} penumbra={1} intensity={2} color="#FFFFFF" />

      <SculpturalEnvironment />
    </Canvas>
  );
}
