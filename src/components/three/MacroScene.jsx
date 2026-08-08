import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import TurmericRoot from './TurmericRoot';
import PowderParticles from './PowderParticles';

export default function MacroScene({ reduceMotion }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0.4, 0.2, 3.2], fov: 26 }}
      onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#fdf6e4', '#3a2f22', 0.5]} />
      <directionalLight position={[2, 3, 2]} intensity={1.7} color="#fff3d6" />
      <directionalLight position={[-2, 1, -1]} intensity={0.4} color="#33553f" />
      <Float speed={reduceMotion ? 0 : 1} rotationIntensity={0.2} floatIntensity={0.4}>
        <TurmericRoot scale={1.6} showCut rotationSpeed={reduceMotion ? 0 : 0.1} />
      </Float>
      {!reduceMotion && <PowderParticles count={70} radius={2} size={0.018} />}
    </Canvas>
  );
}
