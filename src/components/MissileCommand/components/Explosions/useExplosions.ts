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
import { markProjectileAsIntercepted } from "../../redux/incomingProjectilesSlice";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { activateParticleExplosion } from "../../redux/particleExplosionsSlice";

type Props = {
  explosionMeshes: Record<string, THREE.Mesh>;
};

const EXPLOSION_LIFE_SPAN_SECONDS = 2;

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
  ): THREE.Color => {
    switch (type) {
      case "incoming":
        return new THREE.Color(
          incomingProjectileData[specificType].explosionColor
        );
      case "interceptor":
        return new THREE.Color(interceptorData[specificType].explosionColor);

      default:
        return new THREE.Color(0xffffff);
    }
  };

  const getExplosionRadius = (
    type: ProjectileTypes,
    specificType: IncomingProjectileTypes | InterceptorTypes
  ): number => {
    switch (type) {
      case "incoming":
        return incomingProjectileData[specificType].blastRadius;
      case "interceptor":
        return interceptorData[specificType].blastRadius;

      default:
        return 0.25;
    }
  };

  const getExplosionLifeSpan = (
    type: ProjectileTypes,
    specificType: IncomingProjectileTypes | InterceptorTypes
  ) => {
    switch (type) {
      case "incoming":
        return (
          incomingProjectileData[specificType].blastTime ||
          EXPLOSION_LIFE_SPAN_SECONDS
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
    scale: number,
    timeSeconds: number
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

      const distanceFromExplosionToProjectile = new THREE.Vector3()
        .fromArray([
          explosionPosition[0],
          explosionPosition[1],
          incomingProjectile.position[2],
        ])
        .distanceTo(new THREE.Vector3().fromArray(incomingProjectile.position));
      if (distanceFromExplosionToProjectile < blastRadius) {
        if (incomingProjectile.status !== "intercepted") {
          dispatch(markProjectileAsIntercepted(incomingProjectile.id));
          dispatch(
            activateParticleExplosion({
              position: explosionPosition,
              createdAtSeconds: timeSeconds,
            })
          );
        }
      }
    });
  };

  useFrame(({ clock }) => {
    Object.values(explosions).map((explosion: Explosion) => {
      const currentTimeSeconds = clock.getElapsedTime();
      const explosionLifeSpan = getExplosionLifeSpan(
        explosion.type,
        explosion.specificType
      );
      if (currentTimeSeconds - explosion.time > explosionLifeSpan) {
        dispatch(removeExplosion(explosion.id));
        delete explosionMeshes[explosion.id];
        return;
      } else {
        (explosionMeshes[explosion.id].material as THREE.Material).transparent =
          true;
        // scale the explosion based on the first half of a sin wave
        const scale = Math.sin(
          (currentTimeSeconds - explosion.time) / (explosionLifeSpan / Math.PI)
        );
        explosionMeshes[explosion.id].scale.x = scale;
        explosionMeshes[explosion.id].scale.y = scale;
        explosionMeshes[explosion.id].scale.z = scale;

        const material = explosionMeshes[explosion.id]
          .material as ShaderMaterial;
        material.uniforms.uAge.value = currentTimeSeconds - explosion.time;

        if (explosion.type === "interceptor") {
          destroyProjectiles(
            explosion.specificType as InterceptorTypes,
            explosion.position,
            scale,
            currentTimeSeconds
          );
        }
      }
    });
  });

  return { getExplosionColor, getExplosionRadius, getExplosionLifeSpan };
};

export default useExplosions;
