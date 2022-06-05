import React, { useRef } from "react";
import { Plane } from "@react-three/drei";
import useParticlesControls from "../../useExplosionsControls";
import { ShaderMaterial, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDispatch } from "react-redux";
import { resetExplosion } from "../../redux/explosionsSlice";
import { Explosion } from "../../particleExplosionsTypes";
import { ParticleExplosionMaterial } from "../../../../Materials/ParticleExplosion";

export interface MultiPlanesProps {
  pos: [number, number];
  explosionCreatedAtSeconds: number;
  explosion: Explosion;
}
const ExplosionPlanes = ({
  pos,
  explosionCreatedAtSeconds,
  explosion,
}: MultiPlanesProps) => {
  const particlesRef = useRef<{ mesh: THREE.Mesh; direction?: Vector3 }[]>([]);
  const { color, number, size, speed, lifespan } = useParticlesControls();
  const isActiveRef = useRef<boolean>(false);
  const colorRGB = new THREE.Color(color);

  const dispatch = useDispatch();
  useFrame(({ clock }) => {
    if (!explosion) return;

    const currentTime = clock.getElapsedTime();
    particlesRef.current.forEach((particle) => {
      if (explosion.isActive && !particle.mesh.visible) {
        particle.mesh.visible = true;
        isActiveRef.current = true;

        particle.direction = new Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          0
        ).normalize();
      }

      if (explosion.isActive && particle.mesh.visible && particle.direction) {
        particle.mesh.position.addScaledVector(
          particle.direction,
          Math.random() * speed
        );
        const age = currentTime - explosionCreatedAtSeconds;
        // particle.mesh.scale.x = (lifespan - age) / lifespan;
        // particle.mesh.scale.y = (lifespan - age) / lifespan;
        (particle.mesh.material as ShaderMaterial).uniforms.uAge.value = age;
        // attempt to do the rotation in the shader
        // particle.mesh.rotation.x = Math.random() * Math.PI * 0.75;
        // particle.mesh.rotation.y = Math.random() * Math.PI * 0.75;
        // particle.mesh.rotation.z = Math.random() * Math.PI * 0.75;
      }

      if (
        explosion.isActive &&
        particle.mesh.visible &&
        currentTime - explosionCreatedAtSeconds > lifespan
      ) {
        particle.mesh.visible = false;

        isActiveRef.current = false;
        if (explosion.isActive) {
          dispatch(resetExplosion(explosion.id));
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
export default ExplosionPlanes;
