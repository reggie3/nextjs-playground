import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import { Explosion, IncomingProjectile } from "../../mcTypes";
import { addExplosion } from "../../redux/explosionsSlice";
import { incrementScore } from "../../redux/gameDataSlice";
import {
  addIncomingProjectile,
  removeIncomingProjectile,
  updateProjectile,
  updateProjectileStatus,
} from "../../redux/incomingProjectilesSlice";
import { MissileCommandRootState } from "../../redux/store";
import sfx from "../../soundEffects";
import useMissileCommandControls from "../../useMissileCommandControls";
import getProjectile from "../../utilities/getProjectile";
import incomingProjectileData from "../../gameData/incomingProjectiles.json";

type Props = {
  projectileMeshes: Record<string, THREE.Mesh | THREE.Points>;
};

const useIncomingProjectiles = ({ projectileMeshes }: Props) => {
  const dispatch = useDispatch();
  const { incomingInterval } = useMissileCommandControls();

  const { incomingProjectiles } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );

  const lastMissileTimeSeconds = useRef<number>(0);

  useFrame(({ clock }) => {
    // create new incomingProjectiles if time
    if (
      !lastMissileTimeSeconds.current ||
      clock.getElapsedTime() - lastMissileTimeSeconds.current > incomingInterval
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
            dispatch(
              incrementScore(
                // @ts-ignore determine why it is saying score is not defined
                incomingProjectileData[projectile.incomingType].score
              )
            );

            dispatch(removeIncomingProjectile(projectile.id));
            delete projectileMeshes[projectile.id];
            return;
          }

          // check if the projectile has his the ground
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
            dispatch(removeIncomingProjectile(projectile.id));
            delete projectileMeshes[projectile.id];
            sfx.groundImpact.play();

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
