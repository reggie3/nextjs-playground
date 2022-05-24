import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Explosion } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";

import useExplosions from "./useExplosions";

const Explosions = () => {
  const { explosions } = useSelector(
    (state: MissileCommandRootState) => state.explosionsState
  );
  const explosionMeshRefs = useRef<Record<string, THREE.Mesh>>({});

  const { getExplosionColor, getExplosionRadius } = useExplosions({
    explosionMeshes: explosionMeshRefs.current,
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
