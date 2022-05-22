import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import {
  Explosion,
  IncomingProjectileTypes,
  InterceptorProjectileTypes,
} from "../../mcTypes";
import { removeExplosion } from "../../redux/explosionsSlice";
import { MissileCommandRootState } from "../../redux/store";

export interface ExplosionsProps {}

const EXPLOSION_LIFE_SECONDS = 2;

const Explosions = (props: ExplosionsProps) => {
  const { explosions } = useSelector(
    (state: MissileCommandRootState) => state.explosionsState
  );
  const explosionMeshRefs = useRef<Record<string, THREE.Mesh>>({});

  const dispatch = useDispatch();

  const getExplosionColor = (
    type: InterceptorProjectileTypes | IncomingProjectileTypes
  ) => {
    switch (type) {
      case "standard":
        return 0xff0000;
      case "proximity":
        return 0xffff00;
      default:
        return 0xffffff;
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
        return (
          <Sphere
            key={explosion.id}
            position={explosion.location}
            ref={(ref: THREE.Mesh) => {
              if (ref) {
                explosionMeshRefs.current[explosion.id] = ref;
              }
            }}
          >
            <meshStandardMaterial
              attach="material"
              color={getExplosionColor(explosion.type)}
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
