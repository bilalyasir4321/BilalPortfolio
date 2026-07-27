import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Terminal, Sparkles } from 'lucide-react';
import * as THREE from 'three';

function WireIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.7;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial color="#3aa0ff" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

export default function DeveloperModeOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[160] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-lg" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-strong relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-white/50 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-accent-500">
                <Terminal className="h-5 w-5 text-white" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">Developer Mode</h3>
                <p className="text-xs text-electric-400">Konami Code unlocked</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-56 rounded-2xl bg-ink-900/60">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[3, 3, 3]} color="#3aa0ff" />
                  <pointLight position={[-3, -3, 3]} color="#7c3aed" />
                  <WireIcosahedron />
                </Canvas>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-electric-400" /> Keyboard Shortcuts
                </h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-center justify-between">
                    <span>Command Palette</span>
                    <kbd className="rounded bg-white/5 px-2 py-0.5 text-xs">Ctrl + K</kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Back to top</span>
                    <kbd className="rounded bg-white/5 px-2 py-0.5 text-xs">Home</kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Developer Mode</span>
                    <kbd className="rounded bg-white/5 px-2 py-0.5 text-xs">↑↑↓↓←→←→ B A</kbd>
                  </li>
                </ul>
                <div className="mt-6 rounded-xl border border-electric-400/20 bg-electric-400/5 p-4 text-sm text-white/80">
                  <p className="font-medium text-electric-300">Thank you!</p>
                  <p className="mt-1 text-white/60">
                    You found the hidden Developer Mode. Thanks for exploring — this site was built
                    with React, TypeScript, Three.js, and a lot of curiosity.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
