import React from "react";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { IncomingProjectile } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";
import useIncomingProjectiles from "./useIncomingProjectiles";
import { ActiveProjectile } from "./ActiveProjectile";
import { InterceptedProjectile } from "./InterceptedProjectile";

const IncomingProjectiles = () => {
  const missileMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const { incomingProjectiles } = useSelector(
    (state: MissileCommandRootState) => state.incomingProjectilesState
  );

  useIncomingProjectiles({ projectileMeshes: missileMeshRefs.current });

  const setProjectileMeshRef = (ref: THREE.Mesh, id: string) => {
    if (ref) {
      missileMeshRefs.current[id] = ref;
    }
  };

  return (
    <group name="incoming-projectiles">
      <group name="missiles">
        {Object.values(incomingProjectiles).map(
          (incomingProjectile: IncomingProjectile) => {
            if (incomingProjectile.status === "active") {
              return (
                <ActiveProjectile
                  key={incomingProjectile.id}
                  incomingProjectile={incomingProjectile}
                  setProjectileMeshRef={setProjectileMeshRef}
                />
              );
            }
            return (
              <InterceptedProjectile
                key={incomingProjectile.id}
                incomingProjectile={incomingProjectile}
                setProjectileMeshRef={setProjectileMeshRef}
              />
            );
          }
        )}
      </group>
    </group>
  );
};
export default React.memo(IncomingProjectiles);
