import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import { Explosion, IncomingProjectile } from "../../mcTypes";
import { addExplosion } from "../../redux/explosionsSlice";
import {
  addIncomingProjectile,
  removeIncomingProjectile,
  updateProjectile,
  updateProjectileStatus,
} from "../../redux/incomingProjectilesSlice";
import { MissileCommandRootState } from "../../redux/store";
import getProjectile from "../../utilities/getProjectile";

type Props = {
  projectileMeshes: Record<string, THREE.Mesh>;
};

const INTERVAL = 1;
const useIncomingProjectiles = ({ projectileMeshes }: Props) => {
  const dispatch = useDispatch();
  const { incomingProjectiles: missileData } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );

  const lastMissileTimeSeconds = useRef<number>(0);

  useFrame(({ clock }) => {
    // create new missiles if time
    if (
      !lastMissileTimeSeconds.current ||
      clock.getElapsedTime() - lastMissileTimeSeconds.current > INTERVAL
    ) {
      lastMissileTimeSeconds.current = clock.getElapsedTime();

      const newMissile: IncomingProjectile = getProjectile({});
      dispatch(addIncomingProjectile(newMissile));
    }

    Object.values(missileData).forEach((projectile: IncomingProjectile) => {
      const missileMesh = projectileMeshes[projectile.id];

      if (missileMesh) {
        // mark a hit if the projectile hits the ground
        // remove the projectile mesh if it is below the ground
        if (projectile.status === "destroyed") {
          dispatch(removeIncomingProjectile(projectile.id));
          delete projectileMeshes[projectile.id];
          return;
        }
        // don't move projectiles that have been intercepted
        if (projectile.status === "intercepted") {
          return;
        }

        if (missileMesh.position.y < -0.25) {
          let missileHit: Explosion = {
            position: [missileMesh.position.x, missileMesh.position.y, -1],
            id: projectile.id,
            type: "incoming",
            specificType: projectile.incomingType,
            time: clock.getElapsedTime(),
          };
          dispatch(addExplosion(missileHit));
          dispatch(
            updateProjectileStatus({
              id: projectile.id,
              status: "destroyed",
            })
          );
          return;
        } else {
          const { direction, speed } = projectile;
          const movementVector = new Vector3()
            .fromArray(direction)
            .multiplyScalar(speed);
          const newPosition = missileMesh.position.clone().add(movementVector);
          missileMesh.position.set(newPosition.x, newPosition.y, newPosition.z);

          dispatch(
            updateProjectile({
              id: projectile.id,
              update: {
                position: [newPosition.x, newPosition.y, newPosition.z],
              },
            })
          );
        }
      }
    });
  });

  return {};
};

export default useIncomingProjectiles;
