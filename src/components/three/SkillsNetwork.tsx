import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '@/types';

const COLORS = ['#3aa0ff', '#7c3aed', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'];

function SkillNode({
  skill,
  position,
  color,
  active,
  onClick,
}: {
  skill: Skill;
  position: [number, number, number];
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.12;
    ref.current.rotation.y = t * 0.3;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = active ? 1.2 : 0.4 + Math.sin(t * 2 + position[0]) * 0.15;
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <icosahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      <Html center distanceFactor={9} position={[0, -0.5, 0]} className="pointer-events-none">
        <div
          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium transition ${
            active ? 'bg-electric-500 text-white' : 'bg-white/10 text-white/70'
          }`}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function Network({ skills, active, setActive }: {
  skills: Skill[];
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const count = skills.length;
    const radius = 3.2;
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, [skills]);

  const connections = useMemo(() => {
    const lines: { from: [number, number, number]; to: [number, number, number]; key: string }[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.hypot(
          positions[i][0] - positions[j][0],
          positions[i][1] - positions[j][1],
          positions[i][2] - positions[j][2]
        );
        if (dist < 3) {
          lines.push({ from: positions[i], to: positions[j], key: `${i}-${j}` });
        }
      }
    }
    return lines;
  }, [positions]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
  });

  return (
    <group ref={group}>
      {connections.map((c) => (
        <Line
          key={c.key}
          points={[c.from, c.to]}
          color="#3aa0ff"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          color={COLORS[i % COLORS.length]}
          active={active === i}
          onClick={() => setActive(active === i ? null : i)}
        />
      ))}
    </group>
  );
}

export default function SkillsNetwork({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState<number | null>(null);
  const activeSkill = active !== null ? skills[active] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="relative h-[420px] lg:col-span-3 lg:h-[520px]">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#3aa0ff" />
          <pointLight position={[-5, -5, 3]} intensity={0.8} color="#7c3aed" />
          <Network skills={skills} active={active} setActive={setActive} />
        </Canvas>
        <div className="pointer-events-none absolute bottom-3 left-3 text-xs text-white/40">
          Click a node to inspect
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="glass-strong min-h-[200px] p-6">
          {activeSkill ? (
            <div>
              <span className="text-xs uppercase tracking-wider text-electric-400">
                {activeSkill.category}
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                {activeSkill.name}
              </h3>
              <p className="mt-3 text-sm text-white/65">{activeSkill.description}</p>
              <div className="mt-5">
                <div className="mb-1 flex justify-between text-xs text-white/50">
                  <span>Proficiency</span>
                  <span>{activeSkill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric-400 to-accent-400"
                    style={{ width: `${activeSkill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center text-center">
              <p className="text-sm text-white/50">
                Select a glowing node to view skill details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
