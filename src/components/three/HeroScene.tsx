import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, Torus, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
  });
  return (
    <Float speed={2 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </Sphere>
    </Float>
  );
}

function WireframeObject({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
      <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
        <meshBasicMaterial color="#3aa0ff" wireframe transparent opacity={0.4} />
      </Icosahedron>
    </Float>
  );
}

function GlowTorus({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
      <Torus ref={ref} args={[0.8, 0.04, 16, 80]} position={position} scale={scale}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.6}
        />
      </Torus>
    </Float>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#3aa0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3aa0ff" />
      <pointLight position={[-5, -3, 4]} intensity={0.8} color="#7c3aed" />
      <spotLight position={[0, 6, 3]} angle={0.4} intensity={0.6} color="#ffffff" />

      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

      <ParticleField />

      <MouseParallax>
        <FloatingSphere position={[-3, 1, -1]} color="#0b82f5" scale={0.9} speed={1} />
        <FloatingSphere position={[3, -1.2, -2]} color="#7c3aed" scale={0.7} speed={0.8} />
        <FloatingSphere position={[2.5, 1.8, -3]} color="#3aa0ff" scale={0.5} speed={1.2} />
        <WireframeObject position={[-2.5, -1.5, -2]} scale={0.6} />
        <WireframeObject position={[0, 2, -4]} scale={0.4} />
        <GlowTorus position={[0, -2, -1]} scale={1.2} />
        <GlowTorus position={[-3.5, 0.5, -3]} scale={0.8} />
      </MouseParallax>
    </Canvas>
  );
}
