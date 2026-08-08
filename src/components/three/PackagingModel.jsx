import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { getLabelTexture } from './labelTexture';

/**
 * variant: 'pouch' | 'standpouch' | 'jar' | 'bulk' | 'foodservice'
 */
export default function PackagingModel({
  variant = 'pouch',
  scale = 1,
  autoRotate = true,
  hoverBoost = false,
  labelProps,
  ...props
}) {
  const group = useRef(null);
  const texture = getLabelTexture(labelProps);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * (hoverBoost ? 0.6 : 0.18);
  });

  return (
    <group ref={group} scale={scale} {...props}>
      {variant === 'jar' && (
        <>
          <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.62, 0.62, 1.35, 48]} />
            <meshPhysicalMaterial color="#f7f1e3" roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.3} />
          </mesh>
          <mesh position={[0, 0.79, 0]} castShadow>
            <cylinderGeometry args={[0.66, 0.66, 0.22, 48]} />
            <meshStandardMaterial color="#1f3d2c" roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0.615]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.66, 0.86]} />
            <meshStandardMaterial map={texture} roughness={0.6} />
          </mesh>
        </>
      )}

      {(variant === 'pouch' || variant === 'standpouch' || variant === 'foodservice') && (
        <>
          {(() => {
            const bodyHeight = variant === 'foodservice' ? 1.42 : 1.28;
            const bodyTop = bodyHeight / 2;
            return (
              <>
                <RoundedBox
                  args={[1.05, bodyHeight, 0.3]}
                  radius={0.14}
                  smoothness={6}
                  castShadow
                  receiveShadow
                >
                  <meshPhysicalMaterial color="#efe6d2" roughness={0.4} clearcoat={0.3} sheen={0.25} />
                </RoundedBox>
                <mesh position={[0, -0.04, 0.153]}>
                  <planeGeometry args={[0.8, 0.92]} />
                  <meshStandardMaterial map={texture} roughness={0.6} />
                </mesh>
                {/* Heat-sealed top fold */}
                <RoundedBox
                  args={[0.98, 0.16, 0.06]}
                  radius={0.04}
                  smoothness={4}
                  position={[0, bodyTop + 0.08, 0]}
                  castShadow
                >
                  <meshStandardMaterial color="#e2d7bd" roughness={0.6} />
                </RoundedBox>
                {/* Hang hole */}
                <mesh position={[0, bodyTop + 0.08, 0.035]}>
                  <torusGeometry args={[0.045, 0.014, 12, 24]} />
                  <meshStandardMaterial color="#c9bb98" roughness={0.6} />
                </mesh>
              </>
            );
          })()}
        </>
      )}

      {variant === 'bulk' && (
        <>
          <RoundedBox args={[1.3, 1.7, 1.0]} radius={0.06} smoothness={4} castShadow receiveShadow>
            <meshStandardMaterial color="#e7dcc2" roughness={0.9} />
          </RoundedBox>
          <mesh position={[0, 0.02, 0.51]}>
            <planeGeometry args={[1, 1.1]} />
            <meshStandardMaterial map={texture} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.87, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.035, 10, 24, Math.PI]} />
            <meshStandardMaterial color="#5c4a34" roughness={0.75} />
          </mesh>
        </>
      )}
    </group>
  );
}
