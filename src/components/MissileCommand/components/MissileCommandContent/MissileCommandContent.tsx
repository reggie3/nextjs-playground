import {
  Box,
  OrbitControls,
  softShadows,
  Sphere,
  Stars,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ProjectileImpact } from "../../mcTypes";
import { GAME_FIELD_WIDTH } from "../../missileCommandGlobals";
import useIncomingProjectilesManager from "../../useIncomingProjectilesManager";
import useInterceptorsManager from "../../useInterceptorsManager";
import useMissileCommandControl from "../../useMissileCommandControls";
import { Explosions } from "../Explosions";
import { IncomingProjectiles } from "../IncomingProjectiles";
import { Interceptors } from "../Interceptors";
import { MissileCommandBackground } from "../MissileCommandBackground";
import { McFloor } from "./McFloor";

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
  console.log({ aspect });
  const { cameraPos, cameraZoom, setCameraControls } =
    useMissileCommandControl();
  const { width: canvasWidth, height: canvasHeight } = size;

  // game managers
  useIncomingProjectilesManager({});
  const addInterceptor = useInterceptorsManager({});

  // camera management
  useFrame(() => {
    setCameraControls({ cameraZoom: camera.zoom });
  });

  // useEffect(() => {
  //   camera.position.x = 0;
  //   camera.position.y = cameraPos.y;
  //   setCameraControls({ cameraPos: camera.position });
  // }, [canvasWidth, canvasHeight, camera.position, cameraPos.y]);

  // useEffect(() => {}, [viewport]);

  const onClickCanvas = () => {
    console.log("onClickCanvas", mouse.x, mouse.y);
  };

  useImperativeHandle(forwardedRef, () => ({
    onClickCanvas,
  }));

  return (
    <group>
      <color attach="background" args={["black"]} />
      {/* <Stars ref={starsRef} /> */}
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 2, -2]} />
      <McFloor />
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
      <MissileCommandBackground />
    </group>
  );
};
export default forwardRef(MissileCommandContent);
