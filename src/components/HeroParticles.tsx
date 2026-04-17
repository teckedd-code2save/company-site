import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';

const ACCENT = '#C084FC';
const BG = '#050505';

/* ═══════════════════════════════════════════════════════════════════════
   GridFloor — perspective wireframe grid with wave distortion
═══════════════════════════════════════════════════════════════════════ */
function GridFloor() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { geometry, originalPositions } = useMemo(() => {
    const size = 40;
    const divisions = 60;
    const geo = new THREE.PlaneGeometry(size, size, divisions, divisions);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position.array as Float32Array;
    const orig = new Float32Array(pos.length);
    orig.set(pos);
    return { geometry: geo, originalPositions: orig };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.x * 8;
    const my = mouseRef.current.y * 4;

    for (let i = 0; i < pos.length; i += 3) {
      const ox = originalPositions[i];
      const oz = originalPositions[i + 2];

      // wave distortion
      const wave =
        Math.sin(ox * 0.3 + t * 0.4) * 0.3 +
        Math.cos(oz * 0.25 + t * 0.3) * 0.2;

      // mouse proximity bulge
      const dx = ox - mx;
      const dz = oz - my;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const bulge = Math.exp(-dist * dist * 0.15) * 1.2;

      pos[i + 1] = wave + bulge;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -3, 0]}>
      <meshBasicMaterial
        color={ACCENT}
        transparent
        opacity={0.06}
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WireframeShape — floating geometric polyhedron
═══════════════════════════════════════════════════════════════════════ */
function WireframeShape({
  geometry,
  position,
  rotationSpeed,
  scale = 1,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += rotationSpeed[0] * 0.003;
    ref.current.rotation.y += rotationSpeed[1] * 0.003;
    ref.current.rotation.z += rotationSpeed[2] * 0.003;

    // subtle mouse attraction
    ref.current.rotation.x += mouseRef.current.y * 0.0005;
    ref.current.rotation.y += mouseRef.current.x * 0.0005;

    // gentle float
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial
        color={ACCENT}
        transparent
        opacity={0.12}
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   GlowingNode — emissive sphere at grid intersection
═══════════════════════════════════════════════════════════════════════ */
function GlowingNode({ position, pulseOffset }: { position: [number, number, number]; pulseOffset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.5 + pulseOffset) * 0.3;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={3}
        toneMapped={false}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CameraRig — mouse-reactive parallax tilt
═══════════════════════════════════════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    targetRef.current.x += (mouseRef.current.x * 0.3 - targetRef.current.x) * 0.03;
    targetRef.current.y += (mouseRef.current.y * 0.15 - targetRef.current.y) * 0.03;

    camera.position.x = targetRef.current.x;
    camera.position.y = 3 + targetRef.current.y * 0.5;
    camera.lookAt(0, -1, 0);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════════════════
   Scene
═══════════════════════════════════════════════════════════════════════ */
function Scene() {
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 0), []);
  const octaGeo = useMemo(() => new THREE.OctahedronGeometry(0.9, 0), []);
  const torusGeo = useMemo(() => new THREE.TorusKnotGeometry(0.7, 0.25, 64, 8), []);

  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 8, 28]} />

      <CameraRig />

      <ambientLight intensity={0.05} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color={ACCENT} />

      <GridFloor />

      <WireframeShape
        geometry={icoGeo}
        position={[4, 1.5, -2]}
        rotationSpeed={[0.3, 0.7, 0.1]}
        scale={1.2}
      />
      <WireframeShape
        geometry={octaGeo}
        position={[-3.5, 0.5, -4]}
        rotationSpeed={[0.5, -0.4, 0.2]}
        scale={1}
      />
      <WireframeShape
        geometry={torusGeo}
        position={[0, 2.5, -6]}
        rotationSpeed={[0.1, 0.3, 0.05]}
        scale={0.8}
      />

      {/* Glowing nodes */}
      <GlowingNode position={[2, -1.5, 1]} pulseOffset={0} />
      <GlowingNode position={[-2.5, -2, 0.5]} pulseOffset={2} />
      <GlowingNode position={[0, -1.8, 2]} pulseOffset={4} />
      <GlowingNode position={[3.5, -2.2, -1]} pulseOffset={1} />
      <GlowingNode position={[-1, -2.5, -2]} pulseOffset={3} />

      <EffectComposer>
        <Bloom
          intensity={1.2}
          kernelSize={KernelSize.LARGE}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Export
═══════════════════════════════════════════════════════════════════════ */
export default function HeroParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 3, 8], fov: 55 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.2]}
        style={{ background: BG }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
