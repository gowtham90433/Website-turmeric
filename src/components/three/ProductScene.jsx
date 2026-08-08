import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import TurmericRoot from './TurmericRoot';
import PackagingModel from './PackagingModel';
import PowderParticles from './PowderParticles';

const LABELS = {
  powder: { title: 'PREMIUM TURMERIC', subtitle: 'FINE POWDER' },
  bulk: { title: 'BULK TURMERIC', subtitle: 'FOR MANUFACTURERS' },
};

export default function ProductScene({ variant, reduceMotion }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.3, 5.4], fov: 30 }}
      onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
    >
      <ambientLight intensity={0.8} />
      <hemisphereLight args={['#fdf6e4', '#3a2f22', 0.5]} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#fff3d6" castShadow />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#33553f" />

      <Float speed={reduceMotion ? 0 : 1} rotationIntensity={0.15} floatIntensity={0.45}>
        {variant === 'powder' && (
          <PackagingModel variant="standpouch" scale={1.15} labelProps={LABELS.powder} autoRotate={!reduceMotion} />
        )}
        {variant === 'whole' && (
          <TurmericRoot scale={1.05} showCut rotationSpeed={reduceMotion ? 0 : 0.15} />
        )}
        {variant === 'bulk' && (
          <PackagingModel variant="bulk" scale={0.95} labelProps={LABELS.bulk} autoRotate={!reduceMotion} />
        )}
      </Float>

      {!reduceMotion && <PowderParticles count={90} radius={2.2} size={0.02} />}

      <ContactShadows position={[0, -0.95, 0]} opacity={0.4} scale={7} blur={2.2} />
    </Canvas>
  );
}
