import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Plane, Sphere } from "@react-three/drei";
import { Launcher } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";
import launcherData from "../../gameData/launchers.json";
import * as THREE from "three";
import { OutlineMaterial } from "../../../../Materials/OutlineMaterial";
import useLaunchers from "./useLaunchers";

const Launchers = () => {
  const launcherMeshRefs = useRef<
    Record<string, { launcher: THREE.Mesh; detectionRangeRing: THREE.Mesh }>
  >({});
  useLaunchers();
  const { launchers } = useSelector(
    (state: MissileCommandRootState) => state.launchersState
  );

  return (
    <group name="launchers">
      {Object.values(launchers).map((launcher: Launcher) => {
        return (
          <group name={`launcher-${launcher.id}`} key={launcher.id}>
            <Plane
              ref={(ref: THREE.Mesh) => {
                if (ref) {
                  launcherMeshRefs.current[launcher.id] = {
                    launcher: ref,
                    detectionRangeRing: null,
                  };
                }
              }}
              key={launcher.id}
              args={[0.25, 0.25]}
              rotation={[0, 0, Math.PI / 4]}
              position={launcher.position}
            >
              <meshStandardMaterial
                attach="material"
                color={launcherData[launcher.type].color}
              />
            </Plane>

            <Sphere
              args={[launcherData[launcher.type].detectionRange, 64]}
              position={[
                launcher.position[0],
                launcher.position[1],
                -1 * launcherData[launcher.type].detectionRange - 2,
              ]}
              ref={(ref: THREE.Mesh) => {
                if (ref) {
                  (ref.material as THREE.Material).transparent = true;
                  launcherMeshRefs.current[launcher.id].detectionRangeRing =
                    ref;
                }
              }}
            >
              {/* @ts-ignore Property 'edgeLineMaterial' does not exist on type 'JSX.IntrinsicElements'. */}
              <outlineMaterial
                key={OutlineMaterial.key}
                color="hotpink"
                transparent
                opacity={0.1}
                blending={THREE.NormalBlending}
              />
              {/* <lineBasicMaterial
                color="#ffff00"
                linewidth={1}
                linecap="round" //ignored by WebGLRenderer
                linejoin="round"
              /> */}
            </Sphere>
          </group>
        );
      })}
    </group>
  );
};

export default Launchers;
