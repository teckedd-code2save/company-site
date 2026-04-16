import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';

/* ── Particle count — lower on mobile for perf ─────────────────────── */
const PARTICLE_COUNT = 2400;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  /* Create geometry + velocity buffer once */
  const { geometry, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      vel[i * 3]     = (Math.random() - 0.5) * 0.007;
      vel[i * 3 + 1] = 0.005 + Math.random() * 0.009;  // gentle upward drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, velocities: vel };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3]     += velocities[i3]     + Math.sin(t * 0.2 + i * 0.8) * 0.001;
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      /* Loop back to bottom when particle exits top */
      if (pos[i3 + 1] > 9) {
        pos[i3 + 1] = -9;
        pos[i3]     = (Math.random() - 0.5) * 32;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        color="#00E699"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ParticleField />
      <EffectComposer>
        <Bloom
          intensity={1.4}
          kernelSize={KernelSize.LARGE}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ── Export ─────────────────────────────────────────────────────────── */
export default function HeroParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
