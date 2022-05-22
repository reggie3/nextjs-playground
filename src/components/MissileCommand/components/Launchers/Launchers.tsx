import { useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plane } from "@react-three/drei";
import { Launcher } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";
import launcherData from "../../gameData/launchers.json";

const Launchers = () => {
  const { mouse } = useThree();
  const launcherMeshRefs = useRef<Record<string, THREE.Mesh>>({});
  const { launchers } = useSelector(
    (state: MissileCommandRootState) => state.launchersState
  );
  const dispatch = useDispatch();
  const { clock } = useThree();

  return (
    <group name="launchers">
      {Object.values(launchers).map((launcher: Launcher) => {
        return (
          <Plane
            ref={(ref: THREE.Mesh) => {
              if (ref) {
                launcherMeshRefs.current[launcher.id] = ref;
              }
            }}
            key={launcher.id}
            args={[0.25, 0.25]}
            rotation={[0, 0, Math.PI / 4]}
            position={launcher.location}
          >
            <meshStandardMaterial
              attach="material"
              color={launcherData[launcher.type].color}
            />
          </Plane>
        );
      })}
    </group>
  );
};

export default Launchers;
