import { Plane, Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { Vector3 } from "three";
import { setIndicatorMode } from "../../redux/mcMouseIndicatorSlice";
import { MissileCommandRootState } from "../../redux/store";
import useMissileCommandControl from "../../useMissileCommandControls";

const LAUNCHER_PLACEMENT_Y_MAX = 0.25;

const McMouseIndicator = () => {
  const { indicatorMode } = useSelector(
    (state: MissileCommandRootState) => state.mcMouseIndicatorState
  );
  const dispatch = useDispatch();
  const mouseMeshVertical = useRef<THREE.Mesh>(null);
  const mouseMeshHorizontal = useRef<THREE.Mesh>(null);
  const mouseMeshLauncher = useRef<THREE.Mesh>(null);
  const { camera, mouse } = useThree();

  useFrame(() => {
    const mousePos = new THREE.Vector3(mouse.x, mouse.y, 1);
    mousePos.unproject(camera);
    mousePos.z = 1;

    if (
      mousePos.y < LAUNCHER_PLACEMENT_Y_MAX &&
      mousePos.y > LAUNCHER_PLACEMENT_Y_MAX * -1
    ) {
      dispatch(setIndicatorMode("launcher_placement"));
      mousePos.y = 0;
      if (mouseMeshLauncher.current) {
        mouseMeshLauncher.current.position.copy(mousePos);
      }
    } else {
      dispatch(setIndicatorMode("targeting"));
      if (mouseMeshVertical.current) {
        mouseMeshVertical.current.position.copy(mousePos);
        mouseMeshHorizontal.current.position.copy(mousePos);
      }
    }
  });

  return (
    <group>
      {indicatorMode === "targeting" && (
        <group name="targeting-indicator">
          <Plane ref={mouseMeshVertical} args={[0.05, 0.25]}>
            <meshStandardMaterial color="white" />
          </Plane>
          <Plane
            ref={mouseMeshHorizontal}
            args={[0.05, 0.25]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial color="white" />
          </Plane>
        </group>
      )}
      {indicatorMode === "launcher_placement" && (
        <group name="launcher-placement-indicator">
          <Plane
            ref={mouseMeshLauncher}
            args={[0.25, 0.25]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <meshStandardMaterial color="cyan" transparent opacity={1} />
          </Plane>
        </group>
      )}
    </group>
  );
};

export default McMouseIndicator;
