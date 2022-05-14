import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { JellyfishMaterial } from "./material";
import { ShaderMaterial, Vector3 } from "three";
import { ClickPoint, Jellyfish } from "../../types";

type JellyfishProps = {
  jellies: Record<string, Jellyfish>;
  killJellyfish: (id: string) => void;
};

const Jellies = ({ jellies, killJellyfish }: JellyfishProps) => {
  const jelliesRef = useRef<Record<string, THREE.Mesh>>({});

  useFrame(({ clock: frameClock }) => {
    if (jelliesRef.current) {
      Object.values(jelliesRef.current).forEach((jellyFish, index) => {
        if (!jellyFish) {
          console.debug("accessing dead jelly");
          return;
        }
        const jellyfishAge =
          frameClock.getElapsedTime() - jellyFish.userData.creationTime;

        // figure out if the jelly fish should die
        if (jellyfishAge > jellyFish.userData.lifespanSeconds) {
          jellyFish.userData.isDead = true;
          killJellyfish(jellyFish.userData.id);
        } else {
          const material = jellyFish.material as ShaderMaterial;
          // store the current position in the material so that the positions
          // don't reset if the jellyfish data container is altered
          jellyFish.userData.position.y += 0.05 * jellyFish.userData.speed;

          jellyFish.position.y = jellyFish.userData.position.y;

          material.uniforms.uTime.value = jellyfishAge;
          material.uniforms.uSpeed.value = jellyFish.userData.speed;
        }
      });
    }
  });

  const setRef = (ref: THREE.Mesh, point: ClickPoint) => {
    if (ref) {
      (ref.material as ShaderMaterial).transparent = true;
      (ref.material as ShaderMaterial).uniforms.v3Color.value = point.color;
    }
    jelliesRef.current[point.id] = ref as THREE.Mesh;
  };

  console.log(jellies);
  return (
    <group name="click-points">
      {Object.entries(jellies).map(([id, jelly], index) => {
        if (jelly.isDead) return null;
        return (
          <Sphere
            args={[0.1, 20]}
            position={jelly.position}
            key={index}
            ref={(ref) => setRef(ref as THREE.Mesh, jelly)}
            userData={{
              creationTime: jelly.creationTime,
              speed: jelly.speed,
              index,
              id,
              lifespanSeconds: jelly.lifespanSeconds,
              isDead: false,
              position: jelly.position,
            }}
          >
            {/* @ts-ignore Property 'clickPointMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
            <jellyfishMaterial key={JellyfishMaterial.key} attach="material" />
          </Sphere>
        );
      })}
    </group>
  );
};

export default Jellies;
