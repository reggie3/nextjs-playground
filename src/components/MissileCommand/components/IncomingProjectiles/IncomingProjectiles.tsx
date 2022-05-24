import React from "react";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { IncomingProjectile } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";
import useIncomingProjectiles from "../../useIncomingProjectiles";

const IncomingProjectiles = () => {
  const missileMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const { incomingProjectiles: missileData } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );

  useIncomingProjectiles({ projectileMeshes: missileMeshRefs.current });

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
              <meshStandardMaterial attach="material" color="red" />
            </Sphere>
          );
        })}
      </group>
    </group>
  );
};
export default React.memo(IncomingProjectiles);
