import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import PackagingModel from './PackagingModel';

export default function PackagingCardScene({ variant, labelProps, hovered, reduceMotion }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 4.2], fov: 30 }}
      onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#fdf6e4', '#3a2f22', 0.5]} />
      <directionalLight position={[2, 3, 2]} intensity={1.5} color="#fff3d6" />
      <directionalLight position={[-2, 1, -1]} intensity={0.35} color="#33553f" />
      <PackagingModel
        variant={variant}
        labelProps={labelProps}
        scale={0.95}
        autoRotate={!reduceMotion}
        hoverBoost={hovered}
      />
      <ContactShadows position={[0, -0.9, 0]} opacity={0.35} scale={5} blur={2} />
    </Canvas>
  );
}
