import { Plane } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

type ExplosionsClickableBackgroundProps = {
  onClick: (event: ThreeEvent<MouseEvent>) => void;
};

const ExplosionsClickableBackground = ({
  onClick,
}: ExplosionsClickableBackgroundProps) => {
  const planeRef = useRef<THREE.Mesh>();
  const { camera } = useThree();

  useFrame(() => {
    if (planeRef) {
      // rotate the plane so that it is always facing the camera
      planeRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group name="clickable-plane">
      <Plane
        args={[100, 100, 20, 20]}
        position={[0, 0, 0]}
        ref={planeRef}
        onClick={onClick}
      >
        <meshBasicMaterial
          transparent
          opacity={0.15}
          color="cyan"
          visible={false}
        />
      </Plane>
    </group>
  );
};

export default ExplosionsClickableBackground;
