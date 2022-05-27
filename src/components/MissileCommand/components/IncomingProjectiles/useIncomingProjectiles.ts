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
  projectileMeshes: Record<string, THREE.Mesh | THREE.Points>;
};

const INTERVAL = 1;
const useIncomingProjectiles = ({ projectileMeshes }: Props) => {
  const dispatch = useDispatch();
  const { incomingProjectiles } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );

  const lastMissileTimeSeconds = useRef<number>(0);

  useFrame(({ clock }) => {
    // create new incomingProjectiles if time
    if (
      !lastMissileTimeSeconds.current ||
      clock.getElapsedTime() - lastMissileTimeSeconds.current > INTERVAL
    ) {
      lastMissileTimeSeconds.current = clock.getElapsedTime();

      const newMissile: IncomingProjectile = getProjectile({});
      dispatch(addIncomingProjectile(newMissile));
    }

    Object.values(incomingProjectiles).forEach(
      (projectile: IncomingProjectile) => {
        const incomingProjectileMesh = projectileMeshes[projectile.id];

        if (incomingProjectileMesh) {
          // mark a hit if the projectile hits the ground
          // remove the projectile mesh if it is below the ground
          if (projectile.status === "destroyed") {
            dispatch(removeIncomingProjectile(projectile.id));
            delete projectileMeshes[projectile.id];
            return;
          }
          // don't move projectiles that have been intercepted
          if (projectile.status === "intercepted") {
            // if (incomingProjectileMesh) {
            //   console.log(incomingProjectileMesh);
            // }
            // const pos = incomingProjectileMesh.position;
            // incomingProjectileMesh.scale.x += 0.01;
            // incomingProjectileMesh.scale.y += 0.01;
            //incomingProjectileMesh.position.set(pos.x, pos.y, pos.z);

            return;
          }

          if (incomingProjectileMesh.position.y < -0.25) {
            let incomingProjectileHit: Explosion = {
              position: [
                incomingProjectileMesh.position.x,
                incomingProjectileMesh.position.y,
                -1,
              ],
              id: projectile.id,
              type: "incoming",
              specificType: projectile.incomingType,
              time: clock.getElapsedTime(),
            };
            dispatch(addExplosion(incomingProjectileHit));
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
            const newPosition = incomingProjectileMesh.position
              .clone()
              .add(movementVector);
            incomingProjectileMesh.position.set(
              newPosition.x,
              newPosition.y,
              newPosition.z
            );

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
      }
    );
  });

  return {};
};

export default useIncomingProjectiles;
