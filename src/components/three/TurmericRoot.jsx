import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fbmDisplace } from './organicNoise';

function makeSegmentGeometry(radius, seed, detail, bumpiness = 0.1) {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 1) {
    v.fromBufferAttribute(pos, i);
    const n = fbmDisplace(v.x * 1.4, v.y * 1.4, v.z * 1.4, seed);
    const scale = 1 + n * bumpiness;
    v.multiplyScalar(scale);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Procedural turmeric rhizome: overlapping bumpy segments strung along a
 * gentle curve, with a couple of small offshoot "fingers" — approximates the
 * knuckled look of a real turmeric root without a modeled asset.
 */
export default function TurmericRoot({
  scale = 1,
  color = '#a9702c',
  fleshColor = '#e8a324',
  showCut = false,
  autoRotate = true,
  rotationSpeed = 0.12,
  detail = 4,
  ...props
}) {
  const group = useRef(null);

  const segments = useMemo(() => {
    const count = 7;
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const t = i / (count - 1);
      const curve = Math.sin(t * Math.PI) * 0.55;
      const radius = 0.62 * (1 - Math.pow(Math.abs(t - 0.5) * 1.7, 2) * 0.55);
      list.push({
        position: [t * 3.4 - 1.7, curve * 0.6, Math.sin(t * 5) * 0.18],
        radius: Math.max(radius, 0.3),
        seed: i * 1.37 + 0.4,
        rotation: [t * 1.2, t * 2.1, 0],
      });
    }
    return list;
  }, []);

  const offshoots = useMemo(
    () => [
      { position: [-1.35, -0.42, 0.3], radius: 0.24, seed: 3.1, rotation: [0.4, 0.2, 0.6] },
      { position: [1.5, 0.32, -0.22], radius: 0.22, seed: 5.6, rotation: [-0.3, 0.5, -0.2] },
      { position: [0.1, -0.55, 0.4], radius: 0.19, seed: 7.2, rotation: [0.6, -0.4, 0.1] },
    ],
    []
  );

  const geometries = useMemo(
    () => [...segments, ...offshoots].map((s) => makeSegmentGeometry(s.radius, s.seed, detail)),
    [segments, offshoots, detail]
  );

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * rotationSpeed;
    }
  });

  const all = [...segments, ...offshoots];

  return (
    <group ref={group} scale={scale} {...props}>
      {all.map((s, i) => (
        <mesh
          key={i}
          geometry={geometries[i]}
          position={s.position}
          rotation={s.rotation}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={color}
            roughness={0.72}
            metalness={0}
            clearcoat={0.15}
            clearcoatRoughness={0.6}
            sheen={1}
            sheenColor={fleshColor}
            sheenRoughness={0.8}
          />
        </mesh>
      ))}
      {showCut && (
        <mesh position={[1.85, 0.32, -0.22]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.26, 32]} />
          <meshPhysicalMaterial color={fleshColor} roughness={0.55} clearcoat={0.3} />
        </mesh>
      )}
    </group>
  );
}
