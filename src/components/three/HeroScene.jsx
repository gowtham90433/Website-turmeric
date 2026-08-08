import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import TurmericRoot from './TurmericRoot';
import PackagingModel from './PackagingModel';
import PowderParticles from './PowderParticles';

function Rig({ pointer }) {
  useFrame((state) => {
    const targetX = pointer.current.x * 0.35;
    const targetY = pointer.current.y * 0.2;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (0.2 - targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ pointer, reduceMotion }) {
  return (
    <>
      <color attach="background" args={['#faf6ee']} />
      <fog attach="fog" args={['#faf6ee', 8, 16]} />
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#fdf6e4', '#3a2f22', 0.5]} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.7}
        color="#fff3d6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#33553f" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={1} intensity={0.6} color="#f4b93a" />

      <Float speed={reduceMotion ? 0 : 1.1} rotationIntensity={0.25} floatIntensity={0.6}>
        <TurmericRoot
          position={[-0.5, 0.1, 0]}
          scale={0.95}
          rotationSpeed={reduceMotion ? 0 : 0.16}
          showCut
        />
      </Float>

      <Float speed={reduceMotion ? 0 : 0.9} rotationIntensity={0.15} floatIntensity={0.5}>
        <PackagingModel
          variant="standpouch"
          position={[1.65, -0.15, 0.3]}
          scale={0.85}
          autoRotate={!reduceMotion}
        />
      </Float>

      {!reduceMotion && <PowderParticles count={220} radius={2.8} origin={[0.2, 0, 0]} />}

      <ContactShadows position={[0, -0.92, 0]} opacity={0.45} scale={10} blur={2.4} far={2} />
      {!reduceMotion && <Rig pointer={pointer} />}
    </>
  );
}

export default function HeroScene({ reduceMotion = false }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.8) : 1);

  const handlePointerMove = (event) => {
    const { innerWidth, innerHeight } = window;
    pointer.current = {
      x: (event.clientX / innerWidth) * 2 - 1,
      y: (event.clientY / innerHeight) * 2 - 1,
    };
  };

  return (
    <div
      className="hero-canvas"
      onPointerMove={reduceMotion ? undefined : handlePointerMove}
      aria-hidden="true"
    >
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [0, 0.2, 6.4], fov: 34 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#faf6ee', 1);
          setDpr(Math.min(window.devicePixelRatio, 1.8));
        }}
      >
        <Scene pointer={pointer} reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
