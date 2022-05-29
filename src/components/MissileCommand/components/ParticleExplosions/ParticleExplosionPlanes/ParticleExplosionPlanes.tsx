import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { Vector3, ShaderMaterial } from "three";
import { ParticleExplosionMaterial } from "../../../../../Materials/ParticleExplosion";
import { ParticleExplosion } from "../../../mcTypes";
import {
  PARTICLE_EXPLOSIONS,
  Z_INTERCEPTOR_EXPLOSIONS,
} from "../../../missileCommandGlobals";
import { resetParticleExplosion } from "../../../redux/particleExplosionsSlice";

export interface ParticleExplosionPlanesProps {
  pos: [number, number];
  particleExplosionCreatedAtSeconds: number;
  particleExplosion: ParticleExplosion;
}
const ParticleExplosionPlanes = ({
  pos,
  particleExplosionCreatedAtSeconds,
  particleExplosion,
}: ParticleExplosionPlanesProps) => {
  const particlesRef = useRef<{ mesh: THREE.Mesh; direction?: Vector3 }[]>([]);
  const { color, number, size, speed, lifespan } = PARTICLE_EXPLOSIONS;
  const isActiveRef = useRef<boolean>(false);
  const colorRGB = new THREE.Color(color);

  const dispatch = useDispatch();
  useFrame(({ clock }) => {
    if (!particleExplosion) return;

    const currentTime = clock.getElapsedTime();
    particlesRef.current.forEach((particle) => {
      if (particleExplosion.isActive && !particle.mesh.visible) {
        particle.mesh.visible = true;
        isActiveRef.current = true;

        particle.direction = new Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Z_INTERCEPTOR_EXPLOSIONS
        ).normalize();
      }

      if (
        particleExplosion.isActive &&
        particle.mesh.visible &&
        particle.direction
      ) {
        particle.mesh.position.addScaledVector(
          particle.direction,
          speed + Math.random() * speed - Math.random() * speed
        );
        const age = currentTime - particleExplosionCreatedAtSeconds;
        // particle.mesh.scale.x = (lifespan - age) / lifespan;
        // particle.mesh.scale.y = (lifespan - age) / lifespan;
        (particle.mesh.material as ShaderMaterial).uniforms.uAge.value =
          currentTime - particleExplosion.createdAtSeconds;
      }

      if (
        particleExplosion.isActive &&
        particle.mesh.visible &&
        currentTime - particleExplosionCreatedAtSeconds > lifespan
      ) {
        particle.mesh.visible = false;

        isActiveRef.current = false;
        if (particleExplosion.isActive) {
          dispatch(resetParticleExplosion(particleExplosion.id));
        }
      }

      if (!isActiveRef.current && particle.mesh.visible) {
        particle.mesh.visible = false;
      }
    });
  });

  return (
    <group name="multi-spheres">
      {Array.from(Array(number)).map((_, index) => {
        return (
          <Plane
            args={[size, size, 1]}
            position={new Vector3().fromArray([pos[0], pos[1], 0])}
            key={index}
            ref={(ref: THREE.Mesh) => {
              if (ref) {
                particlesRef.current.push({
                  mesh: ref,
                });
              }
            }}
          >
            {/* @ts-ignore Property 'particleExplosionMaterial' does not exist on type 'JSX.IntrinsicElements'.*/}
            <particleExplosionMaterial
              key={ParticleExplosionMaterial.key}
              v3Color={[colorRGB.r, colorRGB.g, colorRGB.b]}
              uExplosionLifeSpan={lifespan}
            />
          </Plane>
        );
      })}
    </group>
  );
};
export default ParticleExplosionPlanes;
