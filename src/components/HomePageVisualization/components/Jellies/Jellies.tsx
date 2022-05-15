import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { JellyfishMaterial } from "./material";
import { ShaderMaterial } from "three";
import { ClickPoint, Jellyfish } from "../../types";
import * as THREE from "three";

type JellyfishProps = {
  jellies: Record<string, Jellyfish>;
  killJellyfish: (id: string) => void;
};

const Jellies = ({ jellies, killJellyfish }: JellyfishProps) => {
  const jelliesRef = useRef<Record<string, THREE.Mesh>>({});

  const { camera, mouse } = useThree();

  useFrame(({ clock: frameClock }) => {
    if (jelliesRef.current) {
      Object.entries(jelliesRef.current).forEach(([key, jellyfish], index) => {
        if (!jellyfish) {
          delete jelliesRef.current[key];
          return;
        }
        const jellyfishAge =
          frameClock.getElapsedTime() - jellyfish.userData.creationTime;

        // figure out if the jelly fish should die
        if (jellyfishAge > jellyfish.userData.lifespanSeconds) {
          jellyfish.userData.isDead = true;
          killJellyfish(jellyfish.userData.id);
        } else {
          const material = jellyfish.material as ShaderMaterial;

          // alter the jellyfish's current pointing angle in 3d space
          const mousePosition = new THREE.Vector3(
            mouse.x,
            mouse.y,
            jellyfish.position.z
          );
          mousePosition.unproject(camera);

          // console.log("mousePosition", mousePosition);
          // console.log("jellyfish position", jellyFish.position);

          // direction vector
          // subVectors args are from destination to origin
          const directionVector = mousePosition
            .sub(jellyfish.position)
            .normalize();

          // rotate the jellyfish in that vector
          jellyfish.lookAt(mousePosition);

          const movementVector = new THREE.Vector3();
          movementVector
            .copy(directionVector)
            .multiplyScalar(jellyfish.userData.speed * 0.07);

          // console.log('movementVector', movementVector);

          jellyfish.position.add(movementVector);
          jellyfish.userData.position.copy(jellyfish.position);

          // don't move the jellyfish if it's near the mouse
          //if (mousePosition.distanceTo(jellyFish.position) > 0.1) {
          // move the jellyfish along a vector in the direction

          // jellyFish.position.add(movementVector);
          // }

          // store the current position in the material so that the positions
          // don't reset if the jellyfish data container is altered
          // jellyFish.userData.position.x += 0.05 * jellyFish.userData.speed;
          // jellyFish.userData.position.y += 0.05 * jellyFish.userData.speed;
          // jellyFish.userData.position.z += 0.05 * jellyFish.userData.speed;

          // jellyFish.position.x = jellyFish.userData.position.x;
          // jellyFish.position.y = jellyFish.userData.position.y;
          // jellyFish.position.z = jellyFish.userData.position.z;

          material.uniforms.uTime.value = jellyfishAge;
          //  material.uniforms.lookAt.value = targetPosition;
          material.uniforms.uSpeed.value = jellyfish.userData.speed;
        }
      });
    }
  });

  const setRef = (ref: THREE.Mesh, point: Jellyfish) => {
    if (ref) {
      (ref.material as ShaderMaterial).transparent = true;
      (ref.material as ShaderMaterial).uniforms.v3Color.value = point.color;
    }
    jelliesRef.current[point.id] = ref as THREE.Mesh;
  };

  return (
    <group name="click-points">
      {Object.entries(jellies).map(([id, jelly], index) => {
        if (jelly.isDead) return null;
        return (
          <Sphere
            args={[0.25, 20]}
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
            {/* <meshStandardMaterial attach="material" color="cyan" /> */}
            {/* @ts-ignore Property 'clickPointMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
            <jellyfishMaterial key={JellyfishMaterial.key} attach="material" />
          </Sphere>
        );
      })}
    </group>
  );
};

export default Jellies;
