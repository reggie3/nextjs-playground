import {
  Box,
  OrbitControls,
  softShadows,
  Sphere,
  Stars,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useMissileCommandControl from "../../useMissileCommandControls";
import { McFloor } from "./McFloor";

const REFERENCE_BLOCK_SIZE = 0.25;
const MissileCommandContent = () => {
  const starsRef = useRef<THREE.Mesh>(null);
  const { camera, viewport } = useThree();
  const { aspect } = viewport;
  console.log({ aspect });
  const { cameraPos, cameraZoom } = useMissileCommandControl();

  useEffect(() => {
    // camera.updateProjectionMatrix();
  }, [camera, cameraPos, cameraZoom]);

  useEffect(() => {}, [viewport]);

  return (
    <group>
      <color attach="background" args={["black"]} />
      {/* <Stars ref={starsRef} /> */}
      <ambientLight intensity={0.25} />
      <axesHelper args={[11]} />
      <McFloor />
      <Box
        userData={{ name: "reference-block" }}
        args={[
          REFERENCE_BLOCK_SIZE,
          REFERENCE_BLOCK_SIZE,
          REFERENCE_BLOCK_SIZE,
        ]}
        position={[0, REFERENCE_BLOCK_SIZE / 2, 0]}
      />
    </group>
  );
};
export default MissileCommandContent;
