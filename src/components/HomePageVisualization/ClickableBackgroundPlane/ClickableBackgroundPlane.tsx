import { Plane } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree, Vector3 } from "@react-three/fiber";
import React, { useRef } from "react";

type ClickableBackgroundPlaneProps = {
  addNewPosition: (pos: Vector3) => void;
};

const ClickableBackgroundPlane = ({
  addNewPosition,
}: ClickableBackgroundPlaneProps) => {
  const planeRef = useRef<THREE.Mesh>();
  const { camera } = useThree();

  useFrame(() => {
    if (planeRef) {
      // rotate the plane so that it is always facing the camera
      planeRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    addNewPosition(event.point);
  };

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

export default ClickableBackgroundPlane;
