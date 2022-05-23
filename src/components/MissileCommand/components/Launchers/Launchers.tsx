import { useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circle, Plane, Sphere } from "@react-three/drei";
import { Launcher } from "../../mcTypes";
import { MissileCommandRootState } from "../../redux/store";
import launcherData from "../../gameData/launchers.json";
import * as THREE from "three";
import { Vector2 } from "three";
import { OutlineMaterial } from "../../../../Materials/OutlineMaterial";
import useLaunchers from "./useLaunchers";

const Launchers = () => {
  const { gl, scene, camera, size } = useThree();
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
  useLaunchers();
  const launcherMeshRefs = useRef<
    Record<string, { launcher: THREE.Mesh; detectionRangeRing: THREE.Mesh }>
  >({});
  const { launchers } = useSelector(
    (state: MissileCommandRootState) => state.launchersState
  );
  const dispatch = useDispatch();
  const { clock } = useThree();
  const elapsedTime = clock.getElapsedTime();

  const rangeRings = useMemo(() => {
    return launcherMeshRefs.current
      ? Object.values(launcherMeshRefs.current).map(
          (value) => value.detectionRangeRing
        )
      : [];
  }, []);

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
              position={launcher.position}
              ref={(ref: THREE.Mesh) => {
                if (ref) {
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
              />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
};

export default Launchers;
