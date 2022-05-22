import React from "react";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import { Explosion, IncomingProjectile } from "../../mcTypes";
import { addExplosion } from "../../redux/explosionsSlice";
import { MissileCommandRootState } from "../../redux/store";
import { removeIncomingProjectile } from "../../redux/incomingProjectilesSlice";
import { useThree } from "@react-three/fiber";

const IncomingProjectiles = () => {
  const missileMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const { incomingProjectiles: missileData } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );
  const dispatch = useDispatch();
  const { clock } = useThree();

  useFrame(() => {
    // move current missiles
    Object.values(missileData).forEach((missile: IncomingProjectile) => {
      const missileMesh = missileMeshRefs.current[missile.id];

      if (missileMesh) {
        // mark a hit if the missile hits the ground
        // remove the missile mesh if it is below the ground
        if (missileMesh.position.y < -0.25) {
          let missileHit: Explosion = {
            location: [missileMesh.position.x, missileMesh.position.y, -1],
            id: missile.id,
            type: missile.type,
            time: clock.getElapsedTime(),
          };
          dispatch(addExplosion(missileHit));
          dispatch(removeIncomingProjectile(missile.id));
          delete missileMeshRefs.current[missile.id];
          return;
        } else {
          const { direction, speed } = missile;
          const movementVector = new Vector3()
            .fromArray(direction)
            .multiplyScalar(speed);
          const newPosition = missileMesh.position.clone().add(movementVector);
          missileMesh.position.set(newPosition.x, newPosition.y, newPosition.z);
        }
      }
    });
  });

  return (
    <group name="incoming-projectiles">
      <group name="missiles">
        {Object.values(missileData).map((missile: IncomingProjectile) => {
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
export default React.memo(IncomingProjectiles);
