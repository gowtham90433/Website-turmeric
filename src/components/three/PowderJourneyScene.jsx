import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TurmericRoot from './TurmericRoot';
import { fbmDisplace } from './organicNoise';
import PackagingModel from './PackagingModel';

function influence(stage, progress, width = 0.62) {
  const d = Math.abs(progress - stage);
  return THREE.MathUtils.clamp(1 - d / width, 0, 1);
}

function StageGroup({ scale, children }) {
  const visible = scale > 0.02;
  return (
    <group scale={[scale, scale, scale]} visible={visible}>
      {children}
    </group>
  );
}

function DriedFingers({ scale }) {
  const items = useMemo(
    () =>
      new Array(5).fill(0).map((_, i) => ({
        position: [(i - 2) * 0.62, Math.sin(i * 2.1) * 0.18, Math.cos(i) * 0.3],
        rotation: [0.3, i * 0.7, 0.2],
      })),
    []
  );
  return (
    <StageGroup scale={scale}>
      {items.map((it, i) => (
        <group key={i} position={it.position} rotation={it.rotation}>
          <TurmericRoot scale={0.42} autoRotate={false} detail={3} />
        </group>
      ))}
    </StageGroup>
  );
}

function GrindingStage({ scale }) {
  const wheel = useRef(null);
  useFrame((_, delta) => {
    if (wheel.current) wheel.current.rotation.z += delta * 1.4;
  });
  return (
    <StageGroup scale={scale}>
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.15, 0.35, 40]} />
        <meshStandardMaterial color="#8a6440" roughness={0.95} />
      </mesh>
      <mesh ref={wheel} position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.22, 40]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color="#e8a324" roughness={0.85} />
      </mesh>
    </StageGroup>
  );
}

function powderMoundGeometry() {
  const geo = new THREE.ConeGeometry(1.1, 0.85, 48, 8, true);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 1) {
    v.fromBufferAttribute(pos, i);
    const n = fbmDisplace(v.x * 3, v.y * 3, v.z * 3, 2.4);
    v.x += n * 0.05;
    v.z += n * 0.05;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function PowderMound({ scale }) {
  const geo = useMemo(() => powderMoundGeometry(), []);
  return (
    <StageGroup scale={scale}>
      <mesh geometry={geo} position={[0, -0.42, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#e8a324" roughness={1} />
      </mesh>
    </StageGroup>
  );
}

const STAGE_COUNT = 6;

export default function PowderJourneyScene({ progress = 0 }) {
  const t = progress * (STAGE_COUNT - 1);

  const rootScale = influence(0, t);
  const slicingScale = influence(1, t);
  const driedScale = influence(2, t);
  const grindingScale = influence(3, t);
  const powderScale = Math.max(influence(4, t), influence(5, t) * 0.4);
  const packedScale = influence(5, t);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#fff3d6" castShadow />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#33553f" />

      <StageGroup scale={rootScale}>
        <TurmericRoot scale={1} showCut autoRotate rotationSpeed={0.18} />
      </StageGroup>

      <StageGroup scale={slicingScale}>
        <group>
          <TurmericRoot scale={0.9} showCut autoRotate={false} />
          <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 5]}>
            <boxGeometry args={[1.6, 0.03, 0.4]} />
            <meshStandardMaterial color="#cfd6d2" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </StageGroup>

      <DriedFingers scale={driedScale} />
      <GrindingStage scale={grindingScale} />
      <PowderMound scale={powderScale} />

      <StageGroup scale={packedScale}>
        <PackagingModel
          variant="standpouch"
          scale={1}
          position={[0, -0.1, 0]}
          labelProps={{ title: 'PREMIUM TURMERIC', subtitle: 'FINE POWDER' }}
          autoRotate
        />
      </StageGroup>
    </>
  );
}
