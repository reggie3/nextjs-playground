import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MeshStandardMaterial, Vector3 } from "three";
import { IncomingProjectile } from "../../mcTypes";
import getProjectile from "../../utilities/getProjectile";

const IncomingProjectiles = () => {
  const lastMissileTimeSeconds = useRef<number>(0);
  const missileMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const [missileData, setMissileData] = useState<
    Record<string, IncomingProjectile>
  >({});

  useFrame(({ clock }) => {
    // create new missiles if time
    if (clock.getElapsedTime() - lastMissileTimeSeconds.current > 1) {
      console.log(clock.getElapsedTime());
      lastMissileTimeSeconds.current = clock.getElapsedTime();

      const newMissile = getProjectile({});
      setMissileData((prevMissileData) => ({
        ...prevMissileData,
        [newMissile.id]: newMissile,
      }));
    }

    // move current missiles
    Object.values(missileData).forEach((missile) => {
      const missileMesh = missileMeshRefs.current[missile.id];

      if (missileMesh) {
        if (missileMesh.position.y < -0.5) {
          delete missileData[missile.id];
          delete missileMeshRefs.current[missile.id];
          console.log("kill", missile.id);
          return;
        } else {
          const { direction, speed } = missile;
          const movementVector = direction.clone().multiplyScalar(speed);
          const newPosition = missileMesh.position.clone().add(movementVector);
          missileMesh.position.set(newPosition.x, newPosition.y, newPosition.z);
        }
      }
    });
  });

  console.log(missileData);
  console.log(missileMeshRefs.current);

  return (
    <group name="incoming-projectiles">
      <group name="missiles">
        {Object.values(missileData).map((missile) => {
          return (
            <Sphere
              ref={(ref: THREE.Mesh) => {
                if (ref) {
                  missileMeshRefs.current[missile.id] = ref;
                }
              }}
              key={missile.id}
              args={[0.1]}
              position={missile.origin}
            >
              <meshStandardMaterial color="red" />
            </Sphere>
          );
        })}
      </group>
    </group>
  );
};
export default IncomingProjectiles;
