import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PowderParticles({
  count = 260,
  radius = 2.6,
  color = '#e8a324',
  size = 0.028,
  speed = 0.06,
  origin = [0, 0, 0],
}) {
  const points = useRef(null);

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seedArr = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const r = radius * (0.35 + Math.random() * 0.65);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = origin[0] + r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = origin[1] + r * Math.cos(phi) * 0.55;
      pos[i * 3 + 2] = origin[2] + r * Math.sin(phi) * Math.sin(theta);
      seedArr[i] = Math.random() * Math.PI * 2;
    }
    return [pos, seedArr];
  }, [count, radius, origin]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    const arr = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i += 1) {
      const s = seeds[i];
      arr[i * 3 + 1] += Math.sin(t * speed * 10 + s) * 0.0006;
      arr[i * 3] += Math.cos(t * speed * 6 + s) * 0.0004;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = t * speed;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
