import { Plane, Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { setIndicatorMode } from "../../redux/mcMouseIndicatorSlice";
import { MissileCommandRootState } from "../../redux/store";
import useMissileCommandControl from "../../useMissileCommandControls";

const LAUNCHER_PLACEMENT_Y_MAX = 0.25;

const McMouseIndicator = () => {
  const { indicatorMode } = useSelector(
    (state: MissileCommandRootState) => state.mcMouseIndicatorState
  );
  const dispatch = useDispatch();
  const mouseMeshRef = useRef<THREE.Mesh>(null);
  const { camera, mouse } = useThree();

  useFrame(() => {
    if (mouseMeshRef.current) {
      const mousePos = new THREE.Vector3(mouse.x, mouse.y, 1);
      mousePos.unproject(camera);
      mousePos.z = 1;

      if (mousePos.y < LAUNCHER_PLACEMENT_Y_MAX) {
        dispatch(setIndicatorMode("launcher_placement"));
      } else {
        dispatch(setIndicatorMode("targeting"));
      }

      mouseMeshRef.current.position.copy(mousePos);
    }
  });

  return (
    <group>
      {indicatorMode === "targeting" && (
        <group name="targeting-indicator">
          <Sphere ref={mouseMeshRef} args={[0.05, 50]}>
            <meshStandardMaterial color="white" transparent opacity={1} />
          </Sphere>
        </group>
      )}
      {indicatorMode === "launcher_placement" && (
        <group name="launcher-placement-indicator">
          <Plane
            ref={mouseMeshRef}
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
