import { Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

type Props = {};

const MouseIndicator = (props: Props) => {
  const mouseMeshRef = useRef<THREE.Mesh>(null);
  const { camera, mouse } = useThree();

  useFrame(() => {
    if (mouseMeshRef.current) {
      const mousePosition = new THREE.Vector3(mouse.x, mouse.y, 0);
      mousePosition.unproject(camera);

      const directionVector = mousePosition.sub(camera.position).normalize();

      const distance = -camera.position.z / directionVector.z;
      const pos = camera.position
        .clone()
        .add(directionVector.multiplyScalar(distance));
      mouseMeshRef.current.position.copy(pos);
    }
  });

  return (
    <Sphere ref={mouseMeshRef} args={[0.05, 50]}>
      <meshStandardMaterial color="white" transparent opacity={0.25} />
    </Sphere>
  );
};

export default MouseIndicator;
