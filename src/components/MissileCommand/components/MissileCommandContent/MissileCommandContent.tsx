import {
  Box,
  OrbitControls,
  softShadows,
  Sphere,
  Stars,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GAME_FIELD_WIDTH } from "../../missileCommandGlobals";
import useMissileCommandControl from "../../useMissileCommandControls";
import { McFloor } from "./McFloor";

const REFERENCE_BLOCK_SIZE = 1;
const MissileCommandContent = () => {
  const starsRef = useRef<THREE.Mesh>(null);
  const { camera, viewport, size } = useThree();
  const { aspect } = viewport;
  console.log({ aspect });
  const { cameraPos, cameraZoom, setCameraControls } =
    useMissileCommandControl();
  const { width: canvasWidth, height: canvasHeight } = size;

  // useFrame(() => {
  //   setCameraControls({ cameraZoom: camera.zoom });
  // });

  // useEffect(() => {
  //   camera.position.x = 0;
  //   camera.position.y = cameraPos.y;
  //   setCameraControls({ cameraPos: camera.position });
  // }, [canvasWidth, canvasHeight, camera.position, cameraPos.y]);

  // useEffect(() => {}, [viewport]);

  return (
    <group>
      <color attach="background" args={["black"]} />
      {/* <Stars ref={starsRef} /> */}
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 2, -2]} />
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
