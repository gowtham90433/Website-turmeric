import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import TurmericRoot from './TurmericRoot';

export default function InteractiveRootScene({ reduceMotion }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.5, 5.2], fov: 32 }}
      onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
    >
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#fdf6e4', '#3a2f22', 0.5]} />
      <directionalLight position={[3, 4, 3]} intensity={1.5} color="#fff3d6" castShadow />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#33553f" />
      <TurmericRoot rotationSpeed={reduceMotion ? 0 : 0.1} autoRotate={!reduceMotion} showCut />
      <ContactShadows position={[0, -0.9, 0]} opacity={0.4} scale={8} blur={2.2} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
