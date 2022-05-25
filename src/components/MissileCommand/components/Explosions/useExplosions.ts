import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import {
  ProjectileTypes,
  IncomingProjectileTypes,
  InterceptorTypes,
  Explosion,
} from "../../mcTypes";
import { removeExplosion } from "../../redux/explosionsSlice";
import interceptorData from "../../gameData/interceptors.json";
import incomingProjectileData from "../../gameData/incomingProjectiles.json";
import { MissileCommandRootState } from "../../redux/store";
import isInBounds from "../../../../utils/getIsInBounds";
import { updateProjectileStatus } from "../../redux/incomingProjectilesSlice";
import { Vector3 } from "three";

type Props = {
  explosionMeshes: Record<string, THREE.Mesh>;
};

const EXPLOSION_LIFE_SECONDS = 2;

const useExplosions = ({ explosionMeshes }: Props) => {
  const { explosions } = useSelector(
    (state: MissileCommandRootState) => state.explosionsState
  );
  const { incomingProjectiles } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );

  const dispatch = useDispatch();

  const getExplosionColor = (
    type: ProjectileTypes,
    specificType: IncomingProjectileTypes | InterceptorTypes
  ) => {
    switch (type) {
      case "incoming":
        return incomingProjectileData[specificType].explosionColor;
      case "interceptor":
        return interceptorData[specificType].explosionColor;

      default:
        return 0xffffff;
    }
  };

  const getExplosionRadius = (
    type: ProjectileTypes,
    specificType: IncomingProjectileTypes | InterceptorTypes
  ) => {
    switch (type) {
      case "incoming":
        return incomingProjectileData[specificType].blastRadius;
      case "interceptor":
        return interceptorData[specificType].blastRadius;

      default:
        return 0.25;
    }
  };

  const getExplosionTime = (
    type: ProjectileTypes,
    specificType: IncomingProjectileTypes | InterceptorTypes
  ) => {
    switch (type) {
      case "incoming":
        return (
          incomingProjectileData[specificType].blastTime ||
          EXPLOSION_LIFE_SECONDS
        );
      case "interceptor":
        return interceptorData[specificType].blastTime;

      default:
        return 0.25;
    }
  };

  // destroy incoming projectiles in this projectiles blast radius
  const destroyProjectiles = (
    interceptorType: InterceptorTypes,
    explosionPosition: [number, number, number],
    scale: number
  ) => {
    const { blastRadius } = interceptorData[interceptorType];
    Object.values(incomingProjectiles).map((incomingProjectile) => {
      const collisionCheckBounds = {
        bottom: explosionPosition[1] - blastRadius,
        left: explosionPosition[0] - blastRadius,
        right: explosionPosition[0] + blastRadius,
        top: explosionPosition[1] + blastRadius,
      };

      if (!isInBounds(collisionCheckBounds, incomingProjectile.position)) {
        return;
      }
      const scaledRadius = blastRadius * scale;

      const distanceFromExplosionToProjectile = new Vector3()
        .fromArray([
          explosionPosition[0],
          explosionPosition[1],
          incomingProjectile.position[2],
        ])
        .distanceTo(new Vector3().fromArray(incomingProjectile.position));
      if (distanceFromExplosionToProjectile < blastRadius) {
        console.log("intercept projectile", incomingProjectile.id);
        if (incomingProjectile.status !== "intercepted") {
          dispatch(
            updateProjectileStatus({
              id: incomingProjectile.id,
              status: "intercepted",
            })
          );
        }
      }
    });
  };

  useFrame(({ clock }) => {
    Object.values(explosions).map((explosion: Explosion) => {
      const explosionTime = getExplosionTime(
        explosion.type,
        explosion.specificType
      );
      if (clock.getElapsedTime() - explosion.time > explosionTime) {
        dispatch(removeExplosion(explosion.id));
        delete explosionMeshes[explosion.id];
        return;
      } else {
        // scale the explosion based on the first half of a sin wave
        const scale = Math.sin(
          (clock.getElapsedTime() - explosion.time) / (explosionTime / Math.PI)
        );
        explosionMeshes[explosion.id].scale.x = scale;
        explosionMeshes[explosion.id].scale.y = scale;
        explosionMeshes[explosion.id].scale.z = scale;

        if (explosion.type === "interceptor") {
          destroyProjectiles(
            explosion.specificType as InterceptorTypes,
            explosion.position,
            scale
          );
        }
      }
    });
  });

  return { getExplosionColor, getExplosionRadius };
};

export default useExplosions;
