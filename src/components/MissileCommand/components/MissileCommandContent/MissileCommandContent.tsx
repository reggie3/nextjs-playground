import { Box, Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { GAME_FIELD_WIDTH } from "../../missileCommandGlobals";
import useMissileCommandControls from "../../useMissileCommandControls";
import { Explosions } from "../Explosions";
import { IncomingProjectiles } from "../IncomingProjectiles";
import { Interceptors } from "../Interceptors";
import { McMouseIndicator } from "../McMouseIndicator";
import { McClickableBackground } from "../McClickableBackground";
import { McFloor } from "./McFloor";
import { Launchers } from "../Launchers";
import { ParticleExplosions } from "../ParticleExplosions";
import { McScore } from "../McScore";

type MissileCommandContentProps = {};

type MissileCommandContentHandle = {
  onClickCanvas: () => void;
};

const REFERENCE_BLOCK_SIZE = 1;

const MissileCommandContent: React.ForwardRefRenderFunction<
  MissileCommandContentHandle,
  MissileCommandContentProps
> = (props, forwardedRef) => {
  const starsRef = useRef<THREE.Mesh>(null);
  const { camera, mouse, viewport, size } = useThree();
  const { aspect } = viewport;

  const { cameraPos, cameraZoom, setCameraControls } =
    useMissileCommandControls();
  const { width: canvasWidth, height: canvasHeight } = size;

  // camera management
  useFrame(() => {
    setCameraControls({ cameraZoom: camera.zoom });
  });

  const onClickCanvas = () => {
    // console.log("onClickCanvas", mouse.x, mouse.y);
  };

  useImperativeHandle(forwardedRef, () => ({
    onClickCanvas,
  }));

  return (
    <group>
      <color attach="background" args={["black"]} />
      {/* <Stars ref={starsRef} /> */}
      <ambientLight intensity={1} />
      <pointLight position={[0, 2, -2]} />
      <McScore />
      <Box
        visible={false}
        userData={{ name: "reference-block" }}
        args={[
          REFERENCE_BLOCK_SIZE,
          REFERENCE_BLOCK_SIZE,
          REFERENCE_BLOCK_SIZE,
        ]}
        position={[0, REFERENCE_BLOCK_SIZE / 2, 0]}
      />
      <IncomingProjectiles />
      <Interceptors />
      <Explosions />
      <McClickableBackground />
      <McMouseIndicator />
      <Launchers />
      <ParticleExplosions />
      <McFloor />

      {false && (
        <Plane
          name="debug-plane"
          args={[GAME_FIELD_WIDTH, GAME_FIELD_WIDTH]}
          position={[0, 0, -50]}
        />
      )}
    </group>
  );
};
export default forwardRef(MissileCommandContent);
