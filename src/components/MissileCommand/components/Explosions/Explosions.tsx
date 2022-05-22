import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import {
  Explosion,
  IncomingProjectileTypes,
  InterceptorTypes,
  ProjectileTypes,
} from "../../mcTypes";
import { removeExplosion } from "../../redux/explosionsSlice";
import { MissileCommandRootState } from "../../redux/store";
import interceptorData from "../../gameData/interceptors.json";
import incomingProjectileData from "../../gameData/incomingProjectiles.json";

export interface ExplosionsProps {}

const EXPLOSION_LIFE_SECONDS = 2;

const Explosions = (props: ExplosionsProps) => {
  const { explosions } = useSelector(
    (state: MissileCommandRootState) => state.explosionsState
  );
  const explosionMeshRefs = useRef<Record<string, THREE.Mesh>>({});

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

  useFrame(({ clock }) => {
    Object.values(explosions).map((explosion: Explosion) => {
      if (clock.getElapsedTime() - explosion.time > EXPLOSION_LIFE_SECONDS) {
        dispatch(removeExplosion(explosion.id));
        delete explosionMeshRefs.current[explosion.id];
        return;
      } else {
        // scale the explosion based on the first half of a sin wave
        const scale = Math.sin(
          (clock.getElapsedTime() - explosion.time) /
            (EXPLOSION_LIFE_SECONDS / Math.PI)
        );
        explosionMeshRefs.current[explosion.id].scale.x = scale;
        explosionMeshRefs.current[explosion.id].scale.y = scale;
        explosionMeshRefs.current[explosion.id].scale.z = scale;
      }
    });
  });

  return (
    <group name="explosions">
      {Object.values(explosions).map((explosion: Explosion) => {
        const radius = getExplosionRadius(
          explosion.type,
          explosion.specificType
        );
        return (
          <Sphere
            key={explosion.id}
            position={[
              explosion.location[0],
              explosion.type === "incoming" ? 0 : explosion.location[1],
              explosion.location[2],
            ]}
            ref={(ref: THREE.Mesh) => {
              if (ref) {
                explosionMeshRefs.current[explosion.id] = ref;
              }
            }}
            args={[radius, 10]}
          >
            <meshStandardMaterial
              attach="material"
              color={getExplosionColor(explosion.type, explosion.specificType)}
              transparent
              opacity={0.25}
            />
          </Sphere>
        );
      })}
    </group>
  );
};
export default Explosions;
